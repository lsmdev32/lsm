import { os } from "@orpc/server"
import type { Firestore } from "firebase/firestore"
import { faker } from "@faker-js/faker"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import { HomepageDataOutputSchema, type StaffTypeFilterType } from "~/lib/rest/schema"

type Middleware = {
	db: Firestore
}

const homepageData = os
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.HOME,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.output(HomepageDataOutputSchema)
	.handler(async function () {
		const staffCount = 5

		const partners = Array
			.from({ length: staffCount })
			.map(() => (
				{
					id: crypto.randomUUID(),
					email: faker.internet.email(),
					name: faker.person.firstName(),
					image_url: faker.image.personPortrait(),
					linkedin_url: faker.internet.url(),
					slug: faker.person.fullName()
						.replace(/[^a-zA-Z0-9\s]/g, "")
						.split(" ")
						.join("-")
						.toLowerCase(),
					type: faker.helpers.arrayElement<StaffTypeFilterType>(["partners"]),
				}
			))

		return {
			body: {
				message: "ok",
				status_code: 200,
				result: {
					partners: {
						data: partners,
						total: partners.length,
					},
				},
			},
		}
	})

export default {
	homepageData,
}
