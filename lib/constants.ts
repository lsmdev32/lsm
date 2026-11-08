function isCompletePairRecord<T extends string>(
  record: Partial<Record<T, T>>,
  keys: readonly T[]
): record is { [K in T]: K } {
  return keys.every((key) => record[key] === key);
}

function toPairRecord<T extends string>(
  keys: readonly T[],
  record: Partial<Record<T, T>>
): {
  [K in T]: K;
} {
  if (isCompletePairRecord(record, keys)) {
    return record;
  }

  throw new Error("createPairFromEnum requires every key to equal its value");
}

function createPairFromEnum<const T extends string>(
  ...e: T[]
): {
  [K in T]: K;
} {
  const pairs: Partial<Record<T, T>> = {};

  for (const key of e) {
    pairs[key] = key;
  }

  return toPairRecord(e, pairs);
}

export const PATH_NAMES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  BLOGS: "/dashboard/blogs",
  BLOG_CREATE: "/dashboard/blogs/create",
  BLOG_EDIT: (id: string) => `/dashboard/blogs/edit/${id}`,
  BLOG_DETAIL: (id: string) => `/dashboard/blogs/detail/${id}`,
  BLOG_PREVIEW: (id: string) => `/dashboard/blogs/preview/${id}`,
  CONTENT_SETTER: "/dashboard/content-settings",
} as const;

export const RTDB_KEYS = createPairFromEnum(
  "HOME_PINNED_CONTENT",
  "HOME_ATTORNEY_ORDER",
  "PRACTICE_AREA_ATTORNEY_ORDER",
  "ATTORNEY_ORDER",
  "PAGE_SETTINGS"
);

export const LOCAL_STORAGE_KEYS = createPairFromEnum("IMAGE_COVER");

export const SESSION_STORAGE_KEYS = createPairFromEnum(
  "CREATE_STAFF_FORM",
  "EDIT_STAFF_FORM",
  "CREATE_BLOG_FORM",
  "EDIT_BLOG_FORM",
  "CREATE_PUBLICATION_FORM",
  "EDIT_PUBLICATION_FORM"
);

export const DEBOUNCE_DEFAULT_TIME = 500;

