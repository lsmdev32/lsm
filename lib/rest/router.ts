import { os } from "@orpc/server"
import { getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import type { Firestore } from "firebase/firestore"
import dayjs from "dayjs"
import { z } from "zod"
import type { algoliasearch } from "algoliasearch"
import type { Database } from "firebase/database"
import { API_PATH_PREFIXES } from "~/lib/rest/config/constants"
import {
	BlogAndPublicationsPageDataInputSchema,
	BlogAndPublicationsPageDataOutputSchema,
	CategoriesSchemaPageDataInputSchema,
	CategoriesSchemaPageDataOutputSchema,
	ContentDetailPageDataInputSchema,
	ContentDetailPageDataOutputSchema,
	HomepageDataOutputSchema,
	OurAttorneyDetailPageDataInputSchema,
	OurAttorneyDetailPageDataOutputSchema,
	OurAttorneysPageDataOutputSchema,
	PracticeAreaPageDataOutputSchema,

} from "~/lib/rest/schema"
import type { ContentDetailPageDataOutputType } from "~/lib/rest/schema"

import { getBlogCollectionRef, getCategoryCollectionRef, getCategoryDocRef, getPublicationCollectionRef, getStaffCollectionRef, getStaffDocRef } from "~/lib/firestore-model"

type Middleware = {
	firestore: Firestore
	rtdb: Database
	algoliaClient: ReturnType<typeof algoliasearch>
}

const base = os.errors({
	NOT_FOUND: {
		status: 404,
		message: "Not found",
		data: z
			.null()
			.default(null),
	},
	INPUT_VALIDATION_FAILED: {
		status: 442,
		message: "Input validation failed",
		data: z.object({
			formErrors: z.array(
				z.string(),
			),
			fieldErrors: z.record(
				z.string(),
				z.array(
					z.string(),
				)
					.optional(),
			),
		}),
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

		const contentQuery = query(
			getPublicationCollectionRef(context.firestore),
			where("type", "==", "publication"),
			where("status", "==", "published"),
			orderBy("published_at", "desc"),
			limit(4),
		)

		const contentSnapshot = await getDocs(contentQuery)

		const contents = contentSnapshot.docs.map((doc) => {
			const data = doc.data()
			return {
				id: doc.id,
				title: data.title,
				slug: data.slug,
				image_url: data.cover_image_url,
				// @ts-expect-error - just ignore
				published_at: dayjs(data.published_at.seconds * 1000)
					.format("MMM D, YYYY"),
				category_id: data.category_id,
				author_id: data.author_id,
				author: null as Record<string, unknown> | null,
				category: null as string | null,
			}
		})

		const contentCategoryIds = Array
			.from(new Set(contents.map(content => content.category_id)))
			.filter(Boolean)

		for (const categoryId of contentCategoryIds) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, categoryId),
			)
			if (!categoryDoc.exists()) continue
			const categoryData = categoryDoc.data()
			if (!categoryData) continue
			contents.forEach((content) => {
				if (content.category_id === categoryId) {
					content.category = categoryData.name
				}
			})
		}
		const contentAuthorIds = Array
			.from(new Set(contents.map(content => content.author_id)))
			.filter(Boolean)

		for (const authorId of contentAuthorIds) {
			if (!authorId) continue
			const authorDoc = await getDoc(
				getStaffDocRef(context.firestore, authorId),
			)
			if (!authorDoc.exists()) continue
			const authorData = authorDoc.data()
			contents.forEach((content) => {
				if (content.author_id === authorId) {
					content.author = {
						name: authorData.fullname,
						photo_url: authorData.profile_picture_url,
					}
				}
			})
		}

		return {
			body: {
				status: 200,
				message: "ok",
				data: {
					partners: {
						data: partners,
						total: partners.length,
					},
					contents: {
						data: contents,
						total: contents.length,
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
	.handler(async function ({ context }) {
		console.log(`Fetching practice areas data...`)

		/**
		 * get contents for practice areas
		 */
		const contentsQuery = query(
			getPublicationCollectionRef(context.firestore),
			where("type", "==", "publication"),
			where("status", "==", "published"),
			orderBy("published_at", "desc"),
			limit(4),
		)

		const contentsSnapshot = await getDocs(contentsQuery)
			.catch((e) => {
				console.log(e)
			})
		const contents = contentsSnapshot.docs.map((doc) => {
			const data = doc.data()
			return {
				id: doc.id,
				title: data.title,
				slug: data.slug,
				image_url: data.cover_image_url,
				// @ts-expect-error - just ignore
				published_at: dayjs(data.published_at.seconds * 1000)
					.format("MMM D, YYYY"),
				category_id: data.category_id,
				author_id: data.author_id,
				author: null as Record<string, unknown> | null,
				category: null as string | null,

			}
		})

		// console.log(`Fetched contents:`, contents)

		const contentCategoryIds = Array
			.from(new Set(contents.map(content => content.category_id)))
			.filter(Boolean)
		for (const categoryId of contentCategoryIds) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, categoryId),
			)

			if (!categoryDoc.exists()) continue
			const categoryData = categoryDoc.data()
			if (!categoryData) continue

			contents.forEach((content) => {
				if (content.category_id === categoryId) {
					content.category = categoryData.name
				}
			})
		}

		const contentAuthorIds = Array
			.from(new Set(contents.map(content => content.author_id)))
			.filter(Boolean)

		for (const authorId of contentAuthorIds) {
			if (!authorId) continue
			const authorDoc = await getDoc(
				getStaffDocRef(context.firestore, authorId),
			)
			if (!authorDoc.exists()) continue
			const authorData = authorDoc.data()
			contents.forEach((content) => {
				if (content.author_id === authorId) {
					content.author = {
						name: authorData.fullname,
						photo_url: authorData.profile_picture_url,
					}
				}
			})

			/**
		 * get attorneys for practice areas
		 */
			const attorneysQuery = query(
				getStaffCollectionRef(context.firestore),
				orderBy("created_at", "desc"),
				where("type", "==", "partner"),
				limit(4),
			)

			const attorneysSnapshot = await getDocs(attorneysQuery)
			const attorneys = attorneysSnapshot.docs.map((doc) => {
				const data = doc.data()
				return {
					id: data.id!,
					name: data.fullname,
					slug: data.slug,
					image_url: data.profile_picture_url,
					type: data.type,
					email: data.email,
					linkedin_url: data.linkedin_url,
				}
			})

			return {
				body: {
					message: "ok",
					status: 200,
					data: {
						news_and_publications: {
							data: contents,
							total: contents.length,
						},
						our_attorneys: {
							data: attorneys,
							total: attorneys.length,
						},
					},
				},
			}
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
	// @ts-expect-error - just ignore
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
			where("type", "==", "publication"),
			where("author_id", "==", staffData.id),
			where("status", "==", "published"),
			orderBy("published_at", "desc"),
			limit(6),
		)

		const publicationsSnapshot = await getDocs(publicationsQuery)
		const publications = publicationsSnapshot
			.docs
			.map((v) => {
				const pubData = v.data()
				return {
					id: v.id,
					title: pubData.title,
					slug: pubData.slug,
					image_url: pubData.cover_image_url,
					// @ts-expect-error - just ignore
					published_at: dayjs(pubData.published_at.seconds * 1000)
						.format("MMM D, YYYY"),
					category: pubData.category_id,
				}
			})

		const publicationCategoryIds = Array
			.from(new Set(publications
				.map(pub => pub.category)))
			.filter(Boolean)

		for (const categoryId of publicationCategoryIds) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, categoryId),
			)

			if (!categoryDoc.exists()) return
			const categoryData = categoryDoc.data()
			if (!categoryData) return

			publications.forEach((pub) => {
				if (pub.category === categoryId) {
					pub.category = categoryData.name
				}
			})
		}

		const otherAssociatesQuery = query(
			getStaffCollectionRef(context.firestore),
			where("type", "==", "associate"),
			where("slug", "!=", staffData.slug),
			limit(10),
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
			limit(10),
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
	.handler(async function ({ context, input, errors }) {
		const q = query(
			getBlogCollectionRef(context.firestore),
			where("type", "==", "blog"),
			where("slug", "==", input.params.slug),
			limit(1),
		)
		const blogSnapshot = await getDocs(q)
		if (blogSnapshot.empty) {
			throw errors.NOT_FOUND()
		}

		const blogData = blogSnapshot.docs.at(0)
			?.data()
		if (!blogData) {
			throw errors.NOT_FOUND()
		}

		if (blogData.status !== "published") {
			throw errors.NOT_FOUND()
		}

		const detail: Partial<ContentDetailPageDataOutputType["body"]["data"]["detail"]> = {
			id: blogData.id!,
			title: blogData.title,
			slug: blogData.slug,
			image_url: blogData.cover_image_url,
			// @ts-expect-error - just ignore
			published_at: dayjs(blogData.published_at.seconds * 1000)
				.format("MMM D, YYYY HH:mm"),
			category: blogData.category_id,
			content: blogData.content,
			tags: blogData.tags || [],
			type: blogData.type,
		}

		if (blogData.author_id) {
			const authorDoc = await getDoc(
				getStaffDocRef(context.firestore, blogData.author_id),
			)

			const authorData = authorDoc.data()
			if (authorData) {
				detail.author = {
					id: authorData.id!,
					name: authorData.fullname,
					image_url: authorData.profile_picture_url,
					slug: authorData.slug,
				}
			}
		}

		if (blogData.category_id) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, blogData.category_id),
			)

			if (categoryDoc.exists()) {
				const categoryData = categoryDoc.data()
				if (categoryData) {
					detail.category = categoryData.name
				}
			}
		}

		const relatedContentsQuery = query(
			getBlogCollectionRef(context.firestore),
			where("category_id", "==", blogData.category_id),
			where("status", "==", "published"),
			where("slug", "!=", blogData.slug),
			limit(3),
		)

		const relatedContentsSnapshot = await getDocs(relatedContentsQuery)
		const relatedContents = relatedContentsSnapshot.docs.map((doc) => {
			const data = doc.data()
			return {
				id: doc.id,
				title: data.title,
				slug: data.slug,
				image_url: data.cover_image_url,
				category: data.category_id,
				published_at: dayjs(data.published_at.seconds * 1000)
					.format("MMM D, YYYY HH:mm"),
				author_id: data.author_id,
				author: null,
			}
		})

		const relatedContentCategoryIds = Array
			.from(new Set(relatedContents
				.map(content => content.category)))
			.filter(Boolean)

		for (const categoryId of relatedContentCategoryIds) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, categoryId),
			)
			if (!categoryDoc.exists()) continue
			const categoryData = categoryDoc.data()
			relatedContents.forEach((content) => {
				if (content.category === categoryId) {
					content.category = categoryData.name
				}
			})
		}

		const relatedContentAuthorIds = Array
			.from(new Set(relatedContents
				.map(content => content.author_id)))
			.filter(Boolean)

		for (const authorId of relatedContentAuthorIds) {
			if (!authorId) continue

			const authorDoc = await getDoc(
				getStaffDocRef(context.firestore, authorId),
			)
			if (!authorDoc.exists()) continue
			const authorData = authorDoc.data()

			relatedContents.forEach((content) => {
				if (content.author_id === authorId) {
					content.author = {
						id: authorData.id!,
						name: authorData.fullname,
						image_url: authorData.profile_picture_url,
						slug: authorData.slug,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} as any
				}
			})
		}

		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					detail: detail as ContentDetailPageDataOutputType["body"]["data"]["detail"],
					related_contents: relatedContents,
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
	.handler(async function ({ context, input, errors }) {
		const q = query(
			getPublicationCollectionRef(context.firestore),
			where("type", "==", "publication"),
			where("status", "==", "published"),
			where("slug", "==", input.params.slug),
			limit(1),
		)

		const publicationSnapshot = await getDocs(q)
		if (publicationSnapshot.empty) {
			throw errors.NOT_FOUND()
		}

		const publicationData = publicationSnapshot.docs.at(0)
			?.data()
		if (!publicationData) {
			throw errors.NOT_FOUND()
		}

		if (publicationData.status !== "published") {
			throw errors.NOT_FOUND()
		}

		const detail: Partial<ContentDetailPageDataOutputType["body"]["data"]["detail"]> = {
			id: publicationData.id!,
			title: publicationData.title,
			slug: publicationData.slug,
			image_url: publicationData.cover_image_url,
			// @ts-expect-error - just ignore
			published_at: dayjs(publicationData.published_at.seconds * 1000)
				.format("MMM D, YYYY HH:mm"),
			category: publicationData.category_id,
			content: publicationData.content,
			tags: publicationData.tags || [],
			type: publicationData.type,
			publication_file_url: publicationData.publication,
			author: null,
		}

		if (publicationData.author_id) {
			const authorDoc = await getDoc(
				getStaffDocRef(context.firestore, publicationData.author_id),
			)

			const authorData = authorDoc.data()
			if (authorData) {
				detail.author = {
					id: authorData.id!,
					name: authorData.fullname,
					image_url: authorData.profile_picture_url,
					slug: authorData.slug,
				}
			}
		}

		if (publicationData.category_id) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, publicationData.category_id),
			)

			if (categoryDoc.exists()) {
				const categoryData = categoryDoc.data()
				if (categoryData) {
					detail.category = categoryData.name
				}
			}
		}

		const relatedContentsQuery = query(
			getPublicationCollectionRef(context.firestore),
			where("category_id", "==", publicationData.category_id),
			where("status", "==", "published"),
			where("slug", "!=", publicationData.slug),
			limit(3),
		)

		const relatedContentsSnapshot = await getDocs(relatedContentsQuery)
		const relatedContents = relatedContentsSnapshot.docs.map((doc) => {
			const data = doc.data()
			return {
				id: doc.id,
				...data,
				image_url: data.cover_image_url,
				published_at: dayjs(data.published_at.seconds * 1000)
					.format("MMM D, YYYY HH:mm"),
				category: null,
				author: null,
			}
		})

		const relatedContentCategoryIds = Array
			.from(new Set(relatedContents
				.map(content => content.category_id)))
			.filter(Boolean)

		for (const categoryId of relatedContentCategoryIds) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, categoryId),
			)
			if (!categoryDoc.exists()) continue
			const categoryData = categoryDoc.data()
			relatedContents.forEach((content) => {
				if (content.category_id === categoryId) {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					content.category = categoryData.name as any
				}
			})
		}

		const relatedContentAuthorIds = Array
			.from(new Set(relatedContents
				.map(content => content.author_id)))
			.filter(Boolean)

		for (const authorId of relatedContentAuthorIds) {
			if (!authorId) continue

			const authorDoc = await getDoc(
				getStaffDocRef(context.firestore, authorId),
			)
			if (!authorDoc.exists()) continue
			const authorData = authorDoc.data()

			relatedContents.forEach((content) => {
				if (content.author_id === authorId) {
					content.author = {
						id: authorData.id!,
						name: authorData.fullname,
						image_url: authorData.profile_picture_url,
						slug: authorData.slug,
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					} as any
				}
			})
		}

		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					detail: detail as ContentDetailPageDataOutputType["body"]["data"]["detail"],
					related_contents: relatedContents,
				},
			},
		}
	})

