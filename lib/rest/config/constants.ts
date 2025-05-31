import type { OpenAPIV3_1 } from "openapi-types"

export const API_PATH_PREFIXES = {
	REST: "/rest",
	REST_DOCS_REFERENCE: "/rest/reference",
	REST_DOCS_JSON: "/rest/reference/docs.json",

	/**
	 * api paths prefixes
	 */
	HOME: "/page-data/home",
	PAGE_DATA_PRACTICE_AREA: "/page-data/practice-areas",
	PAGE_DATA_BLOG_AND_PUBLICATIONS: "/page-data/blogs-publications",
	PAGE_DATA_BLOG_DETAIL: "/page-data/blogs/{slug}",
	PAGE_DATA_PUBLICATION_DETAIL: "/page-data/publications/{slug}",
	PAGE_DATA_STAFF_DETAIL: "/page-data/staffs/{slug}",
	PAGE_DATA_STAFFS: "/page-data/staffs",
	PAGE_DATA_CATEGORIES: "/page-data/categories",
	PAGE_DATA_CONTENT_LIST: "/page-data/content-list",
} satisfies Record<string, `/${string}`>

export const APP_OPENAPI_INFO = {
	REST: {
		title: "LSM Public API",
		version: "1.0.0",
		description: "LSM Public API Documentation",
	},

} satisfies Record<string, OpenAPIV3_1.InfoObject>
