import { getFirestore } from "firebase/firestore"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import { generateDocs, handler } from "~/lib/rest/handler"
import { createHTMLScalarJSONDoc } from "~/lib/rest/utils"

const notFoundResponseBody = {
	message: "Not Found",
	status_code: 404,
}

export default defineEventHandler(async (event) => {
	const request = toWebRequest(event)
	const db = getFirestore()

	if (!request) {
		setResponseStatus(event, 404, "Not Found")
		return notFoundResponseBody
	}

	const { pathname } = new URL(request.url)

	if (pathname.startsWith(API_PATH_PREFIXES.REST_DOCS_JSON)) {
		return await generateDocs()
	}

	if (pathname.startsWith(API_PATH_PREFIXES.REST_DOCS_REFERENCE)) {
		return createHTMLScalarJSONDoc()
	}

	const { matched, response } = await handler.handle(
		request,
		{
			prefix: API_PATH_PREFIXES.REST,
			context: {
				db,
			},
		},
	)

	console.log("matched", matched)
	if (matched) {
		return response
	}

	return notFoundResponseBody
})
