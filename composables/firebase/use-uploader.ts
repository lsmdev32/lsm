import { getDownloadURL, ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFile } from "vuefire";

import type { IMAGES_STORAGE_PATH } from "~/lib/constants";

type ImageStoragePath = typeof IMAGES_STORAGE_PATH;

type Paths = ImageStoragePath[keyof ImageStoragePath];

export function useUploader<P extends Paths>(path: P) {
  const storage = useFirebaseStorage();

  const filename = crypto.randomUUID();
  const fileRef = storageRef(storage, `${path}/${filename}`);

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
