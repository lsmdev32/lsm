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
			if (
				error instanceof ORPCError
				&& error.code === "BAD_REQUEST"
				&& error.cause instanceof ValidationError
			) {
				// If you only use Zod you can safely cast to ZodIssue[]
				const zodError = new ZodError(error.cause.issues as ZodIssue[])

				throw new ORPCError("INPUT_VALIDATION_FAILED", {
					status: 422,
					data: zodError.flatten(),
					cause: error.cause,
				})
			}

			if (
				error instanceof ORPCError
				&& error.code === "INTERNAL_SERVER_ERROR"
				&& error.cause instanceof ValidationError
			) {
				// If you only use Zod you can safely cast to ZodIssue[]
				const zodError = new ZodError(error.cause.issues as ZodIssue[])

				throw new ORPCError("OUTPUT_VALIDATION_FAILED", {
					cause: error.cause,
					status: 500,
					data: zodError.flatten(),
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
