export const PATH_NAMES = {
	LOGIN: "/login",
	DASHBOARD: "/dashboard",
	BLOGS: "/dashboard/blogs",
	BLOG_CREATE: "/dashboard/blogs/create",
	BLOG_EDIT: (id: string) => `/dashboard/blogs/edit/${id}`,
	BLOG_DETAIL: (id: string) => `/dashboard/blogs/detail/${id}`,
	BLOG_PREVIEW: (id: string) => `/dashboard/blogs/preview/${id}`,
} as const
