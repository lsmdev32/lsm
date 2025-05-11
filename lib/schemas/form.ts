import { z } from "zod"
import {
	CREATE_STAFF_FORM_CONSTANTS,
	PROFILE_PICTURE,
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

export const CREATE_STAFF_FORM_SCHEMA_KEYS = {
	profile_picture: "profile_picture",
	type: "type",
	fullname: "fullname",
	short_bio: "short_bio",
	bio: "bio",
	email: "email",
	linkedin_url: "linkedin_url",
	slug: "slug",
	cv: "cv",
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
	[CREATE_STAFF_FORM_SCHEMA_KEYS.profile_picture]: z
		.instanceof(File, {
			message: CREATE_STAFF_FORM_CONSTANTS.MSG.CV_TYPE_MSG,
		})

		.refine(
			v => PROFILE_PICTURE.IMAGE_TYPES.includes(v.type),
			CREATE_STAFF_FORM_CONSTANTS.MSG.PP_IMAGE_TYPE_MSG,
		)

		.refine(
			v => v.size <= PROFILE_PICTURE.MAX_SIZE,
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
	[CREATE_STAFF_FORM_SCHEMA_KEYS.type]: z
		.enum(STAFF_TYPES_LIST)
		.default("associate"),
	[CREATE_STAFF_FORM_SCHEMA_KEYS.fullname]: z
		.string(),
	[CREATE_STAFF_FORM_SCHEMA_KEYS.short_bio]: z
		.string()
		.default(""),
	[CREATE_STAFF_FORM_SCHEMA_KEYS.bio]: z
		.string()

		.refine((v) => {
			const str = new DOMParser()
				.parseFromString(v, "text/html")
				.body
				.textContent
				?.trim() ?? ""

			return str.length >= CREATE_STAFF_FORM_CONSTANTS.BIO.MIN_LENGTH
		}, CREATE_STAFF_FORM_CONSTANTS.MSG.BIO_MIN_LENGTH_MSG),
	[CREATE_STAFF_FORM_SCHEMA_KEYS.email]: z
		.string()
		.email(),
	[CREATE_STAFF_FORM_SCHEMA_KEYS.linkedin_url]: z
		.string()
		.url(),
	[CREATE_STAFF_FORM_SCHEMA_KEYS.slug]: z
		.string()
		.regex(CREATE_STAFF_FORM_CONSTANTS.SLUG.REGEX)
		.default(""),
	[CREATE_STAFF_FORM_SCHEMA_KEYS.cv]: z
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

export type LoginFormPayload = z.infer<typeof LOGIN_FORM_SCHEMA>
export type CreateStaffFormPayload = z.infer<typeof CREATE_STAFF_FORM_SCHEMA>
