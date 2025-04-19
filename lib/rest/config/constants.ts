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
	PAGE_DATA_BLOG_DETAIL: "/page-data/blog/{slug}",
	PAGE_DATA_PUBLICATION_DETAIL: "/page-data/publication/{slug}",
	PAGE_DATA_STAFF_DETAIL: "/page-data/staff/{slug}",
	HOME_STAFFS: "/home/staffs",
	HOME_PUBLICATIONS: "/home/publications",
} satisfies Record<string, `/${string}`>

export const APP_OPENAPI_INFO = {
	REST: {
		title: "LSM Public API",
		version: "1.0.0",
		description: "LSM Public API Documentation",
	},

} satisfies Record<string, OpenAPIV3_1.InfoObject>
