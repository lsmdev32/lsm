<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useForm } from "vee-validate"
import { toast } from "vue-sonner"
import { AutoForm } from "~/components/ui/auto-form"
import { Button } from "~/components/ui/button"
import { loginSchema, type LoginFormPayload } from "~/lib/schemas/form"

definePageMeta({
	middleware: "auth",
})

const auth = useFirebaseAuth()
const form = useForm({ validationSchema: toTypedSchema(loginSchema) })

async function handleSubmit(_payload: LoginFormPayload) {
	if (!auth || auth?.currentUser) return

	await signInWithEmailAndPassword(auth, _payload.email, _payload.password)
		.then(() => {
			toast.success("Login successful!", {
				dismissible: true,
			})
			navigateTo("/dashboard")
		})
		.catch((_) => {
			toast.error("Email or password invalid !", {
				dismissible: true,
				closeButton: true,
			})
		})
}
</script>

<template lang="html">
	<div class="w-full min-h-screen flex flex-col items-center justify-center">
		<div class="flex flex-col items-center space-y-6 outline outline-1 outline-black p-4 rounded-lg shadow-xl">
			<NuxtImg src="/lsm.svg" />
			<ClientOnly>
				<AutoForm
					:schema="loginSchema"
					:form="form"
					:field-config="{
						email: {
							label: 'Email',
							inputProps: {
								type: 'email',
								placeholder: 'myemail@example.com',
							},
						},
						password: {
							label: 'Password',
							inputProps: {
								type: 'password',
								placeholder: '**********',
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
			</ClientOnly>
		</div>
	</div>
</template>
