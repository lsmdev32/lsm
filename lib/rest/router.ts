import { os } from "@orpc/server"
import type { Firestore } from "firebase/firestore"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import { HomeLawyersInputSchema, HomeLawyersOutputSchema } from "~/lib/rest/schema"

type Middleware = {
	db: Firestore
}

const homeLawyers = os
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.HOME_LAWYER,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.input(HomeLawyersInputSchema)
	.output(HomeLawyersOutputSchema)
	.handler(async function () {
		return {
			body: {
				message: "ok",
				status_code: 200,
				result: {
					data: [],
				},
			},
		}
	})

export default {
	homeLawyers,
	// add more routes here as needed
}
