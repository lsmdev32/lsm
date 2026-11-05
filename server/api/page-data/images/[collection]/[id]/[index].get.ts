import { getDoc } from "firebase/firestore";
import { z } from "zod";

import { getBlogDocRef, getPublicationDocRef } from "~/lib/firestore-model";
import { extractInlineArticleImages } from "~/server/services/page-data/article-images";
import { createPageDataServices } from "~/server/utils/page-data";

const articleDocumentSchema = z.object({
  status: z.string(),
  content: z.string(),
});

const SERVEABLE_IMAGE_TYPES: Record<string, true> = {
  jpeg: true,
  png: true,
  gif: true,
  webp: true,
  avif: true,
};

export default defineEventHandler(async (event) => {
  const collection = getRouterParam(event, "collection");
  const id = getRouterParam(event, "id");
  const rawIndex = getRouterParam(event, "index");

  if (
    (collection !== "blogs" && collection !== "publications") ||
    id === undefined ||
    id === "" ||
    rawIndex === undefined ||
    rawIndex === ""
  ) {
    throw createError({ statusCode: 404, statusMessage: "Image not found" });
  }

  const index = Number(rawIndex);

  if (!Number.isInteger(index) || index < 0) {
    throw createError({ statusCode: 404, statusMessage: "Image not found" });
  }

  const { firestore } = createPageDataServices();

  const docRef =
    collection === "blogs"
      ? getBlogDocRef(firestore, id)
      : getPublicationDocRef(firestore, id);

  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw createError({ statusCode: 404, statusMessage: "Image not found" });
  }

  const parsed = articleDocumentSchema.safeParse(snapshot.data());

  if (!parsed.success || parsed.data.status !== "published") {
    throw createError({ statusCode: 404, statusMessage: "Image not found" });
  }

  const image = extractInlineArticleImages(parsed.data.content).at(index);

  if (!image || SERVEABLE_IMAGE_TYPES[image.mime] !== true) {
    throw createError({ statusCode: 404, statusMessage: "Image not found" });
  }

  setHeader(event, "Content-Type", `image/${image.mime}`);
  setHeader(event, "Cache-Control", "public, max-age=86400");

  return Buffer.from(image.base64, "base64");
});
