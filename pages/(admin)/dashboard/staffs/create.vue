<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod"
import { UserIcon } from "lucide-vue-next"
import { useForm } from "vee-validate"
import { CREATE_STAFF_FORM_SCHEMA } from "~/lib/schemas/form"

definePageMeta({
	layout: "auth",
})

const breadcrumbs = [
	{ text: "Staffs", href: "/dashboard/staffs" },
	{ text: "Create", href: "/dashboard/staffs/create" },
]

const form = useForm({
	validationSchema: toTypedSchema(CREATE_STAFF_FORM_SCHEMA),
	keepValuesOnUnmount: true,
})

const onSubmit = form.handleSubmit((_values) => {

})

const imageURL = computed(() => {
	const value = form.values.profile_picture as File | undefined
	if (!value) return undefined

	return URL.createObjectURL(value)
})

watch(() => form.values.fullname, (value) => {
	if (!value) {
		form.setFieldValue("slug", "")
		return
	}

	const slug = value
		.toLowerCase()
		.replaceAll(/[^a-z0-9]+/g, "-")
		.replaceAll(/^-|-$/g, "")

	form.setFieldValue("slug", slug)
})
</script>

<template>
	<AdminPage
		page-title="Create Staff"
		:breadcrumbs="breadcrumbs"
	>
		<form
			class="w-full flex flex-col py-10"
			@submit="onSubmit"
		>
			<div class="flex gap-8">
				<div class="flex flex-col items-center space-y-4">
					<UiAvatar
						class="size-[150px] cursor-pointer"
					>
						<UiAvatarImage
							:src="imageURL ?? ''"
							alt="@unovue"
						/>
						<UiAvatarFallback class="size[150px]">
							<UserIcon
								:size="100"
								color="gray"
							/>
						</UiAvatarFallback>
					</UiAvatar>
					<UiFormField
						v-slot="{ handleChange }"
						name="profile_picture"
					>
						<UiFormItem class="w-[150px]">
							<UiFormControl>
								<UiInput
									type="file"
									accept=".jpg,.jpeg,.png"
									placeholder="shadcn"
									class="bg-transparent text-transparent outline"
									@change="handleChange"
								/>
							</UiFormControl>
							<UiFormMessage />
						</UiFormItem>
					</UiFormField>
				</div>
				<keep-alive>
					<div class="flex flex-col w-full gap-y-4">
						<UiFormField
							v-slot="{ componentField }"
							name="type"
						>
							<UiFormItem class="w-fit">
								<UiFormLabel>Tipe Staff</UiFormLabel>
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
							v-slot="{ componentField }"
							name="fullname"
						>
							<UiFormItem class="w-full">
								<UiFormLabel>Fullname</UiFormLabel>
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
							v-slot="{ componentField }"
							name="slug"
						>
							<UiFormItem class="w-full">
								<UiFormLabel>Slug</UiFormLabel>
								<UiFormControl>
									<UiInput
										type="text"
										placeholder="John Doe"
										v-bind="componentField"
										disabled
									/>
								</UiFormControl>
								<UiFormMessage />
							</UiFormItem>
						</UiFormField>

						<UiFormField
							v-slot="{ componentField }"
							name="email"
						>
							<UiFormItem class="w-full">
								<UiFormLabel>Email</UiFormLabel>
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
							v-slot="{ componentField }"
							name="short_bio"
						>
							<UiFormItem class="w-full">
								<UiFormLabel>Short Biography</UiFormLabel>
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
					</div>
				</keep-alive>
			</div>
		</form>
	</AdminPage>
</template>
