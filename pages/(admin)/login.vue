<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
// import { signInWithEmailAndPassword } from "firebase/auth"
import { useForm } from "vee-validate"
import { toast } from "vue-sonner"
import { AutoForm } from "~/components/ui/auto-form"
import { Button } from "~/components/ui/button"
import { loginSchema, type LoginFormPayload } from "~/lib/schemas/form"

const form = useForm({
	validationSchema: toTypedSchema(loginSchema),
})

// const auth = useFirebaseAuth()

async function handleSubmit(_payload: LoginFormPayload) {
	// if (!auth || auth?.currentUser) return

	// const res = await signInWithEmailAndPassword(auth, _payload.username, _payload.password)

	toast.success("Login successful!", {
		dismissible: true,
	})
}
</script>

<template lang="html">
	<div class="w-full min-h-screen flex flex-col items-center justify-center">
		<div class="flex flex-col items-center space-y-6 outline outline-1 outline-black p-4 rounded-lg shadow-xl">
			<NuxtImg src="/lsm.svg" />
			<AutoForm
				:schema="loginSchema"
				:form="form"
				:field-config="{
					username: {
						label: 'Username',
						inputProps: {
							type: 'email',
						},
					},
					password: {
						label: 'Password',
						inputProps: {
							type: 'password',
						},
					},
				}"
				class="space-y-4 w-96"
				@submit="handleSubmit"
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
