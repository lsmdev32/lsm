import { getHomePageData } from "~/server/services/page-data/home";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

export default defineEventHandler(async () => {
  const data = await getHomePageData(createPageDataServices());

  return pageDataResponse(data);
});
