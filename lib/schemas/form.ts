import { z } from "zod"

export const loginSchema = z.object({
	email: z.string()
		.nonempty(),
	password: z.string()
		.nonempty(), // Will be "Some Value"
})

export const CREATE_STAFF_FORM_SCHEMA = z.object({
	profile_picture: z.instanceof(File)
		.refine(file => [
			"image/jpeg",
			"image/png",
		]
			.includes(file.type),
		"File must be a JPEG or PNG")

		.refine(file => file.size <= 2 * 1024 * 1024,
			"File size must be less than 2MB",
		),
	type: z.enum([
		"associate",
		"partner",
	])
		.default("associate"),
	fullname: z.string(),
	short_bio: z.string()
		.default(""),
	bio: z.string()
		.min(100),

	email: z.string()
		.email(),
	linkedin_url: z.string()
		.url(),
	slug: z.string()
		.regex(/^[a-z0-9]*(?:-[a-z0-9]+)*$/)
		.default(""),
})

export type LoginFormPayload = z.infer<typeof loginSchema>
export type CreateStaffFormPayload = z.infer<typeof CREATE_STAFF_FORM_SCHEMA>
