import {
  get as rtdbGet,
  ref as dbRef,
  query as rtdbQuery,
} from "@firebase/database";
import {
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { RTDB_KEYS } from "~/lib/constants";
import {
  getPublicationCollectionRef,
  getPublicationDocRef,
  getStaffDocRef,
} from "~/lib/firestore-model";

import {
  enrichContentSummaries,
  readId,
  readIdList,
  toContentSummary,
} from "./helpers";
import type { ContentSummary, PageDataServices, StaffSummary } from "./types";

interface HomePageData {
  latest_content: ContentSummary | null;
  partners: {
    data: StaffSummary[];
    total: number;
  };
  contents: {
    data: ContentSummary[];
    total: number;
  };
}

export async function getHomePageData({
  firestore,
  rtdb,
}: PageDataServices): Promise<HomePageData> {
  const homeAttorneyIdsSnapshot = await rtdbGet(
    rtdbQuery(dbRef(rtdb, RTDB_KEYS.HOME_ATTORNEY_ORDER))
  );

  const attorneyDocs = await Promise.all(
    readIdList(homeAttorneyIdsSnapshot).map(
      async (id) => await getDoc(getStaffDocRef(firestore, id))
    )
  );

  const attorneys: StaffSummary[] = attorneyDocs.flatMap((doc) => {
    if (!doc.exists()) {
      return [];
    }

    const data = doc.data();

    return [
      {
        id: doc.id,
        name: data.fullname,
        slug: data.slug,
        image_url: data.profile_picture_url,
        type: data.type,
        email: data.email,
        linkedin_url: data.linkedin_url,
      },
    ];
  });

  const contentsQuery = query(
    getPublicationCollectionRef(firestore),
    where("type", "==", "publication"),
    where("status", "==", "published"),
    orderBy("published_at", "desc"),
    limit(4)
  );

  const contentsSnapshot = await getDocs(contentsQuery);

  const contents = contentsSnapshot.docs.map((doc) =>
    toContentSummary(doc.id, doc.data())
  );

  await enrichContentSummaries(firestore, contents);

  const latestContentIdSnapshot = await rtdbGet(
    rtdbQuery(dbRef(rtdb, RTDB_KEYS.HOME_PINNED_CONTENT))
  );

  const latestContentId = readId(latestContentIdSnapshot);

  let latestContent: ContentSummary | null = null;

  if (latestContentId !== null) {
    const latestContentDoc = await getDoc(
      getPublicationDocRef(firestore, latestContentId)
    );

    if (latestContentDoc.exists()) {
      latestContent = toContentSummary(
        latestContentDoc.id,
        latestContentDoc.data()
      );
      await enrichContentSummaries(firestore, [latestContent]);
    }
  }

  return {
    latest_content: latestContent,
    partners: {
      data: attorneys,
      total: attorneys.length,
    },
    contents: {
      data: contents,
      total: contents.length,
    },
  };
}
