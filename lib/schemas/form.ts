import { z } from "zod"

export const loginSchema = z.object({
	username: z.string()
		.nonempty(),
	password: z.string()
		.nonempty(), // Will be "Some Value"
})

export type LoginFormPayload = z.infer<typeof loginSchema>
