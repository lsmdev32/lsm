import { OpenAPIHandler } from "@orpc/openapi/fetch"
import { CORSPlugin } from "@orpc/server/plugins"
import { ZodSmartCoercionPlugin } from "@orpc/zod"
import { APP_OPENAPI_INFO } from "~/lib/rest/config/constants"
import cors from "~/lib/rest/config/cors"
import router from "~/lib/rest/router"
import { openAPIGenerator } from "~/lib/rest/utils"

export const handler = new OpenAPIHandler(router, {
	plugins: [
		new CORSPlugin({
			...cors,
		}),
		new ZodSmartCoercionPlugin(),
	],
})

export const generateDocs = async () => openAPIGenerator.generate(router, {
	info: APP_OPENAPI_INFO.REST,
	servers: [
		{
			url: process.env.NUXT_API_URL || "http://localhost:3000/rest",
			description: "Primary server",
		},
	],
})
