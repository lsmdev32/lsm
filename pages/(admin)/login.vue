<script setup lang="ts">
import { z } from "zod"
import { AutoForm } from "~/components/ui/auto-form"
import { Button } from "~/components/ui/button"

const formSchema = z.object({
	username: z.string()
		.describe("Your username"),
	password: z.string(), // Will be "Some Value"
})
</script>

<template lang="html">
	<div class="w-full min-h-screen flex flex-col items-center justify-center">
		<div class="flex flex-col items-center space-y-6 outline outline-1 outline-black p-4 rounded-lg shadow-xl">
			<NuxtImg src="/lsm.svg" />
			<AutoForm
				:schema="formSchema"
				:field-config="{
					username: {
						label: 'Username',
					},
					password: {
						label: 'Password',
						inputProps: {
							type: 'password',
						},
					},
				}"
				class="space-y-4 w-96"
				@submit="(data) => {}"
			>
				<Button
					type="submit"
					class="w-full shadow-lg"
				>
					Login
				</Button>
			</AutoForm>
		</div>
	</div>
</template>
