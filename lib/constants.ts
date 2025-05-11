export const PATH_NAMES = {
	LOGIN: "/login",
	DASHBOARD: "/dashboard",
	BLOGS: "/dashboard/blogs",
	BLOG_CREATE: "/dashboard/blogs/create",
	BLOG_EDIT: (id: string) => `/dashboard/blogs/edit/${id}`,
	BLOG_DETAIL: (id: string) => `/dashboard/blogs/detail/${id}`,
	BLOG_PREVIEW: (id: string) => `/dashboard/blogs/preview/${id}`,
} as const

export const LOCAL_STORAGE_KEYS = {
	CREATE_STAFF_FORM: "create-staff-form",
} as const

export const DEBOUNCE_DEFAULT_TIME = 500

export const PROFILE_PICTURE = {
	MAX_WIDTH: 100,
	MAX_HEIGHT: 433,
	MAX_SIZE: 2 * 1024 * 1024, // 2MB
	IMAGE_TYPES: [
		"image/jpeg",
		"image/png",
	],
}

export const CREATE_STAFF_FORM_CONSTANTS = {
	PROFILE_PICTURE: {
		MAX_WIDTH: 375 as const,
		MAX_HEIGHT: 433 as const,
		MAX_SIZE: 2 * 1024 * 1024, // 2MB
		IMAGE_TYPES: [
			"image/jpeg",
			"image/png",
		],
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
	MSG: {
		PP_IMAGE_TYPE_MSG: "Gambar harus berupa PNG atau JPEG",
		PP_IMAGE_SIZE_MSG: "Ukuran file maksimal 2MB",
		PP_IMAGE_DIMENSION_MSG: "Ukuran maksimal gambar 375x433",
		BIO_MIN_LENGTH_MSG: "Panjang bio minimal 100 karakter",
		CV_SIZE_MSG: "Ukuran file maksimal 10MB",
		CV_TYPE_MSG: "File harus berupa PDF",
	},
} as const
