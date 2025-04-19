import { z } from "zod"

export const StaffTypeFilter = z.enum([
	"partners",
	"associates",
	"all",
])

export type StaffTypeFilterType = z.infer<typeof StaffTypeFilter>

export const HomeStaffsInputSchema = z.object({
	query: z.object({
		limit: z
			.number()
			.optional()
			.default(10),
		staff_type: StaffTypeFilter
			.default("all"),
	}),

})

export const HomeStaffsOutputSchema = z.object({
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
				type: StaffTypeFilter,
			})),
			total: z.number(),
		})),
	}),
})
