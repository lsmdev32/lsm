import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"
import {
	CREATE_CONTENT_FORM_CONSTANTS,
	CREATE_CATEGORY_FORM_CONSTANTS,
	CREATE_STAFF_FORM_CONSTANTS,
} from "~/lib/constants"

export const LOGIN_FORM_SCHEMA_KEYS = {
	email: "email",
	password: "password",
} as const

export const LOGIN_FORM_SCHEMA = z.object({
	[LOGIN_FORM_SCHEMA_KEYS.email]: z.string()
		.nonempty(),
	[LOGIN_FORM_SCHEMA_KEYS.password]: z.string()
		.nonempty(),
})

export const STAFF_FORM_SCHEMA_KEYS = {
	profile_picture: "profile_picture",
	type: "type",
	fullname: "fullname",
	short_bio: "short_bio",
	bio: "bio",
	email: "email",
	linkedin_url: "linkedin_url",
	slug: "slug",
	cv: "cv",
	cv_url: "cv_url",
	pp_url: "pp_url",
} as const

export const STAFF_TYPES = {
	associate: "associate",
	partner: "partner",
	founder: "founder",
	of_counsel: "of_counsel",
} as const

export const STAFF_TYPES_LIST = [
	STAFF_TYPES.associate,
	STAFF_TYPES.partner,
	STAFF_TYPES.founder,
	STAFF_TYPES.of_counsel,
] as const

export const CREATE_STAFF_FORM_SCHEMA = z.object({
	[STAFF_FORM_SCHEMA_KEYS.profile_picture]: z
		.instanceof(File, {
			message: CREATE_STAFF_FORM_CONSTANTS.MSG.PP_IMAGE_TYPE_MSG,
		})

		.refine(
			v => CREATE_STAFF_FORM_CONSTANTS.PROFILE_PICTURE.IMAGE_TYPES.includes(v.type),
			CREATE_STAFF_FORM_CONSTANTS.MSG.PP_IMAGE_TYPE_MSG,
		)

		.refine(
			v => v.size <= CREATE_STAFF_FORM_CONSTANTS.PROFILE_PICTURE.MAX_SIZE,
			CREATE_STAFF_FORM_CONSTANTS.MSG.PP_IMAGE_SIZE_MSG,
		)

		.refine(
			async (v) => {
				const img = await new Promise<HTMLImageElement>((resolve, reject) => {
					const img = new Image()
					img.onload = () => resolve(img)
					img.onerror = reject
					img.src = URL.createObjectURL(v)
				})

				return img.width <= CREATE_STAFF_FORM_CONSTANTS.PROFILE_PICTURE.MAX_WIDTH
					&& img.height <= CREATE_STAFF_FORM_CONSTANTS.PROFILE_PICTURE.MAX_HEIGHT
			},
			CREATE_STAFF_FORM_CONSTANTS.MSG.PP_IMAGE_DIMENSION_MSG,
		),
	[STAFF_FORM_SCHEMA_KEYS.type]: z
		.enum(STAFF_TYPES_LIST)
		.default("associate"),
	[STAFF_FORM_SCHEMA_KEYS.fullname]: z
		.string(),
	[STAFF_FORM_SCHEMA_KEYS.short_bio]: z
		.string()
		.default(""),
	[STAFF_FORM_SCHEMA_KEYS.bio]: z
		.string()

		.refine((v) => {
			const str = new DOMParser()
				.parseFromString(v, "text/html")
				.body
				.textContent
				?.trim() ?? ""

			return str.length >= CREATE_STAFF_FORM_CONSTANTS.BIO.MIN_LENGTH
		}, CREATE_STAFF_FORM_CONSTANTS.MSG.BIO_MIN_LENGTH_MSG),
	[STAFF_FORM_SCHEMA_KEYS.email]: z
		.string()
		.email(),
	[STAFF_FORM_SCHEMA_KEYS.linkedin_url]: z
		.string()
		.url()
		.regex(
			CREATE_STAFF_FORM_CONSTANTS.LINKEDIN.REGEX,
			CREATE_STAFF_FORM_CONSTANTS.MSG.LINKEDIN_URL_MSG,
		),
	[STAFF_FORM_SCHEMA_KEYS.slug]: z
		.string()
		.regex(CREATE_STAFF_FORM_CONSTANTS.SLUG.REGEX)
		.default(""),
	[STAFF_FORM_SCHEMA_KEYS.cv]: z
		.instanceof(File, {
			message: CREATE_STAFF_FORM_CONSTANTS.MSG.CV_FILE_TYPE_MSG,
		})

		.refine(
			v => CREATE_STAFF_FORM_CONSTANTS.CV.FILE_TYPES
				.includes(v.type),
			CREATE_STAFF_FORM_CONSTANTS.MSG.CV_SIZE_MSG,
		)

		.refine(
			v => v.size <= CREATE_STAFF_FORM_CONSTANTS.CV.MAX_SIZE,
			CREATE_STAFF_FORM_CONSTANTS.MSG.CV_SIZE_MSG,
		),
})

