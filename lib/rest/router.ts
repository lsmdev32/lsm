import { os } from "@orpc/server"
import type { Firestore } from "firebase/firestore"
import { faker } from "@faker-js/faker"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import { HomeStaffsInputSchema, HomeStaffsOutputSchema, type StaffTypeFilterType } from "~/lib/rest/schema"

type Middleware = {
	db: Firestore
}

const homeStaffs = os
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.HOME_STAFFS,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.input(HomeStaffsInputSchema)
	.output(HomeStaffsOutputSchema)
	.handler(async function ({ input }) {
		const person = Array
			.from({ length: input.query.limit })
			.fill(null)
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
					type: input.query.staff_type === "all"
						? faker.helpers.arrayElement<StaffTypeFilterType>([
								"associates", "partners",
							])
						: input.query.staff_type,
				}
			))

		return {
			body: {
				message: "ok",
				status_code: 200,
				result: {
					data: person,
					total: person.length,
				},
			},
		}
	})

export default {
	homeStaffs,
	// add more routes here as needed
}
