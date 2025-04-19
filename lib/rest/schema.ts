import { z } from "zod"

export const HomeLawyersInputSchema = z.object({})
export const HomeLawyersOutputSchema = z.object({
	body: z.object({
		message: z.string(),
		status_code: z.number(),
		result: z.optional(z.object({
			data: z.array(z.object({
				id: z.string(),
				slug: z.string()
					.regex(/^[a-z0-9-]+$/),
				image_url: z.string()
					.url(),
				linkedin_url: z.string()
					.url(),
				email: z.string()
					.email(),
			})),
		})),
	}),
})
