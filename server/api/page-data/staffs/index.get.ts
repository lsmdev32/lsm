import { getAttorneysPageData } from "~/server/services/page-data/attorneys";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

export default defineEventHandler(async () => {
  const data = await getAttorneysPageData(createPageDataServices());

  return pageDataResponse(data);
});
