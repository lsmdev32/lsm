import {
  get as rtdbGet,
  ref as dbRef,
  query as rtdbQuery,
} from "@firebase/database";
import dayjs from "dayjs";
import { getDocs, limit, orderBy, query, where } from "firebase/firestore";

import { RTDB_KEYS } from "~/lib/constants";
import {
  getPublicationCollectionRef,
  getStaffCollectionRef,
} from "~/lib/firestore-model";

import { getCategoryName } from "./helpers";
import type { PageDataServices, StaffSummary } from "./types";

interface AttorneysPageData {
  founders: { data: StaffSummary[]; total: number };
  partners: { data: StaffSummary[]; total: number };
  associates: { data: StaffSummary[]; total: number };
  of_counsels: { data: StaffSummary[]; total: number };
}

interface StaffReference {
  id: string;
  name: string;
  slug: string;
}

interface StaffPublication {
  id: string;
  title: string;
  slug: string;
  image_url: string | null;
  category: string;
  published_at: string;
}

interface AttorneyDetailPageData {
  person: {
    id: string;
    email: string;
    name: string;
    image_url: string | null;
    linkedin_url: string;
    slug: string;
    type: string;
    short_bio: string;
    bio: string;
  };
  publications: StaffPublication[];
  other_associates: StaffReference[];
  other_partners: StaffReference[];
  other_founders: StaffReference[];
  other_of_counsels: StaffReference[];
}

function sortByPartnerOrder(
  staff: StaffReference[],
  partnerOrderIds: string[]
): StaffReference[] {
  return staff.sort((a, b) => {
    const indexA = partnerOrderIds.indexOf(a.id);
    const indexB = partnerOrderIds.indexOf(b.id);

    if (indexA === -1 && indexB === -1) {
      return 0;
    }

    if (indexA === -1) {
      return 1;
    }

    if (indexB === -1) {
      return -1;
    }

    return indexA - indexB;
  });
}

export async function getAttorneysPageData({
  firestore,
  rtdb,
}: PageDataServices): Promise<AttorneysPageData> {
  const partnersQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "partner")
  );

  const partnersSnapshot = await getDocs(partnersQuery);

  const hestiPartner = partnersSnapshot.docs
    .findLast((doc) => doc.data().fullname.toLowerCase().includes("hesti"))
    ?.data();

  let partners: StaffSummary[] = partnersSnapshot.docs
    .filter((doc) => !doc.data().slug.toLowerCase().includes("hesti"))
    .map((doc) => {
      const partnerData = doc.data();

      return {
        id: partnerData.id!,
        name: partnerData.fullname,
        slug: partnerData.slug,
        image_url: partnerData.profile_picture_url,
        type: partnerData.type,
        email: partnerData.email,
        linkedin_url: partnerData.linkedin_url,
      };
    });

  const partnerOrderIdsSnapshot = await rtdbGet(
    rtdbQuery(dbRef(rtdb, RTDB_KEYS.ATTORNEY_ORDER))
  );

  const partnerOrderIds = partnerOrderIdsSnapshot.val() as string[];

  partners = sortByPartnerOrder(partners, partnerOrderIds);

  if (hestiPartner) {
    partners.push({
      id: hestiPartner.id!,
      name: hestiPartner.fullname,
      slug: hestiPartner.slug,
      image_url: hestiPartner.profile_picture_url,
      type: hestiPartner.type,
      email: hestiPartner.email,
      linkedin_url: hestiPartner.linkedin_url,
    });
  }

  const associatesQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "associate"),
    orderBy("fullname")
  );

  const associatesSnapshot = await getDocs(associatesQuery);

  const associates: StaffSummary[] = associatesSnapshot.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id!,
      name: data.fullname,
      slug: data.slug,
      image_url: data.profile_picture_url,
      email: data.email,
      linkedin_url: data.linkedin_url,
      type: data.type,
    }));

  const foundersQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "founder"),
    orderBy("fullname")
  );

  const foundersSnapshot = await getDocs(foundersQuery);

  const founders: StaffSummary[] = foundersSnapshot.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id!,
      name: data.fullname,
      slug: data.slug,
      image_url: data.profile_picture_url,
      email: data.email,
      linkedin_url: data.linkedin_url,
      type: data.type,
    }))
    .sort((a, b) => -a.name.localeCompare(b.name));

  const ofCounselQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "of_counsel"),
    orderBy("fullname")
  );

  const ofCounselSnapshot = await getDocs(ofCounselQuery);

  const ofCounsel: StaffSummary[] = ofCounselSnapshot.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id!,
      name: data.fullname,
      slug: data.slug,
      image_url: data.profile_picture_url,
      email: data.email,
      linkedin_url: data.linkedin_url,
      type: data.type,
    }));

  return {
    founders: {
      data: founders,
      total: founders.length,
    },
    partners: {
      data: partners,
      total: partners.length,
    },
    associates: {
      data: associates,
      total: associates.length,
    },
    of_counsels: {
      data: ofCounsel,
      total: ofCounsel.length,
    },
  };
}

