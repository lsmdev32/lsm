import { os } from "@orpc/server"
import { getDocs, limit, query, where } from "firebase/firestore"
import type { Firestore } from "firebase/firestore"
import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import { z } from "zod"
import type { algoliasearch } from "algoliasearch"
import type { Database } from "firebase/database"
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

import { getPublicationCollectionRef, getStaffCollectionRef } from "~/lib/firestore-model"

type Middleware = {
	firestore: Firestore
	rtdb: Database
	algoliaClient: ReturnType<typeof algoliasearch>
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
	.handler(async function ({ context }) {
		const q = query(
			getStaffCollectionRef(context.firestore),
			where("type", "==", "partner"),
			limit(4),
		)
		const res = await getDocs(q)

		const partners = res.docs
			.map(doc => doc.data())
			.map(v => ({
				type: v.type,
				id: v.id!,
				slug: v.slug,
				name: v.fullname,
				image_url: v.profile_picture_url,
				linkedin_url: v.linkedin_url,
				email: v.email,
			}))

		return {
			body: {
				status: 200,
				message: "ok",
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
		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					news_and_publications: {
						data: [],
						total: 0,
					},
					our_attorneys: {
						data: [],
						total: 0,
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
	.handler(async function ({ context }) {
		const partnersQuery = query(
			getStaffCollectionRef(context.firestore),
			where("type", "==", "partner"),
			limit(6),
		)
		const partnersSnapshot = await getDocs(partnersQuery)
		const partners = partnersSnapshot.docs.map((doc) => {
			const partnerData = doc.data()
			return {
				id: partnerData.id!,
				name: partnerData.fullname,
				slug: partnerData.slug,
				image_url: partnerData.profile_picture_url,
				type: partnerData.type,
				email: partnerData.email,
				linkedin_url: partnerData.linkedin_url,
			}
		})

		const associatesQuery = query(
			getStaffCollectionRef(context.firestore),
			where("type", "==", "associate"),
			limit(6),
		)

		const associatesSnapshot = await getDocs(associatesQuery)
		const associates = associatesSnapshot.docs.map((doc) => {
			const associateData = doc.data()
			return {
				id: associateData.id!,
				name: associateData.fullname,
				slug: associateData.slug,
				image_url: associateData.profile_picture_url,
				email: associateData.email,
				linkedin_url: associateData.linkedin_url,
				type: associateData.type,
			}
		})

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
	.handler(async function ({ context, input, errors }) {
		const staffColRef = getStaffCollectionRef(context.firestore)

		const q = query(
			staffColRef,
			where("slug", "==", input.params.slug),
		)
		const staffDoc = await getDocs(q)

		if (staffDoc.empty) {
			throw errors.NOT_FOUND()
		}

		const staffData = staffDoc.docs.at(0)!.data()

		const publicationsQuery = query(
			getPublicationCollectionRef(context.firestore),
			where("author_id", "==", staffData.id),
			limit(6),
		)

		const publicationsSnapshot = await getDocs(publicationsQuery)
		const publications = publicationsSnapshot.docs.map((doc) => {
			const pubData = doc.data()
			return {
				id: doc.id,
				title: pubData.title,
				slug: pubData.slug,
				image_url: pubData.cover_image_url,
				published_at: dayjs(pubData.published_at)
					.format("MMM D, YYYY"),
				category: pubData.category_id,
			}
		})

		const otherAssociatesQuery = query(
			getStaffCollectionRef(context.firestore),
			where("type", "==", "associate"),
			where("slug", "!=", staffData.slug),
			limit(3),
		)

		const otherAssociatesSnapshot = await getDocs(otherAssociatesQuery)
		const otherAssociates = otherAssociatesSnapshot.docs.map((doc) => {
			const associateData = doc.data()
			return {
				id: associateData.id!,
				name: associateData.fullname,
				slug: associateData.slug,
			}
		})

		const otherPartnersQuery = query(
			getStaffCollectionRef(context.firestore),
			where("type", "==", "partner"),
			where("slug", "!=", staffData.slug),
			limit(3),
		)

		const otherPartnersSnapshot = await getDocs(otherPartnersQuery)
		const otherPartners = otherPartnersSnapshot.docs.map((doc) => {
			const partnerData = doc.data()
			return {
				id: partnerData.id!,
				name: partnerData.fullname,
				slug: partnerData.slug,
			}
		})

		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					person: {
						id: staffData.id!,
						email: staffData.email,
						name: staffData.fullname,
						image_url: staffData.profile_picture_url,
						linkedin_url: staffData.linkedin_url,
						slug: staffData.slug,
						type: staffData.type,
						short_bio: staffData.short_bio,
						bio: staffData.bio,
					},
					publications: publications,
					other_associates: otherAssociates,
					other_partners: otherPartners,
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