export const EDIT_STAFF_FORM_SCHEMA = CREATE_STAFF_FORM_SCHEMA
	.omit({ cv: true, profile_picture: true })
	.extend({
		[STAFF_FORM_SCHEMA_KEYS.cv_url]: z
			.string()
			.url()
			.default(""),
		[STAFF_FORM_SCHEMA_KEYS.pp_url]: z
			.string()
			.url()
			.default(""),
	})

export const CREATE_CATEGORY_FORM_SCHEMA_KEYS = {
	name: "name",
} as const

const CREATE_CATEGORY_FORM_SCHEMA = z.object({
	[CREATE_CATEGORY_FORM_SCHEMA_KEYS.name]: z
		.string()
		.trim()
		.min(CREATE_CATEGORY_FORM_CONSTANTS.NAME.MIN_LENGTH,
			CREATE_CATEGORY_FORM_CONSTANTS.MSG.CATEGORY_NAME_MIN_LENGTH_MSG)
		.max(CREATE_CATEGORY_FORM_CONSTANTS.NAME.MAX_LENGTH,
			CREATE_CATEGORY_FORM_CONSTANTS.MSG.CATEGORY_NAME_MAX_LENGTH_MSG),
})

export const CONTENT_FORM_TYPE = {
	blog: "blog",
	publication: "publication",
} as const

export const CONTENT_FORM_SCHEMA_KEYS = {
	type: "type",
	title: "title",
	slug: "slug",
	category: "category",
	author: "author",
	content: "content",
	status: "status",
	cover_image: "cover_image",
	published_at: "published_at",
	tags: "tags",
} as const

export const CONTENT_FORM_STATUS = {
	not_published: "not_published",
	publish: "published",
} as const

export const MUTATE_BLOGS_FORM_SCHEMA = z.object({
	[CONTENT_FORM_SCHEMA_KEYS.type]: z
		.literal(CONTENT_FORM_TYPE.blog)
		.default(CONTENT_FORM_TYPE.blog),
	[CONTENT_FORM_SCHEMA_KEYS.title]: z
		.string()
		.trim()
		.min(
			CREATE_CONTENT_FORM_CONSTANTS.TITLE.MIN_LENGTH,
			CREATE_CONTENT_FORM_CONSTANTS.MSG.TITLE_MIN_LENGTH_MSG,
		)
		.max(
			CREATE_CONTENT_FORM_CONSTANTS.TITLE.MAX_LENGTH,
			CREATE_CONTENT_FORM_CONSTANTS.MSG.TITLE_MAX_LENGTH_MSG,
		),

	[CONTENT_FORM_SCHEMA_KEYS.slug]: z
		.string()
		.trim()
		.regex(
			CREATE_CONTENT_FORM_CONSTANTS.SLUG.REGEX,
			CREATE_CONTENT_FORM_CONSTANTS.MSG.SLUG_REGEX_MSG,
		),
	[CONTENT_FORM_SCHEMA_KEYS.category]: z
		.string()
		.trim()
		.nonempty(
			CREATE_CONTENT_FORM_CONSTANTS.MSG.CATEGORY_REQUIRED_MSG,
		),
	[CONTENT_FORM_SCHEMA_KEYS.author]: z
		.string()
		.trim()
		.optional()
		.nullable(),
	[CONTENT_FORM_SCHEMA_KEYS.content]: z
		.string()
		.trim()
		.refine(
			(v) => {
				const str = new DOMParser()
					.parseFromString(v, "text/html")
					.body
					.textContent
					?.trim() ?? ""

				return str.length >= CREATE_CONTENT_FORM_CONSTANTS.CONTENT.MIN_LENGTH
			},
			CREATE_CONTENT_FORM_CONSTANTS.MSG.CONTENT_MIN_LENGTH_MSG,
		),
	[CONTENT_FORM_SCHEMA_KEYS.cover_image]: z
		.instanceof(File, {
			message: CREATE_CONTENT_FORM_CONSTANTS.MSG.COVER_IMAGE_REQUIRED_MSG,
		})
		.refine(
			v => CREATE_CONTENT_FORM_CONSTANTS.COVER_IMAGE.IMAGE_TYPES
				.includes(v.type),
			CREATE_CONTENT_FORM_CONSTANTS.MSG.COVER_IMAGE_TYPE_MSG,
		)
		.refine(
			v => v.size <= CREATE_CONTENT_FORM_CONSTANTS.COVER_IMAGE.MAX_SIZE,
			CREATE_CONTENT_FORM_CONSTANTS.MSG.COVER_IMAGE_SIZE_MSG,
		)
		.refine(
			async (v) => {
				const img = await new Promise<HTMLImageElement>((resolve, reject) => {
					const img = new Image()
					img.onload = () => resolve(img)
					img.onerror = reject
					img.src = URL.createObjectURL(v)
				})
				return img.width <= CREATE_CONTENT_FORM_CONSTANTS.COVER_IMAGE.MAX_WIDTH
					&& img.height <= CREATE_CONTENT_FORM_CONSTANTS.COVER_IMAGE.MAX_HEIGHT
			},
			CREATE_CONTENT_FORM_CONSTANTS.MSG.COVER_IMAGE_DIMENSION_MSG,
		)
		.nullish()
		.default(null),
	[CONTENT_FORM_SCHEMA_KEYS.status]: z
		.enum([
			CONTENT_FORM_STATUS.not_published,
			CONTENT_FORM_STATUS.publish,
		])
		.default(CONTENT_FORM_STATUS.not_published),
	[CONTENT_FORM_SCHEMA_KEYS.published_at]: z
		.date({
			message: CREATE_CONTENT_FORM_CONSTANTS.MSG.PUBLISHED_AT_DATE_MSG,
		}),
	[CONTENT_FORM_SCHEMA_KEYS.tags]: z
		.array(z
			.string()
			.trim())
		.optional()
		.default([]),

})

