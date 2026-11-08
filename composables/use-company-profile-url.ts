import { z } from "zod";

const COMPANY_PROFILE_SCHEMA = z.object({
  company_profile_url: z.string().nullable(),
});

/**
 * Resolves the company-profile download link from the dashboard's page
 * settings, falling back to the site's built-in link while the setting is
 * empty so the public pages never lose their download button.
 */
export async function useCompanyProfileUrl(fallbackUrl: string) {
  const { data } = await useCustomFetch("/api/page-data/page-settings");

  const parsed = COMPANY_PROFILE_SCHEMA.safeParse(data?.data);
  const stored = parsed.success ? parsed.data.company_profile_url : null;

  return stored !== null && stored !== "" ? stored : fallbackUrl;
}
