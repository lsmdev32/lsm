import { onError, ORPCError, ValidationError } from "@orpc/server"
import { OpenAPIHandler } from "@orpc/openapi/fetch"
import { CORSPlugin } from "@orpc/server/plugins"
import { ZodSmartCoercionPlugin } from "@orpc/zod"
import { ZodError } from "zod"
import type { ZodIssue } from "zod"
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
	clientInterceptors: [
		onError((error) => {
			console.log(error)

			if (error instanceof ORPCError
				&& error.code === "BAD_REQUEST"
				&& error.data instanceof ValidationError
			) {
				const zodError = new ZodError((error.cause as Record<string, unknown>).issues as ZodIssue[])

				throw new ORPCError("INPUT_VALIDATION_FAILED", {
					status: 442,
					data: zodError.flatten(),
					cause: error.cause,
				})
			}

			if (error instanceof ORPCError
				&& error.code === "INTERNAL_SERVER_ERROR"
				&& error.data instanceof ValidationError
			) {
				throw new ORPCError("OUTPUT_VALIDATION_ERROR", {
					cause: error.cause,
				})
			}
		}),

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