export const EDIT_BLOGS_FORM_SCHEMA = MUTATE_BLOGS_FORM_SCHEMA
	.omit({
		cover_image: true,
	})
	.extend({
		image_url: z
			.string()
			.url()
			.nullish()
			.default(null),
	})

export const PUBLICATIONS_FORM_SCHEMA_KEYS = {
	...CONTENT_FORM_SCHEMA_KEYS,
	publication: "publication",
	image_url: "image_url",
	publication_url: "publication_url",
} as const

export const MUTATE_PUBLICATION_FORM_SCHEMA = MUTATE_BLOGS_FORM_SCHEMA
	.omit({
		type: true,
	})
	.extend({
		[PUBLICATIONS_FORM_SCHEMA_KEYS.type]: z
			.literal(CONTENT_FORM_TYPE.publication)
			.default(CONTENT_FORM_TYPE.publication),
		[PUBLICATIONS_FORM_SCHEMA_KEYS.publication]: z
			.instanceof(File, {
				message: CREATE_CONTENT_FORM_CONSTANTS.MSG.PUBLICATION_FILE_REQUIRED_MSG,
			})
			.refine(
				v => CREATE_CONTENT_FORM_CONSTANTS.PUBLICATION.FILE_TYPES
					.includes(v.type),
				CREATE_CONTENT_FORM_CONSTANTS.MSG.PUBLICATION_FILE_TYPE_MSG,
			)
			.refine(
				v => v.size <= CREATE_CONTENT_FORM_CONSTANTS.PUBLICATION.MAX_SIZE,
				CREATE_CONTENT_FORM_CONSTANTS.MSG.PUBLICATION_FILE_SIZE_MSG,
			),
	})

export const EDIT_PUBLICATION_FORM_SCHEMA = MUTATE_PUBLICATION_FORM_SCHEMA
	.omit({
		cover_image: true,
		publication: true,
	})
	.extend({
		[PUBLICATIONS_FORM_SCHEMA_KEYS.image_url]: z
			.string()
			.url()
			.nullish()
			.default(null),
		[PUBLICATIONS_FORM_SCHEMA_KEYS.publication_url]: z
			.string()
			.url()
			.nullish(),
	})

export const validationSchemas = {
	loginForm: toTypedSchema(LOGIN_FORM_SCHEMA),
	createStaffForm: toTypedSchema(CREATE_STAFF_FORM_SCHEMA),
	editStaffForm: toTypedSchema(EDIT_STAFF_FORM_SCHEMA),
	createCategoryForm: toTypedSchema(CREATE_CATEGORY_FORM_SCHEMA),
	createBlogsForm: toTypedSchema(MUTATE_BLOGS_FORM_SCHEMA),
	editBlogsForm: toTypedSchema(EDIT_BLOGS_FORM_SCHEMA),
	createPublicationForm: toTypedSchema(MUTATE_PUBLICATION_FORM_SCHEMA),
	editPublicationForm: toTypedSchema(EDIT_PUBLICATION_FORM_SCHEMA),
}

export type StaffType = typeof STAFF_TYPES
export type LoginFormPayload = z.infer<typeof LOGIN_FORM_SCHEMA>
export type CreateStaffFormPayload = z.infer<typeof CREATE_STAFF_FORM_SCHEMA>
export type EditStaffFormPayload = z.infer<typeof EDIT_STAFF_FORM_SCHEMA>
export type CreateCategoryFormPayload = z.infer<typeof CREATE_CATEGORY_FORM_SCHEMA>
export type CreateBlogsFormPayload = z.infer<typeof MUTATE_BLOGS_FORM_SCHEMA>
export type EditBlogsFormPayload = z.infer<typeof EDIT_BLOGS_FORM_SCHEMA>
export type CreatePublicationFormPayload = z.infer<typeof MUTATE_PUBLICATION_FORM_SCHEMA>
export type EditPublicationFormPayload = z.infer<typeof EDIT_PUBLICATION_FORM_SCHEMA>
