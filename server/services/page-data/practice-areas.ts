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
  getStaffDocRef,
} from "~/lib/firestore-model";

import {
  enrichContentSummaries,
  readIdList,
  toContentSummary,
} from "./helpers";
import type { ContentSummary, PageDataServices, StaffSummary } from "./types";

interface PracticeAreasPageData {
  news_and_publications: {
    data: ContentSummary[];
    total: number;
  };
  our_attorneys: {
    data: StaffSummary[];
    total: number;
  };
}

export async function getPracticeAreasPageData({
  firestore,
  rtdb,
}: PageDataServices): Promise<PracticeAreasPageData> {
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

  return {
    news_and_publications: {
      data: contents,
      total: contents.length,
    },
    our_attorneys: {
      data: attorneys,
      total: attorneys.length,
    },
  };
}
