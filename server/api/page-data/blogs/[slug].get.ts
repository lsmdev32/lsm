import { getBlogDetailPageData } from "~/server/services/page-data/content";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (slug === undefined || slug === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing blog slug",
    });
  }

  const data = await getBlogDetailPageData(createPageDataServices(), slug);

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Blog not found",
    });
  }

  return pageDataResponse(data);
});
