import { z } from "zod";

import { getContentListPageData } from "~/server/services/page-data/content";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

const contentListQuerySchema = z.object({
  type: z.enum(["blog", "publication"]),
  page: z.coerce.number().int().min(1).default(1),
  search: z.string().optional(),
  category: z.string().optional(),
  year: z
    .string()
    .regex(/^\d{4}$/u)
    .optional(),
});

export default defineEventHandler(async (event) => {
  const parsedQuery = contentListQuerySchema.safeParse(getQuery(event));

  if (!parsedQuery.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid content list query",
      data: parsedQuery.error.flatten(),
    });
  }

  const data = await getContentListPageData(
    createPageDataServices(),
    parsedQuery.data
  );

  return pageDataResponse(data);
});
