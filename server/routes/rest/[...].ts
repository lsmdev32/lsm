import { algoliasearch } from "algoliasearch"
import { getFirestore } from "firebase/firestore"
import { getDatabase } from "firebase/database"
import { defineEventHandler } from "#imports"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import { handler } from "~/lib/rest/handler"
import { createHTMLScalarJSONDoc } from "~/lib/rest/utils"

const notFoundResponseBody = {
	message: "Not Found",
	status_code: 404,
}

export default defineEventHandler(async (event) => {
	const algoliaClient = algoliasearch(
		process.env.NUXT_PUBLIC_ALGOLIA_APP_ID || "",
		process.env.NUXT_PUBLIC_ALGOLIA_API_KEY || "",
	)

	const firestore = getFirestore()
	const rtdb = getDatabase()

	const request = toWebRequest(event)

	if (!request) {
		setResponseStatus(event, 404, "Not Found")
		return notFoundResponseBody
	}

	const { pathname } = new URL(request.url)

	if (pathname.startsWith(API_PATH_PREFIXES.REST_DOCS_REFERENCE)) {
		return createHTMLScalarJSONDoc()
	}

	const { matched, response } = await handler.handle(
		request,
		{
			prefix: API_PATH_PREFIXES.REST,
			context: {
				algoliaClient,
				rtdb,
				firestore,
			},
		},
	)

	if (matched) {
		return response
	}

	return notFoundResponseBody
})
