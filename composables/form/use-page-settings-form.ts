import { ref as dbRef, remove, set } from "@firebase/database";
import { toast } from "vue-sonner";

import {
  FILES_STORAGE_PATH,
  PAGE_SETTINGS_CONSTANTS,
  RTDB_KEYS,
} from "~/lib/constants";
import {
  EMPTY_PAGE_SETTINGS,
  PAGE_SETTINGS_FIELDS,
  PAGE_SETTINGS_SCHEMA,
} from "~/lib/page-settings";

/**
 * Page-level settings the public site reads from the `page_settings` Realtime
 * Database node. Values are public download URLs; uploads write straight
 * through, there is no draft state.
 */
export function usePageSettingsForm() {
  const rtdb = useDatabase();

  const settingsRef = dbRef(rtdb, RTDB_KEYS.PAGE_SETTINGS);
  const settings = useDatabaseObject(settingsRef);

  const parsed = computed(() => {
    const result = PAGE_SETTINGS_SCHEMA.safeParse(settings.value);

    return result.success
      ? { company_profile_url: result.data.company_profile_url ?? null }
      : EMPTY_PAGE_SETTINGS;
  });

  const uploader = useUploader(
    FILES_STORAGE_PATH.COMPANY_PROFILE,
    "LSM-Firm-Profile-Capability-Statement"
  );

  const selectedFile = ref<File | null>(null);
  const isUploading = ref(false);

  const companyProfileUrl = computed(() => parsed.value.company_profile_url);

  function selectCompanyProfile(file: File) {
    selectedFile.value = file;
  }

  function clearCompanyProfile() {
    selectedFile.value = null;
  }

  async function uploadCompanyProfile() {
    const file = selectedFile.value;

    if (!file) {
      toast.error(PAGE_SETTINGS_CONSTANTS.MSG.COMPANY_PROFILE_REQUIRED_MSG);

      return;
    }

    if (
      !PAGE_SETTINGS_CONSTANTS.COMPANY_PROFILE.FILE_TYPES.includes(file.type)
    ) {
      toast.error(PAGE_SETTINGS_CONSTANTS.MSG.COMPANY_PROFILE_TYPE_MSG);

      return;
    }

    if (file.size > PAGE_SETTINGS_CONSTANTS.COMPANY_PROFILE.MAX_SIZE) {
      toast.error(PAGE_SETTINGS_CONSTANTS.MSG.COMPANY_PROFILE_SIZE_MSG);

      return;
    }

    isUploading.value = true;

    try {
      const url = await uploader.upload(file);

      if (url === "") {
        toast.error("Gagal mengunggah profil perusahaan");

        return;
      }

      await set(
        dbRef(
          rtdb,
          `${RTDB_KEYS.PAGE_SETTINGS}/${PAGE_SETTINGS_FIELDS.company_profile_url}`
        ),
        url
      );
    } catch {
      toast.error("Gagal menyimpan profil perusahaan");

      return;
    } finally {
      isUploading.value = false;
    }

    clearCompanyProfile();
    toast.success("Profil perusahaan berhasil disimpan");
  }

  async function removeCompanyProfile() {
    try {
      await remove(
        dbRef(
          rtdb,
          `${RTDB_KEYS.PAGE_SETTINGS}/${PAGE_SETTINGS_FIELDS.company_profile_url}`
        )
      );
    } catch {
      toast.error("Gagal menghapus profil perusahaan");

      return;
    }

    toast.success("Profil perusahaan berhasil dihapus");
  }

  return {
    selectedFile,
    isUploading,
    companyProfileUrl,
    selectCompanyProfile,
    clearCompanyProfile,
    uploadCompanyProfile,
    removeCompanyProfile,
  };
}
