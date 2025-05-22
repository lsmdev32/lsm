import { os } from "@orpc/server"
import type { Firestore } from "firebase/firestore"
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import { z } from "zod"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import {
	ContentDetailPageDataInputSchema,
	ContentDetailPageDataOutputSchema,
	HomepageDataOutputSchema,
	OurAttorneyDetailPageDataInputSchema,
	OurAttorneyDetailPageDataOutputSchema,
	OurAttorneysPageDataOutputSchema,
	PracticeAreaPageDataOutputSchema,
} from "~/lib/rest/schema"
import type { StaffTypeFilterType } from "~/lib/rest/schema"

type Middleware = {
	db: Firestore
}

const base = os.errors({
	NOT_FOUND: {
		status: 404,
		message: "Not found",
		data: z.null()
			.default(null),
	},
})

const homePageData = base
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
					id: faker.string.nanoid(),
					email: faker.internet.email(),
					name: faker.person.fullName(),
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
				status: 200,
				data: {
					partners: {
						data: partners,
						total: partners.length,
					},
				},
			},
		}
	})

const practiceAreasPageData = base
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
				id: faker.string.nanoid(),
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
					id: faker.string.nanoid(),
					name: faker.person.fullName(),
					photo_url: faker.image.personPortrait(),
				},
			}))

		const ourAttorneys = Array
			.from({ length: staffCount })
			.map(() => (
				{
					id: faker.string.nanoid(),
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
				status: 200,
				data: {
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

const ourAttorneysPageData = base
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.PAGE_DATA_STAFFS,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.output(OurAttorneysPageDataOutputSchema)
	.handler(async function () {
		const partners = Array
			.from({ length: 3 })
			.map(() => (
				{
					id: faker.string.nanoid(),
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

		const associates = Array
			.from({ length: 12 })
			.map(() => (
				{
					id: faker.string.nanoid(),
					email: faker.internet.email(),
					name: faker.person.firstName(),
					image_url: faker.image.personPortrait(),
					linkedin_url: faker.internet.url(),
					slug: faker.person.fullName()
						.replace(/[^a-zA-Z0-9\s]/g, "")
						.split(" ")
						.join("-")
						.toLowerCase(),
					type: faker.helpers.arrayElement<StaffTypeFilterType>(["associates"]),
				}
			))

		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					partners: {
						data: partners,
						total: partners.length,
					},
					associates: {
						data: associates,
						total: associates.length,
					},
				},
			},
		}
	})

const ourAttorneyDetailPageData = base
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.PAGE_DATA_STAFF_DETAIL,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.input(OurAttorneyDetailPageDataInputSchema)
	.output(OurAttorneyDetailPageDataOutputSchema)
	.handler(async function () {
		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					person: {
						id: faker.string.nanoid(),
						email: faker.internet.email(),
						name: faker.person.firstName(),
						image_url: faker.image.personPortrait(),
						linkedin_url: faker.internet.url(),
						slug: faker.person.fullName()
							.replace(/[^a-zA-Z0-9\s]/g, "")
							.split(" ")
							.join("-")
							.toLowerCase(),
						type: faker.helpers.arrayElement<Exclude<StaffTypeFilterType, "all">>(["partners"]),
						short_bio: faker.lorem.paragraph(2),
						bio: faker.lorem.paragraph(10),
					},
					publications: [
						{
							id: faker.string.nanoid(),
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
						},
					],
					other_associates: [
						{
							id: faker.string.nanoid(),
							name: faker.person.firstName(),
							slug: faker.person.fullName()
								.replace(/[^a-zA-Z0-9\s]/g, "")
								.split(" ")
								.join("-")
								.toLowerCase(),
						},
					],
					other_partners: [
						{
							id: faker.string.nanoid(),
							name: faker.person.firstName(),
							slug: faker.person.fullName()
								.replace(/[^a-zA-Z0-9\s]/g, "")
								.split(" ")
								.join("-")
								.toLowerCase(),
						},
					],
				},
			},
		}
	})

const blogDetailPageData = base
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.PAGE_DATA_BLOG_DETAIL,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.input(ContentDetailPageDataInputSchema)
	.output(ContentDetailPageDataOutputSchema)
	.handler(async function () {
		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					detail: {
						id: faker.string.nanoid(),
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
						content: faker.lorem.paragraph(10),
						tags: [faker.lorem.word()],
						type: "blog",
					},
				},
			},
		}
	})

const publicationDetailPageData = base
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.PAGE_DATA_PUBLICATION_DETAIL,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.input(ContentDetailPageDataInputSchema)
	.output(ContentDetailPageDataOutputSchema)
	.handler(async function () {
		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					detail: {
						id: faker.string.nanoid(),
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
						content: faker.lorem.paragraph(10),
						tags: [faker.lorem.word()],
						type: "publication",
						publication_author: {
							id: faker.string.nanoid(),
							name: faker.person.fullName(),
							photo_url: faker.image.personPortrait(),
							slug: faker.person.fullName()
								.replace(/[^a-zA-Z0-9\s]/g, "")
								.split(" ")
								.join("-")
								.toLowerCase(),
						},
						publication_file_url: faker.image.urlPicsumPhotos(),
					},
				},
			},
		}
	})

const router = {
	homePageData,
	practiceAreasPageData,
	ourAttorneysPageData,
	ourAttorneyDetailPageData,
	blogDetailPageData,
	publicationDetailPageData,
}

export default router
export type ContractRouterClient = typeof router
