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

export const LOCAL_STORAGE_KEYS = createPairFromEnum()

export const SESSION_STORAGE_KEYS = createPairFromEnum(
	"CREATE_STAFF_FORM",
	"EDIT_STAFF_FORM",
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
		PP_IMAGE_SIZE_MSG: "Ukuran file maksimal 2MB",
		PP_IMAGE_DIMENSION_MSG: "Ukuran maksimal gambar 375x433",
		BIO_MIN_LENGTH_MSG: "Panjang bio minimal 100 karakter",
		CV_SIZE_MSG: "Ukuran file maksimal 10MB",
		CV_TYPE_MSG: "File harus berupa PDF",
		LINKEDIN_URL_MSG: "URL LinkedIn harus seperti ini: https://www.linkedin.com/in/john-doe",
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

export const IMAGES_STORAGE_PATH = {
	PROFILE_PICTURE: "profile_pictures",
	BLOG: "blogs",
	CV: "cv",
} as const
