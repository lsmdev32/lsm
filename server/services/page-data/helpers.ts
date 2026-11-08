import dayjs from "dayjs";
import type { DataSnapshot } from "firebase/database";
import type { Firestore } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { z } from "zod";

import { getCategoryDocRef, getStaffDocRef } from "~/lib/firestore-model";
import type {
  BlogAppModel,
  PublicationAppModel,
  StaffAppModel,
} from "~/lib/firestore-model";

import type { ContentSummary } from "./types";

/** A staff record always carries the snapshot id once it is read back. */
export type StaffRecord = StaffAppModel & { id: string };

/** Fields shared by the blog and publication variants of a content document. */
export type ContentSource = BlogAppModel | PublicationAppModel;

const ID_LIST_SCHEMA = z.array(z.string().min(1));
const ID_SCHEMA = z.string().min(1);

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value !== "";
}

/**
 * Realtime Database values are untyped, so id lists are parsed at this
 * boundary rather than trusted. Malformed data degrades to an empty list.
 */
export function readIdList(snapshot: DataSnapshot): string[] {
  const parsed = ID_LIST_SCHEMA.safeParse(snapshot.val());

  return parsed.success ? parsed.data : [];
}

/** Reads a single id from a Realtime Database node, or `null` when absent. */
export function readId(snapshot: DataSnapshot): string | null {
  const parsed = ID_SCHEMA.safeParse(snapshot.val());

  return parsed.success ? parsed.data : null;
}

function collectIds(values: (string | null)[]): string[] {
  const ids = new Set<string>();

  for (const value of values) {
    if (isNonEmptyString(value)) {
      ids.add(value);
    }
  }

  return [...ids];
}

export async function getCategoryName(
  firestore: Firestore,
  categoryId: string | null
): Promise<string | null> {
  if (categoryId === null || categoryId === "") {
    return null;
  }

  const categoryDoc = await getDoc(getCategoryDocRef(firestore, categoryId));

  if (!categoryDoc.exists()) {
    return null;
  }

  return categoryDoc.data().name;
}

export async function getStaffData(
  firestore: Firestore,
  staffId: string | null
): Promise<StaffRecord | null> {
  if (staffId === null || staffId === "") {
    return null;
  }

  const staffDoc = await getDoc(getStaffDocRef(firestore, staffId));

  if (!staffDoc.exists()) {
    return null;
  }

  return { ...staffDoc.data(), id: staffDoc.id };
}

export function toContentSummary(
  id: string,
  data: ContentSource
): ContentSummary {
  return {
    id,
    title: data.title,
    slug: data.slug,
    image_url: data.cover_image_url,
    published_at: dayjs(data.published_at).format("MMM D, YYYY"),
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
  const categoryIds = collectIds(
    contents.map((content) => content.category_id)
  );

  const authorIds = collectIds(contents.map((content) => content.author_id));

  const categoryNames = new Map<string, string | null>();
  const staffById = new Map<string, StaffRecord | null>();

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
    if (content.category_id !== null) {
      content.category = categoryNames.get(content.category_id) ?? null;
    }

    if (content.author_id === null) {
      continue;
    }

    const authorData = staffById.get(content.author_id);

    if (authorData !== null && authorData !== undefined) {
      content.author = {
        name: authorData.fullname,
        photo_url: authorData.profile_picture_url,
      };
    }
  }
}
