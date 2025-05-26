function createPairFromEnum<const T extends string>(...e: T[]): {
	[K in T]: K
} {
	const initialValue = {} as { [K in T]: K }
	return e.reduce((acc, curr) => ({
		...acc,
		[curr]: curr,
	}), initialValue)
}

export const PATH_NAMES = {
	LOGIN: "/login",
	DASHBOARD: "/dashboard",
	BLOGS: "/dashboard/blogs",
	BLOG_CREATE: "/dashboard/blogs/create",
	BLOG_EDIT: (id: string) => `/dashboard/blogs/edit/${id}`,
	BLOG_DETAIL: (id: string) => `/dashboard/blogs/detail/${id}`,
	BLOG_PREVIEW: (id: string) => `/dashboard/blogs/preview/${id}`,
} as const

export const LOCAL_STORAGE_KEYS = createPairFromEnum("IMAGE_COVER")

export const SESSION_STORAGE_KEYS = createPairFromEnum(
	"CREATE_STAFF_FORM",
	"EDIT_STAFF_FORM",
	"CREATE_BLOG_FORM",
	"EDIT_BLOG_FORM",
	"CREATE_PUBLICATION_FORM",
	"EDIT_PUBLICATION_FORM",
)

export const DEBOUNCE_DEFAULT_TIME = 500

export const CREATE_STAFF_FORM_CONSTANTS = {
	PROFILE_PICTURE: {
		MAX_WIDTH: 4000 as const,
		MAX_HEIGHT: 6000 as const,
		MAX_SIZE: 10 * 1024 * 1024, // 2MB
		IMAGE_TYPES: [
			"image/jpeg",
			"image/png",
		] as string[],
	},
	SLUG: {
		REGEX: /^[a-z0-9]*(?:-[a-z0-9]+)*$/,
	},
	BIO: {
		MIN_LENGTH: 100,
	},
	CV: {
		MAX_SIZE: 10 * 1024 * 1024, // 10MB
		FILE_TYPES: ["application/pdf"] as string[],
	},
	LINKEDIN: {
		REGEX: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
	},
	MSG: {
		PP_IMAGE_TYPE_MSG: "Gambar harus berupa PNG atau JPEG",
		PP_IMAGE_SIZE_MSG: "Ukuran file maksimal 10MB",
		PP_IMAGE_DIMENSION_MSG: "Ukuran maksimal gambar 375x433",
		BIO_MIN_LENGTH_MSG: "Panjang bio minimal 100 karakter",
		CV_SIZE_MSG: "Ukuran file maksimal 10MB",
		CV_TYPE_MSG: "File harus berupa PDF",
		LINKEDIN_URL_MSG: "URL LinkedIn harus seperti ini: https://www.linkedin.com/in/john-doe",
		CV_FILE_TYPE_MSG: "File CV harus berupa PDF",
	},
} as const

export const CREATE_CATEGORY_FORM_CONSTANTS = {
	NAME: {
		MIN_LENGTH: 4,
		MAX_LENGTH: 50,
	},
	MSG: {
		CATEGORY_NAME_EMPTY_MSG: "Nama kategori tidak boleh kosong",
		CATEGORY_NAME_MIN_LENGTH_MSG: "Nama kategori harus lebih dari 4 karakter",
		CATEGORY_NAME_MAX_LENGTH_MSG: "Nama kategori tidak boleh lebih dari 50 karakter",
		CATEGORY_NAME_EXISTS_MSG: "Nama kategori sudah ada",
	},
} as const

export const CREATE_CONTENT_FORM_CONSTANTS = {
	TITLE: {
		MIN_LENGTH: 10,
		MAX_LENGTH: 100,
	},
	SLUG: {
		REGEX: /^[a-z0-9]*(?:-[a-z0-9]+)*$/,
	},
	COVER_IMAGE: {
		MAX_WIDTH: 6000 as const,
		MAX_HEIGHT: 4000 as const,
		MAX_SIZE: 10 * 1024 * 1024, // 10MB
		IMAGE_TYPES: [
			"image/jpeg",
			"image/png",
		] as string[],
	},
	CONTENT: {
		MIN_LENGTH: 100,
	},
	STATUS: {
		VALID_STATUSES: [
			"draft", "published",
		] as const,
	},
	PUBLICATION: {
		FILE_TYPES: ["application/pdf"] as string[],
		MAX_SIZE: 20 * 1024 * 1024, // 20MB
	},
	MSG: {
		TITLE_MIN_LENGTH_MSG: "Judul minimal 10 karakter",
		TITLE_MAX_LENGTH_MSG: "Judul maksimal 100 karakter",
		SLUG_REGEX_MSG: "Slug hanya boleh mengandung huruf kecil, angka, dan tanda hubung",
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
	},
} as const

export const IMAGES_STORAGE_PATH = {
	PROFILE_PICTURE: "profile_pictures",
	BLOG: "blogs",
	CV: "cv",
	BLOG_IMAGES: "blog_images",
	PUBLICATIONS: "publications",
	PUBLICATION_IMAGES: "publication_images",
} as const
