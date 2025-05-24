import { toTypedSchema } from "@vee-validate/zod"
import { z } from "zod"
import {
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
} as const

export const STAFF_TYPES_LIST = [
	STAFF_TYPES.associate,
	STAFF_TYPES.partner,
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
		.instanceof(File)

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

export const validationSchemas = {
	loginForm: toTypedSchema(LOGIN_FORM_SCHEMA),
	createStaffForm: toTypedSchema(CREATE_STAFF_FORM_SCHEMA),
	editStaffForm: toTypedSchema(EDIT_STAFF_FORM_SCHEMA),
	createCategoryForm: toTypedSchema(CREATE_CATEGORY_FORM_SCHEMA),
}

export type StaffType = typeof STAFF_TYPES
export type LoginFormPayload = z.infer<typeof LOGIN_FORM_SCHEMA>
export type CreateStaffFormPayload = z.infer<typeof CREATE_STAFF_FORM_SCHEMA>
export type EditStaffFormPayload = z.infer<typeof EDIT_STAFF_FORM_SCHEMA>
export type CreateCategoryFormPayload = z.infer<typeof CREATE_CATEGORY_FORM_SCHEMA>
