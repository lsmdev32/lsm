import { os } from "@orpc/server"
import type { Firestore } from "firebase/firestore"
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import { HomepageDataOutputSchema, PracticeAreaPageDataOutputSchema, type StaffTypeFilterType } from "~/lib/rest/schema"

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

const practiceAreasPageData = os
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.PAGE_DATA_PRACTICE_AREA,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.output(PracticeAreaPageDataOutputSchema)
	.handler(async function () {
		const staffCount = 5

		const newsAndPublications = Array
			.from({ length: 4 })
			.map(() => ({
				title: faker.lorem.sentence(5),
				slug: faker.lorem.sentence(5)
					.replace(/[^a-zA-Z0-9\s]/g, "")
					.split(" ")
					.join("-")
					.toLowerCase(),
				image_url: faker.image.urlPicsumPhotos(),
				published_at: dayjs(faker.date.past())
					.format("MMM D, YYYY"),
				category: faker.lorem.word(),
				author: {
					name: faker.person.fullName(),
					photo_url: faker.image.personPortrait(),
				},
			}))

		const ourAttorneys = Array
			.from({ length: staffCount })
			.map(() => (
				{
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
					news_and_publications: {
						data: newsAndPublications,
						total: newsAndPublications.length,
					},
					our_attorneys: {
						data: ourAttorneys,
						total: ourAttorneys.length,
					},
				},
			},
		}
	})

export default {
	homepageData,
	practiceAreasPageData,
}
