<script setup lang="ts">
import { Download, Pencil } from "lucide-vue-next"
import { toast } from "vue-sonner"
import RichTextEditor from "~/components/rte/RichTextEditor.vue"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const route = useRoute()
const id = ref<string>(route.params.id as string)

const form = useEditStaffForm(id)
const isFormSubmitting = form.form.isSubmitting

const tempImageRef = ref<File>()
const tempCVRef = ref<File>()

function onChooseFile() {
	const target = document.querySelector("#pp")

	if (!target) return
	if (!(target instanceof HTMLInputElement)) return

	target.click()
}

async function handlePPChange(event: Event) {
	const target = event.target as HTMLInputElement

	const file = target.files?.item(0)

	if (!file) return
	if (!(file instanceof File)) return

	form.updateProfilePicture(file)
		.catch(() => {
			toast.error("Gagal mengupload foto profil")
		})
	tempImageRef.value = file
}

async function handleCVChange(event: Event) {
	const target = event.target as HTMLInputElement

	const file = target.files?.item(0)

	if (!file) return
	if (!(file instanceof File)) return

	await form.updateCV(file)
		.catch(() => {
			toast.error("Gagal mengupload CV")
		})
	tempCVRef.value = file
}

const ppAlt = computed(() => {
	if (!tempImageRef.value) return

	return URL.createObjectURL(tempImageRef.value)
})
</script>

<template>
	<AdminPage
		page-title="Edit Profile"
		:transform-crumbs="{
			2: () => form.form.values.fullname,
		}"
	>
		<form
			class="w-full flex flex-col py-10"
			@submit="form.onSubmit"
		>
			<div class="flex gap-8">
				<div class="flex flex-col items-center space-y-4">
					<UiFormField
						v-slot="{ meta }"
						name="profile_picture"
					>
						<UiFormItem
							class="w-[200px]"
						>
							<UiFormLabel :required="meta.required">
								Foto Profil
							</UiFormLabel>
							<UiAvatar
								class="size-[200px] cursor-pointer hover:opacity-80 group"
								shape="square"
								@click="onChooseFile"
							>
								<UiAvatarImage
									:src="form.form.values.pp_url ?? ''"
									:alt="ppAlt"
									class="group-hover:opacity-30"
								/>
								<div
									:class="[
										'absolute hidden flex-col items-center gap-y-4',
										form.form.values.pp_url ? 'group-hover:flex bg-transparent' : 'hidden']"
								>
									<Pencil
										:size="50"
										color="gray"
									/>
									<span class="font-semibold">Change Picture</span>
								</div>
							</UiAvatar>
							<UiFormControl>
								<UiInput
									id="pp"
									type="file"
									accept=".jpg,.jpeg,.png"
									placeholder="shadcn"
									class="bg-transparent text-transparent outline hidden"
									:disabled="isFormSubmitting"
									@change="handlePPChange"
								/>
							</UiFormControl>
							<UiFormMessage />
						</UiFormItem>
					</UiFormField>
				</div>
				<keep-alive>
					<div class="flex flex-col w-1/2 gap-y-4">
						<UiFormField
							v-slot="{ componentField, meta }"
							name="type"
						>
							<UiFormItem
								class="w-fit"
								:required="meta.required"
							>
								<UiFormLabel :required="meta.required">
									Tipe Staff
								</UiFormLabel>
								<UiSelect
									v-bind="componentField"
									:disabled="isFormSubmitting"
								>
									<UiFormControl>
										<UiSelectTrigger>
											<UiSelectValue class="pr-4" />
										</UiSelectTrigger>
									</UiFormControl>
									<UiSelectContent>
										<UiSelectGroup>
											<UiSelectItem value="partner">
												Partner
											</UiSelectItem>
											<UiSelectItem value="associate">
												Associate
											</UiSelectItem>
										</UiSelectGroup>
									</UiSelectContent>
								</UiSelect>
								<UiFormDescription>
									Pilih tipe staff
								</UiFormDescription>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ componentField, meta }"
							name="fullname"
						>
							<UiFormItem
								class="w-full"
							>
								<UiFormLabel :required="meta.required">
									Nama Lengkap
								</UiFormLabel>
								<UiFormControl>
									<UiInput
										type="text"
										placeholder="John Doe"
										v-bind="componentField"
										:disabled="isFormSubmitting"
									/>
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ componentField, meta }"
							name="email"
						>
							<UiFormItem class="w-full">
								<UiFormLabel :required="meta.required">
									Email
								</UiFormLabel>
								<UiFormControl>
									<UiInput
										type="email"
										placeholder="john@doe.com"
										v-bind="componentField"
										:disabled="isFormSubmitting"
									/>
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ componentField, meta }"
							name="linkedin_url"
						>
							<UiFormItem class="w-full">
								<UiFormLabel :required="meta.required">
									Linkedin URL
								</UiFormLabel>
								<UiFormControl>
									<UiInput
										type="url"
										placeholder="https://www.linkedin.com/in/johndoe"
										v-bind="componentField"
										:disabled="isFormSubmitting"
									/>
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ componentField, meta }"
							name="short_bio"
						>
							<UiFormItem class="w-full">
								<UiFormLabel :required="meta.required">
									Short Biography
								</UiFormLabel>
								<UiFormControl>
									<UiInput
										type="text"
										placeholder="Saya adalah..."
										v-bind="componentField"
										:disabled="isFormSubmitting"
									/>
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ handleChange, value, meta }"
							name="bio"
						>
							<UiFormItem class="w-full mb-24">
								<UiFormLabel :required="meta.required">
									Biography
								</UiFormLabel>
								<UiFormControl>
									<RichTextEditor
										class="min-h-[200px] max-w-full"
										:initial-value="value"
										:disabled="isFormSubmitting"
										@handle-change="handleChange($event)"
									/>
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ meta }"
							name="cv"
						>
							<UiFormItem class="">
								<UiFormLabel :required="meta.required">
									CV/Resume
								</UiFormLabel>
								<div class="flex items-center gap-x-2 justify-between">
									<div>
										<UiFormControl>
											<UiInput
												type="file"
												accept=".pdf"
												placeholder="shadcn"
												class="bg-transparent text-transparent outline w-[150px]"
												:disabled="isFormSubmitting"
												@change="handleCVChange"
											/>
										</UiFormControl>
										<UiFormMessage />
									</div>
									<UiFormDescription
										v-if="form.form.values.cv_url"
									>
										<NuxtLink
											:to="form.form.values.cv_url"
											target="_blank"
											class="text-blue-500 hover:text-blue-600 flex items-center border border-blue-400 p-2 rounded-lg justify-center"
										>
											<Download />
											<span>
												Download URL
											</span>
										</NuxtLink>
									</UiFormDescription>
								</div>
							</UiFormItem>
						</UiFormField>
						<ui-button
							type="submit"
							class=""
							:disabled="isFormSubmitting"
						>
							Perbarui
						</ui-button>
						<div class="flex justify-between gap-x-2">
							<!--  -->
						</div>
					</div>
				</keep-alive>
			</div>
		</form>
	</AdminPage>
</template>
