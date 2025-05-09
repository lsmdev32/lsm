import createClient, { wrapAsPathBasedClient } from "openapi-fetch"
import type { ClientOptions } from "openapi-fetch"
import type { paths } from "~/types/openapi"

const options: ClientOptions = {
	baseUrl: process.env.NUXT_API_URL,
}

const client = createClient<paths>(options)

client.use({
	onRequest({ request }) {
		console.log(`Request: ${request.method} ${request.url}`)
	},
	async onResponse({ response }) {
		const json = await response.json()
		console.log(`Response: ${JSON.stringify(json)}`)

		return json
	},
	onError({ error, request }) {
		console.error(`url ${request.url} Error: ${(error as Error)?.message}`)
		console.log()
	},
})
export default wrapAsPathBasedClient(client)
