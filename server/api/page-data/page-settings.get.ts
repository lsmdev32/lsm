import { getPageSettingsPageData } from "~/server/services/page-data/page-settings";
import {
  createPageDataServices,
  pageDataResponse,
} from "~/server/utils/page-data";

export default defineEventHandler(async () => {
  const data = await getPageSettingsPageData(createPageDataServices());

  return pageDataResponse(data);
});
