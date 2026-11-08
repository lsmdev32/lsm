import { get as rtdbGet, ref as dbRef } from "@firebase/database";

import { RTDB_KEYS } from "~/lib/constants";
import { EMPTY_PAGE_SETTINGS, PAGE_SETTINGS_SCHEMA } from "~/lib/page-settings";
import type { PageSettings } from "~/lib/page-settings";

import type { PageDataServices } from "./types";

/**
 * Reads the `page_settings` Realtime Database node. Public pages fall back to
 * their built-in download link when the setting is empty.
 */
export async function getPageSettingsPageData({
  rtdb,
}: PageDataServices): Promise<PageSettings> {
  const snapshot = await rtdbGet(dbRef(rtdb, RTDB_KEYS.PAGE_SETTINGS));
  const parsed = PAGE_SETTINGS_SCHEMA.safeParse(snapshot.val());

  if (!parsed.success) {
    return EMPTY_PAGE_SETTINGS;
  }

  return { company_profile_url: parsed.data.company_profile_url ?? null };
}