export const CREATE_STAFF_FORM_CONSTANTS = {
  PROFILE_PICTURE: {
    MAX_WIDTH: 4000 as const,
    MAX_HEIGHT: 6000 as const,
    // 2MB
    MAX_SIZE: 10 * 1024 * 1024,
    // SAFETY: callers only use this list with `Array#includes` on an arbitrary
    // `File.type` value, so the literal tuple is widened to `string[]`.
    IMAGE_TYPES: ["image/jpeg", "image/png"] as string[],
  },
  SLUG: {
    REGEX: /^[a-z0-9]*(?:-[a-z0-9]+)*$/u,
  },
  BIO: {
    MIN_LENGTH: 100,
  },
  CV: {
    // 10MB
    MAX_SIZE: 10 * 1024 * 1024,
    // SAFETY: callers only use this list with `Array#includes` on an arbitrary
    // `File.type` value, so the literal tuple is widened to `string[]`.
    FILE_TYPES: ["application/pdf"] as string[],
  },
  LINKEDIN: {
    REGEX:
      /^(?<protocol>https?:\/\/)?(?<subdomain>www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/u,
  },
  MSG: {
    PP_IMAGE_TYPE_MSG: "Gambar harus berupa PNG atau JPEG",
    PP_IMAGE_SIZE_MSG: "Ukuran file maksimal 10MB",
    PP_IMAGE_DIMENSION_MSG: "Ukuran maksimal gambar 375x433",
    BIO_MIN_LENGTH_MSG: "Panjang bio minimal 100 karakter",
    CV_SIZE_MSG: "Ukuran file maksimal 10MB",
    CV_TYPE_MSG: "File harus berupa PDF",
    LINKEDIN_URL_MSG:
      "URL LinkedIn harus seperti ini: https://www.linkedin.com/in/john-doe",
    CV_FILE_TYPE_MSG: "File CV harus berupa PDF",
  },
} as const;

export const CREATE_CATEGORY_FORM_CONSTANTS = {
  NAME: {
    MIN_LENGTH: 4,
    MAX_LENGTH: 50,
  },
  MSG: {
    CATEGORY_NAME_EMPTY_MSG: "Nama kategori tidak boleh kosong",
    CATEGORY_NAME_MIN_LENGTH_MSG: "Nama kategori harus lebih dari 4 karakter",
    CATEGORY_NAME_MAX_LENGTH_MSG:
      "Nama kategori tidak boleh lebih dari 50 karakter",
    CATEGORY_NAME_EXISTS_MSG: "Nama kategori sudah ada",
  },
} as const;

export const CREATE_CONTENT_FORM_CONSTANTS = {
  TITLE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 200,
  },
  SLUG: {
    REGEX: /^[a-z0-9]*(?:-[a-z0-9]+)*$/u,
  },
  COVER_IMAGE: {
    MAX_WIDTH: 6000 as const,
    MAX_HEIGHT: 4000 as const,
    // 10MB
    MAX_SIZE: 10 * 1024 * 1024,
    // SAFETY: callers only use this list with `Array#includes` on an arbitrary
    // `File.type` value, so the literal tuple is widened to `string[]`.
    IMAGE_TYPES: ["image/jpeg", "image/png"] as string[],
  },
  CONTENT: {
    MIN_LENGTH: 100,
  },
  STATUS: {
    VALID_STATUSES: ["draft", "published"] as const,
  },
  PUBLICATION: {
    // SAFETY: callers only use this list with `Array#includes` on an arbitrary
    // `File.type` value, so the literal tuple is widened to `string[]`.
    FILE_TYPES: ["application/pdf"] as string[],
    // 20MB
    MAX_SIZE: 20 * 1024 * 1024,
  },
  MSG: {
    TITLE_MIN_LENGTH_MSG: "Judul minimal 10 karakter",
    TITLE_MAX_LENGTH_MSG: "Judul maksimal 200 karakter",
    SLUG_REGEX_MSG:
      "Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung",
    COVER_IMAGE_TYPE_MSG: "Gambar harus berupa PNG atau JPEG",
    COVER_IMAGE_SIZE_MSG: "Ukuran file maksimal 10MB",
    COVER_IMAGE_DIMENSION_MSG: "Ukuran maksimal gambar 4000x6000",
    CONTENT_MIN_LENGTH_MSG: "Konten minimal 100 karakter",
    CATEGORY_REQUIRED_MSG: "Kategori harus dipilih",
    AUTHOR_REQUIRED_MSG: "Penulis harus dipilih",
    COVER_IMAGE_REQUIRED_MSG: "Gambar sampul harus diunggah",
    PUBLICATION_FILE_TYPE_MSG: "File publikasi harus berupa PDF",
    PUBLICATION_FILE_SIZE_MSG: "Ukuran file publikasi maksimal 20MB",
    PUBLICATION_FILE_REQUIRED_MSG: "File publikasi harus diunggah",
    PUBLISHED_AT_DATE_MSG: "Tanggal publikasi harus berupa tanggal yang valid",
  },
} as const;

export const IMAGES_STORAGE_PATH = {
  PROFILE_PICTURE: "profile_pictures",
  BLOG: "blogs",
  CV: "cv",
  BLOG_IMAGES: "blog_images",
  PUBLICATIONS: "publications",
  PUBLICATION_IMAGES: "publication_images",
} as const;

export const FILES_STORAGE_PATH = {
  COMPANY_PROFILE: "global_static/company_profile",
} as const;

export const PAGE_SETTINGS_CONSTANTS = {
  COMPANY_PROFILE: {
    // SAFETY: callers only use this list with `Array#includes` on an arbitrary
    // `File.type` value, so the literal tuple is widened to `string[]`.
    FILE_TYPES: ["application/pdf"] as string[],
    // 20MB
    MAX_SIZE: 20 * 1024 * 1024,
  },
  MSG: {
    COMPANY_PROFILE_TYPE_MSG: "File profil perusahaan harus berupa PDF",
    COMPANY_PROFILE_SIZE_MSG: "Ukuran file profil perusahaan maksimal 20MB",
    COMPANY_PROFILE_REQUIRED_MSG:
      "Pilih file profil perusahaan terlebih dahulu",
  },
} as const;
