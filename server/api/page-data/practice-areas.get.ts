import { getPracticeAreasPageData } from "~/server/services/page-data/practice-areas";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

export default defineEventHandler(async () => {
  const data = await getPracticeAreasPageData(createPageDataServices());

  return pageDataResponse(data);
});
