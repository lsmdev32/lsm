import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFile } from "vuefire";

import type { FILES_STORAGE_PATH, IMAGES_STORAGE_PATH } from "~/lib/constants";

type Paths =
  | (typeof IMAGES_STORAGE_PATH)[keyof typeof IMAGES_STORAGE_PATH]
  | (typeof FILES_STORAGE_PATH)[keyof typeof FILES_STORAGE_PATH];

export function useUploader(path: Paths, filename?: string) {
  const storage = useFirebaseStorage();

  const _filename =
    filename !== undefined && filename.length ? filename : crypto.randomUUID();

  const fileRef = storageRef(storage, `${path}/${_filename}`);

  const storageFile = useStorageFile(fileRef);

  /**
   * returns the download URL of the file
   */
  async function upload(file: File) {
    try {
      await storageFile.upload(file);

      return await getDownloadURL(fileRef);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch {
      return "";
    }
  }

  return {
    upload,
    progress: storageFile.uploadProgress,
    error: storageFile.uploadError,
  };
}
