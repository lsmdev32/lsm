<script setup lang="ts">
import { Pencil, UserIcon } from "lucide-vue-next"
import RichTextEditor from "~/components/rte/RichTextEditor.vue"
import { useCreateStaffForm } from "~/hooks/form/use-create-staff-form"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const router = useRouter()

const breadcrumbs = [
	{ text: "Staffs", href: "/dashboard/staffs" },
	{ text: "Create", href: "/dashboard/staffs/create" },
]

const form = useCreateStaffForm()

const imageURL = computed(() => {
	const value = form.form.values.profile_picture
	if (!value) return undefined
	if (!(value instanceof File)) return undefined

	return URL.createObjectURL(value)
})

function onChooseFile() {
	const target = document.querySelector("#pp")

	if (!target) return
	if (!(target instanceof HTMLInputElement)) return

	target.click()
}

function onCancel() {
	form.form.resetForm()
	router.replace({ path: "/dashboard/staffs" })
}
</script>

<template>
	<AdminPage
		page-title="Create Staff"
		:breadcrumbs="breadcrumbs"
	>
		<form
			class="w-full flex flex-col py-10"
			@submit="form.onSubmit"
		>
			<div class="flex gap-8">
				<div class="flex flex-col items-center space-y-4">
					<UiFormField
						v-slot="{ handleChange, meta }"
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
									:src="imageURL ?? ''"
									alt="@unovue"
									class="group-hover:hidden"
								/>
								<div
									:class="[
										'hidden flex-col items-center gap-y-4',
										imageURL ? 'group-hover:flex' : 'hidden']"
								>
									<Pencil
										:size="50"
										color="gray"
									/>
									<span class="font-semibold">Change Picture</span>
								</div>
								<UiAvatarFallback class="">
									<UserIcon
										:size="100"
										color="gray"
										class="block group-hover:hidden"
									/>
									<div class="hidden group-hover:flex flex-col items-center gap-y-4">
										<Pencil
											:size="50"
											color="gray"
										/>
										<span class="font-semibold">Change Picture</span>
									</div>
								</UiAvatarFallback>
							</UiAvatar>
							<UiFormControl>
								<UiInput
									id="pp"
									type="file"
									accept=".jpg,.jpeg,.png"
									placeholder="shadcn"
									class="bg-transparent text-transparent outline hidden"

									@change="handleChange"
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
								<UiSelect v-bind="componentField">
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
							<UiFormItem class="w-full">
								<UiFormLabel :required="meta.required">
									Nama Lengkap
								</UiFormLabel>
								<UiFormControl>
									<UiInput
										type="text"
										placeholder="John Doe"
										v-bind="componentField"
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
										@handle-change="handleChange($event)"
									/>
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ handleChange, meta }"
							name="cv"
						>
							<UiFormItem class="">
								<UiFormLabel :required="meta.required">
									CV/Resume
								</UiFormLabel>
								<UiFormControl>
									<UiInput
										type="file"
										accept=".pdf"
										placeholder="shadcn"
										class="bg-transparent text-transparent outline w-[150px]"
										@change="handleChange"
									/>
								</UiFormControl>
								<UiFormMessage />
								<UiFormDescription v-if="form.form.values.cv">
									{{ form.form.values.cv.name }}
								</UiFormDescription>
								<UiFormDescription>
									Upload dalam format PDF
								</UiFormDescription>
							</UiFormItem>
						</UiFormField>
						<ui-button type="submit">
							Simpan
						</ui-button>
						<ui-button
							variant="outline"
							@click="onCancel"
						>
							Batal
						</ui-button>
					</div>
				</keep-alive>
			</div>
		</form>
	</AdminPage>
</template>
