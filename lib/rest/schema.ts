import { z } from "zod"

export const StaffTypeFilter = z.enum([
	"partner",
	"associate",
	"all",
])

export const ContentTypeFilter = z.enum([
	"blog",
	"publication",
	"all",
])

export const HomepageDataOutputSchema = z.object({
	body: z.object({
		message: z.string(),
		status: z.number(),
		data: z.object({
			partners: z
				.object({
					data: z
						.array(z.object({
							id: z
								.string(),
							slug: z
								.string(),
							name: z
								.string(),
							image_url: z
								.string()
								.url(),
							linkedin_url: z
								.string()
								.url(),
							email: z
								.string()
								.email(),
							type: StaffTypeFilter.exclude(["all"]),
						})),
					total: z
						.number(),
				}),
		}),
	}),
})

export const PracticeAreaPageDataOutputSchema = z.object({
	body: z.object({
		message: z.string(),
		status: z.number(),
		data: z
			.object({
				news_and_publications: z
					.object({
						data: z
							.array(z
								.object({
									id: z
										.string()
										.nanoid(),
									title: z
										.string(),
									slug: z
										.string()
										.regex(/^[a-z0-9-]+$/),
									image_url: z
										.string()
										.url(),
									category: z
										.string(),
									author: z
										.object({
											name: z
												.string(),
											photo_url: z
												.string()
												.url(),
										}),
									published_at: z
										.string(),
								})),
						total: z
							.number(),
					}),
				our_attorneys: z
					.object({
						data: z
							.array(z
								.object({
									id: z
										.string()
										.nanoid(),
									name: z
										.string(),
									slug: z
										.string()
										.regex(/^[a-z0-9-]+$/),
									image_url: z
										.string()
										.url(),
									linkedin_url: z
										.string()
										.url(),
									email: z
										.string()
										.email(),
									type: StaffTypeFilter,
								})),
						total: z.number(),
					}),
			}),
	}),
})

export const OurAttorneysPageDataOutputSchema = z.object({
	body: z.object({
		message: z.string(),
		status: z.number(),
		data: z
			.object({
				partners: z
					.object({
						data: z
							.array(z
								.object({
									id: z
										.string(),
									name: z
										.string(),
									slug: z
										.string(),
									image_url: z
										.string()
										.url(),
									linkedin_url: z
										.string()
										.url(),
									email: z
										.string()
										.email(),
									type: StaffTypeFilter,
								})),
						total: z.number(),
					}),
				associates: z
					.object({
						data: z
							.array(z
								.object({
									id: z
										.string(),
									name: z
										.string(),
									slug: z
										.string(),
									image_url: z
										.string()
										.url(),
									linkedin_url: z
										.string()
										.url(),
									email: z
										.string()
										.email(),
									type: StaffTypeFilter,
								})),
						total: z.number(),
					}),
			}),
	}),
})

export const OurAttorneyDetailPageDataInputSchema = z.object({
	params: z.object({
		slug: z.string(),
	}),
})

export const OurAttorneyDetailPageDataOutputSchema = z.object({
	body: z
		.object({
			message: z.string(),
			status: z.number(),
			data: z
				.object({
					person: z
						.object({
							id: z
								.string(),
							name: z
								.string(),
							short_bio: z
								.string(),
							bio: z
								.string(),
							slug: z
								.string(),
							image_url: z
								.string()
								.url(),
							linkedin_url: z
								.string()
								.url(),
							email: z
								.string()
								.email(),
							type: StaffTypeFilter,
						}),
					publications: z
						.array(z
							.object({
								id: z
									.string(),
								title: z
									.string(),
								slug: z
									.string(),
								image_url: z
									.string()
									.url(),
								category: z
									.string(),
								published_at: z
									.string(),
							})),
					other_partners: z
						.array(z
							.object({
								id: z
									.string(),
								name: z
									.string(),
								slug: z
									.string(),
							})),
					other_associates: z
						.array(z
							.object({
								id: z
									.string(),
								name: z
									.string(),
								slug: z
									.string(),
							})),
				}),
		}),
})

export const BlogAndPublicationsPageDataInputSchema = z.object({
	query: z
		.object({
			type: ContentTypeFilter.default("all"),
			search: z
				.string()
				.optional(),
			category: z
				.string()
				.optional(),
		}),
})

export const BlogAndPublicationsPageDataOutputSchema = z.object({
	body: z.object({
		message: z.string(),
		status: z.number(),
		data: z
			.object({
				highlighted_content: z
					.array(z
						.object({
							id: z
								.string()
								.nanoid(),
							type: ContentTypeFilter,
							slug: z
								.string()
								.regex(/^[a-z0-9-]+$/),
							tags: z
								.array(z.string()),
							image_url: z
								.string()
								.url(),
							title: z
								.string(),
							category: z
								.string(),
							published_at: z
								.string(),
						})),
				contents: z
					.array(z
						.object({
							id: z
								.string()
								.nanoid(),
							type: ContentTypeFilter,
							slug: z
								.string()
								.regex(/^[a-z0-9-]+$/),
							image_url: z
								.string()
								.url(),
							title: z
								.string(),
							category: z
								.string(),
							published_at: z
								.string(),
						})),
			}),
	}),
})

export const ContentDetailPageDataInputSchema = z.object({
	params: z.object({
		slug: z.string(),
	}),
})

export const ContentDetailPageDataOutputSchema = z.object({
	body: z
		.object({
			message: z
				.string(),
			status: z
				.number(),
			data: z
				.object({
					detail: z
						.object({
							id: z
								.string(),
							type: ContentTypeFilter.exclude(["all"]),
							slug: z
								.string()
								.regex(/^[a-z0-9-]+$/),
							tags: z
								.array(z
									.string()),
							image_url: z
								.string()
								.url(),
							title: z
								.string(),
							content: z
								.string(),
							category: z
								.string(),
							published_at: z
								.string(),
							publication_author: z
								.object({
									id: z
										.string()
										.nanoid(),
									name: z
										.string(),
									photo_url: z
										.string()
										.url(),
									slug: z
										.string()
										.regex(/^[a-z0-9-]+$/),
								})
								.optional(),
							publication_file_url: z
								.string()
								.url()
								.optional(),
						})
						.optional(),
				}),
		}),
})

export type StaffTypeFilterType = z.infer<typeof StaffTypeFilter>
export type HomepageDataOutputType = z.infer<typeof HomepageDataOutputSchema>
export type PracticeAreaPageDataOutputType = z.infer<typeof PracticeAreaPageDataOutputSchema>
export type OurAttorneysPageDataOutputType = z.infer<typeof OurAttorneysPageDataOutputSchema>
export type OurAttorneyDetailPageDataOutputType = z.infer<typeof OurAttorneyDetailPageDataOutputSchema>
export type BlogAndPublicationsPageDataOutputType = z.infer<typeof BlogAndPublicationsPageDataOutputSchema>
export type ContentDetailPageDataOutputType = z.infer<typeof ContentDetailPageDataOutputSchema>
