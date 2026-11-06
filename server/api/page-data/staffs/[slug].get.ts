import { getAttorneyDetailPageData } from "~/server/services/page-data/attorneys";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");

  if (slug === undefined || slug === "") {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing staff slug",
    });
  }

  const data = await getAttorneyDetailPageData(createPageDataServices(), slug);

  if (!data) {
    throw createError({
      statusCode: 404,
      statusMessage: "Attorney profile not found",
    });
  }

  return pageDataResponse(data);
});
