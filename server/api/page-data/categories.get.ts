import { getCategoriesPageData } from "~/server/services/page-data/categories";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

export default defineEventHandler(async () => {
  const data = await getCategoriesPageData(createPageDataServices());

  return pageDataResponse(data);
});