export async function getAttorneyDetailPageData(
  { firestore, rtdb }: PageDataServices,
  slug: string
): Promise<AttorneyDetailPageData | null> {
  const staffColRef = getStaffCollectionRef(firestore);

  const staffSnapshot = await getDocs(
    query(staffColRef, where("slug", "==", slug))
  );

  if (staffSnapshot.empty) {
    return null;
  }

  const staffData = staffSnapshot.docs.at(0)!.data();

  const publicationsQuery = query(
    getPublicationCollectionRef(firestore),
    where("type", "==", "publication"),
    where("author_id", "==", staffData.id),
    where("status", "==", "published"),
    orderBy("published_at", "desc"),
    limit(6)
  );

  const publicationsSnapshot = await getDocs(publicationsQuery);

  const publications: StaffPublication[] = publicationsSnapshot.docs.map(
    (doc) => {
      const publicationData = doc.data();

      return {
        id: doc.id,
        title: publicationData.title,
        slug: publicationData.slug,
        image_url: publicationData.cover_image_url,
        published_at: dayjs(publicationData.published_at.seconds * 1000).format(
          "MMM D, YYYY"
        ),
        category: publicationData.category_id,
      };
    }
  );

  const publicationCategoryIds = [
    ...new Set(publications.map((publication) => publication.category)),
  ].filter(Boolean);

  for (const categoryId of publicationCategoryIds) {
    const categoryName = await getCategoryName(firestore, categoryId);

    if (!categoryName) {
      continue;
    }

    for (const publication of publications) {
      if (publication.category === categoryId) {
        publication.category = categoryName;
      }
    }
  }

  const otherAssociatesQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "associate"),
    where("slug", "!=", staffData.slug),
    limit(10)
  );

  const otherAssociatesSnapshot = await getDocs(otherAssociatesQuery);

  const otherAssociates: StaffReference[] = otherAssociatesSnapshot.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id!,
      name: data.fullname,
      slug: data.slug,
    }));

  const otherPartnersQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "partner"),
    where("slug", "!=", staffData.slug),
    limit(10)
  );

  const otherPartnersSnapshot = await getDocs(otherPartnersQuery);

  const otherPartners: StaffReference[] = otherPartnersSnapshot.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id!,
      name: data.fullname,
      slug: data.slug,
    }));

  const partnerOrderIdsSnapshot = await rtdbGet(
    rtdbQuery(dbRef(rtdb, RTDB_KEYS.ATTORNEY_ORDER))
  );

  const partnerOrderIds = partnerOrderIdsSnapshot.val() as string[];

  sortByPartnerOrder(otherPartners, partnerOrderIds);

  const otherFoundersQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "founder"),
    where("slug", "!=", staffData.slug),
    limit(10)
  );

  const otherFoundersSnapshot = await getDocs(otherFoundersQuery);

  const otherFounders: StaffReference[] = otherFoundersSnapshot.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id!,
      name: data.fullname,
      slug: data.slug,
    }))
    .sort((a, b) => -a.name.localeCompare(b.name));

  const otherOfCounselsQuery = query(
    getStaffCollectionRef(firestore),
    where("type", "==", "of_counsel"),
    where("slug", "!=", staffData.slug),
    limit(10)
  );

  const otherOfCounselsSnapshot = await getDocs(otherOfCounselsQuery);

  const otherOfCounsels: StaffReference[] = otherOfCounselsSnapshot.docs
    .map((doc) => doc.data())
    .map((data) => ({
      id: data.id!,
      name: data.fullname,
      slug: data.slug,
    }));

  return {
    person: {
      id: staffData.id!,
      email: staffData.email,
      name: staffData.fullname,
      image_url: staffData.profile_picture_url,
      linkedin_url: staffData.linkedin_url,
      slug: staffData.slug,
      type: staffData.type,
      short_bio: staffData.short_bio,
      bio: staffData.bio,
    },
    publications,
    other_associates: otherAssociates,
    other_partners: otherPartners,
    other_founders: otherFounders,
    other_of_counsels: otherOfCounsels,
  };
}
