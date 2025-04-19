import type { OpenAPIV3_1 } from "openapi-types"

export const API_PATH_PREFIXES = {
	REST: "/rest",
	REST_DOCS_REFERENCE: "/rest/reference",
	REST_DOCS_JSON: "/rest/reference/docs.json",

	/**
	 * api paths prefixes
	 */
	HOME: "/home",
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
