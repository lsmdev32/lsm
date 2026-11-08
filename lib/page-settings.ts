import { z } from "zod";

/**
 * Field names under the `page_settings` Realtime Database node. Values are
 * public download URLs, so the node is readable by both the dashboard and the
 * server-side page-data services.
 */
export const PAGE_SETTINGS_FIELDS = {
  company_profile_url: "company_profile_url",
} as const;

export const PAGE_SETTINGS_SCHEMA = z.object({
  company_profile_url: z.string().min(1).nullish(),
});

export interface PageSettings {
  company_profile_url: string | null;
}

/** Used when the node is missing or a write left a malformed value behind. */
export const EMPTY_PAGE_SETTINGS: PageSettings = {
  company_profile_url: null,
};
