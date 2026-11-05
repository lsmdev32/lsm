import dayjs from "dayjs";
import type {
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { getDoc } from "firebase/firestore";

import { getCategoryDocRef, getStaffDocRef } from "~/lib/firestore-model";

import type { ContentSummary } from "./types";

export function isNonEmptyString(value: string | null): value is string {
  return value !== null && value !== "";
}

export async function getCategoryName(
  firestore: Firestore,
  categoryId: string | null
): Promise<string | null> {
  if (!categoryId) {
    return null;
  }

  const categoryDoc = await getDoc(getCategoryDocRef(firestore, categoryId));

  if (!categoryDoc.exists()) {
    return null;
  }

  return categoryDoc.data().name ?? null;
}

export async function getStaffData(
  firestore: Firestore,
  staffId: string | null
): Promise<DocumentData | null> {
  if (!staffId) {
    return null;
  }

  const staffDoc = await getDoc(getStaffDocRef(firestore, staffId));

  if (!staffDoc.exists()) {
    return null;
  }

  return staffDoc.data() ?? null;
}

export function toContentSummary(doc: QueryDocumentSnapshot): ContentSummary {
  const data = doc.data();

  return {
    id: doc.id,
    title: data.title,
    slug: data.slug,
    image_url: data.cover_image_url,
    published_at: dayjs(data.published_at.seconds * 1000).format("MMM D, YYYY"),
    category_id: data.category_id ?? null,
    author_id: data.author_id ?? null,
    category: null,
    author: null,
  };
}

export async function enrichContentSummaries(
  firestore: Firestore,
  contents: ContentSummary[]
) {
  const categoryIds = [
    ...new Set(
      contents.map((content) => content.category_id).filter(isNonEmptyString)
    ),
  ];

  const authorIds = [
    ...new Set(
      contents.map((content) => content.author_id).filter(isNonEmptyString)
    ),
  ];

  const categoryNames = new Map<string, string | null>();
  const staffById = new Map<string, DocumentData | null>();

  await Promise.all([
    ...categoryIds.map(async (categoryId) => {
      categoryNames.set(
        categoryId,
        await getCategoryName(firestore, categoryId)
      );
    }),
    ...authorIds.map(async (authorId) => {
      staffById.set(authorId, await getStaffData(firestore, authorId));
    }),
  ]);

  for (const content of contents) {
    if (content.category_id) {
      content.category = categoryNames.get(content.category_id) ?? null;
    }

    const authorData = content.author_id
      ? staffById.get(content.author_id)
      : null;

    if (authorData) {
      content.author = {
        name: authorData.fullname,
        photo_url: authorData.profile_picture_url,
      };
    }
  }
}
