import { z } from "zod"

export const StaffTypeFilter = z.enum([
	"partners",
	"associates",
	"all",
])

export const HomepageDataOutputSchema = z.object({
	body: z.object({
		message: z.string(),
		status_code: z.number(),
		result: z.object({
			partners: z.object({
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
			}),
		}),
	}),
})

export const PracticeAreaPageDataOutputSchema = z.object({
	body: z.object({
		message: z.string(),
		status_code: z.number(),
		result: z.object({
			news_and_publications: z.object({
				data: z.array(z.object({
					title: z.string(),
					slug: z.string()
						.regex(/^[a-z0-9-]+$/),
					image_url: z.string()
						.url(),
					category: z.string(),
					author: z.object({
						name: z.string(),
						photo_url: z.string()
							.url(),
					}),
					published_at: z.string(),
				})),
				total: z.number(),
			}),
			our_attorneys: z.object({
				data: z.array(z.object({
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
			}),
		}),
	}),
})

export type StaffTypeFilterType = z.infer<typeof StaffTypeFilter>
export type HomepageDataOutputType = z.infer<typeof HomepageDataOutputSchema>
export type PracticeAreaPageDataOutputType = z.infer<typeof PracticeAreaPageDataOutputSchema>