const listCategoryPageData = base
	.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.PAGE_DATA_CATEGORIES,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.input(CategoriesSchemaPageDataInputSchema)
	.output(CategoriesSchemaPageDataOutputSchema)
	.handler(async function ({ context }) {
		const q = query(
			getCategoryCollectionRef(context.firestore),
			limit(30),
			orderBy("name", "asc"),
		)

		const categorySnapshot = await getDocs(q)
		if (categorySnapshot.empty) {
			return {
				body: {
					message: "ok",
					status: 200,
					data: {
						categories: [],
						total: 0,
					},
				},
			}
		}

		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					categories: categorySnapshot.docs.map(doc => ({
						id: doc.id,
						...doc.data(),
					})),
					total: categorySnapshot.size,
				},
			},
		}
	})

export const contentListPageData = base.$context<Middleware>()
	.route({
		method: "GET",
		path: API_PATH_PREFIXES.PAGE_DATA_CONTENT_LIST,
		inputStructure: "detailed",
		outputStructure: "detailed",
	})
	.input(BlogAndPublicationsPageDataInputSchema)
	.output(BlogAndPublicationsPageDataOutputSchema)
	// @ts-expect-error - just ignore
	.handler(async function ({ context, input }) {
		const facetFilters = [
			"status:published",
			`type:${input.query.type}`,
			input.query.category ? `category_id:${input.query.category}` : "",
		]
			.filter(Boolean)

		const numericFilters: string[] = []
		if (input.query.year) {
			const startOfYear = dayjs(`${input.query.year}-01-01`)
				.startOf("year")
				.unix()
			const endOfYear = dayjs(`${input.query.year}-12-31`)
				.endOf("year")
				.unix()
			numericFilters.push(`published_at._seconds >= ${startOfYear}`, `published_at._seconds <= ${endOfYear}`)
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const contentSnapshot = await context.algoliaClient.searchSingleIndex<Record<string, any>>({
			indexName: "contents",
			searchParams: {
				query: input.query.search,
				facetFilters,
				hitsPerPage: 10,
				page: input.query.page - 1,
				numericFilters,
				// ranking: ["desc(published_at._seconds)"],
			},
		})

		if (contentSnapshot.hits.length === 0) {
			return {
				body: {
					message: "ok",
					status: 200,
					data: {
						contents: [],
						page: 1,
						total: 0,
					},
				},
			}
		}

		const mappedContents = contentSnapshot.hits.map(hit => ({
			id: hit.objectID,
			type: hit.type,
			slug: hit.slug,
			image_url: hit.cover_image_url,
			title: hit.title,
			category: hit.category_id,
			published_at: dayjs(hit.published_at._seconds * 1000)
				.format("MMM D, YYYY HH:mm"),
			author: hit.author_id || null,
		}))

		const mappedContentCategoryIds = Array
			.from(new Set(mappedContents.map(content => content.category)))
			.filter(Boolean)

		for (const categoryId of mappedContentCategoryIds) {
			const categoryDoc = await getDoc(
				getCategoryDocRef(context.firestore, categoryId),
			)
			if (!categoryDoc.exists()) continue
			const categoryData = categoryDoc.data()
			if (!categoryData) continue

			mappedContents.forEach((content) => {
				if (content.category === categoryId) {
					content.category = categoryData.name
				}
			})
		}

		const mappedContentAuthorIds = Array
			.from(new Set(mappedContents.map(content => content.author)))
			.filter(Boolean)

		for (const authorId of mappedContentAuthorIds) {
			const authorDoc = await getDoc(
				getStaffDocRef(context.firestore, authorId),
			)

			if (!authorDoc.exists()) {
				mappedContents.forEach((content, idx) => {
					if (content.author === authorId) {
						mappedContents[idx]!.author = null
					}
				})
				continue
			}

			const authorData = authorDoc.data()

			mappedContents.forEach((content, idx) => {
				if (content.author === authorId) {
					mappedContents[idx]!.author = {
						id: authorData.id!,
						name: authorData.fullname,
						photo_url: authorData.profile_picture_url,
					}
				}
			})
		}

		return {
			body: {
				message: "ok",
				status: 200,
				data: {
					contents: mappedContents,
					page: input.query.page,
					total: contentSnapshot.nbHits,
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
	listCategoryPageData,
	contentListPageData,
}

export default router
export type ContractRouterClient = typeof router
