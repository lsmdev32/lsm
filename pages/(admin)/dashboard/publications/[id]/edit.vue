<script setup lang="ts">
import { useDebounce, useFileDialog } from "@vueuse/core"
import { getDoc } from "firebase/firestore"
import { DownloadIcon, PencilIcon, Trash2 } from "lucide-vue-next"
import { toast } from "vue-sonner"
import RichTextEditor from "~/components/rte/RichTextEditor.vue"
import { DEBOUNCE_DEFAULT_TIME, LOCAL_STORAGE_KEYS } from "~/lib/constants"
import { getCategoryDocRef, getStaffDocRef } from "~/lib/firestore-model"
import type { CategoryAppModel, StaffAppModel } from "~/lib/firestore-model"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const id = useRoute().params.id as string
const firestore = useFirestore()

const form = useEditPublicationForm(id)
const isFormSubmitting = form.isSubmitting
const status = ref("")

const imageURL = computed(() => {
	const value = form.form.values.image_url
	if (!value) return undefined

	return value
})

const imageDialog = useFileDialog()

onMounted(() => {
	const listener = imageDialog.onChange(async (files) => {
		if (!files) return

		const file = files.item(0)
		if (!file) return

		localStorage.setItem(LOCAL_STORAGE_KEYS.IMAGE_COVER, URL.createObjectURL(file))

		await form.uploadCoverImage(file)
	})

	return () => {
		listener.off()
	}
})

const category = ref("")
const debouncedCategory = useDebounce(category, DEBOUNCE_DEFAULT_TIME)

const author = ref("")
const debouncedAuthor = useDebounce(author, DEBOUNCE_DEFAULT_TIME)

watch(form.form.values, async (v) => {
	if (v.image_url) {
		localStorage.setItem(LOCAL_STORAGE_KEYS.IMAGE_COVER, v.image_url)
	}

	if (v.category) {
		const doc = await getDoc(getCategoryDocRef(firestore, v.category))
		category.value = doc.data()?.name || ""
	}

	if (v.author) {
		const doc = await getDoc(getStaffDocRef(firestore, v.author))
		author.value = doc.data()?.fullname || ""
	}

	if (v.status) {
		status.value = v.status
	}
}, { deep: true, immediate: true })

const { result: resultCategories } = useSearch<CategoryAppModel>("categories", debouncedCategory, ["name"])
const mappedCategories = computed(() => {
	if (!resultCategories.value) return []

	return resultCategories.value.hits.map(item => ({
		label: item.name,
		value: item.objectID,
	}))
})

const { result: resultAuthors } = useSearch<StaffAppModel>("staffs", debouncedAuthor, ["fullname"])
const mappedAuthors = computed(() => {
	if (!resultAuthors.value) return []

	return resultAuthors.value.hits.map(item => ({
		label: item.fullname,
		value: item.objectID,
	}))
})

function onChooseImageFile() {
	imageDialog.open({
		accept: "image/*",
		multiple: false,
	})
}

function handlePublicationChange(event: Event) {
	const target = event.target as HTMLInputElement
	const file = target.files?.item(0)

	if (!file) return
	if (!(file instanceof File)) return

	form.uploadPublication(file)
		.catch(() => {
			toast.error("Gagal mengupload file publikasi")
		})
}
</script>

<template>
	<AdminPage
		page-title="Ubah Publikasi"
		:transform-crumbs="{
			2: () => form.values.value.title,
		}"
	>
		<div class="flex text-base tracking-wider">
			<template v-if="status === 'published'">
				<UiBadge
					variant="default"
					class="p-2 bg-green-100 text-green-800"
				>
					Terbit
				</UiBadge>
			</template>
			<template v-else>
				<UiBadge
					variant="default"
					class="p-2 bg-red-100 text-red-800"
				>
					Belum Terbit
				</UiBadge>
			</template>
		</div>
		<form
			class="w-full flex flex-col gap-y-4 py-20"
			@submit="form.onSubmit"
		>
			<div class="self-center flex flex-col gap-y-2">
				<UiFormField
					v-slot="{ handleChange, meta }"
					name="cover_image"
					class="self-center"
				>
					<UiFormItem class="self-center">
						<UiFormLabel :required="meta.required">
							Gambar Sampul
						</UiFormLabel>
						<div class="group w-[600px] aspect-video rounded-lg border">
							<NuxtImg
								:src="imageURL"
								loading="lazy"
								class="w-full h-full bg-gray-300 group-hover:hidden object-fill object-center rounded-lg"
							/>
							<div
								class="w-full h-full hidden group-hover:flex flex-col items-center justify-center cursor-pointer bg-gray-300 bg-opacity-60 gap-y-2"
								@click="onChooseImageFile"
							>
								<PencilIcon class="w-8 h-8 text-gray-500" />
								<span class="text-lg text-gray-500">Ubah Gambar Sampul</span>
							</div>
						</div>
						<UiFormControl>
							<UiInput
								id="image_cover"
								type="file"
								accept=".jpg,.jpeg,.png"
								placeholder="shadcn"
								class="bg-transparent text-transparent outline hidden"
								:disabled="isFormSubmitting"
								@change="handleChange"
							/>
						</UiFormControl>
						<UiFormMessage />
					</UiFormItem>
				</UiFormField>
				<ui-button
					v-if="imageURL"
					variant="outline"
					class="mx-auto"
					@click.prevent="form.removeCoverImage"
				>
					<Trash2 /> Hapus Gambar
				</ui-button>
			</div>

			<UiFormField
				v-slot="{ componentField, meta }"
				name="title"
			>
				<UiFormItem
					class="w-full"
				>
					<UiFormLabel :required="meta.required">
						Judul
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
				v-slot="{ handleChange, value, meta }"
				name="content"
			>
				<UiFormItem class="w-full mb-4">
					<UiFormLabel :required="meta.required">
						Isi Blog
					</UiFormLabel>
					<UiFormControl>
						<RichTextEditor
							class="max-w-full"
							:initial-value="value"
							:disabled="isFormSubmitting"
							@handle-change="handleChange($event)"
						/>
					</UiFormControl>
					<UiFormMessage />
				</UiFormItem>
			</UiFormField>

			<div class="flex gap-x-8 justify-start">
				<UiFormField
					v-slot="{ handleChange, meta }"
					name="category"
				>
					<UiFormItem class="w-[400px]">
						<UiFormLabel :required="meta.required">
							Kategori
						</UiFormLabel>
						<UiFormControl>
							<AdminSearchableComboBox
								v-model:model-value="category"
								:items="mappedCategories"
								@select="handleChange($event)"
							/>
						</UiFormControl>
						<UiFormMessage />
					</UiFormItem>
				</UiFormField>

				<UiFormField
					v-slot="{ handleChange, meta }"
					name="author"
				>
					<UiFormItem class="w-[400px]">
						<UiFormLabel :required="meta.required">
							Penulis
						</UiFormLabel>
						<UiFormControl>
							<AdminSearchableComboBox
								v-model:model-value="author"
								:items="mappedAuthors"
								@select="handleChange($event)"
							/>
						</UiFormControl>
						<UiFormMessage />
					</UiFormItem>
				</UiFormField>
			</div>

			<UiFormField
				v-slot="{ meta }"
				name="publication"
			>
				<UiFormItem class="">
					<UiFormLabel :required="meta.required">
						Publikasi
					</UiFormLabel>
					<div class="flex items-center gap-x-2">
						<div>
							<UiFormControl>
								<UiInput
									type="file"
									accept=".pdf"
									placeholder="shadcn"
									class="bg-transparent text-transparent outline w-[150px]"
									:disabled="isFormSubmitting"
									@change="handlePublicationChange"
								/>
							</UiFormControl>
							<UiFormMessage />
						</div>
						<UiFormDescription
							v-if="form.form.values.publication_url"
						>
							<NuxtLink
								:to="form.form.values.publication_url"
								target="_blank"
								class="text-blue-500 hover:text-blue-600 flex items-center border border-blue-400 p-2 rounded-lg justify-center"
							>
								<DownloadIcon />
								<span>
									Download Publication URL
								</span>
							</NuxtLink>
						</UiFormDescription>
					</div>
				</UiFormItem>
			</UiFormField>

			<UiFormField
				v-slot="{ handleChange, meta, value }"
				name="published_at"
			>
				<UiFormItem class="w-[400px] flex flex-col">
					<UiFormLabel :required="meta.required">
						Dipublikasikan pada
					</UiFormLabel>
					<UiFormControl>
						<AdminDatePicker
							:model-value="value"
							@update:model-value="handleChange($event)"
						/>
					</UiFormControl>
					<UiFormMessage />
				</UiFormItem>
			</UiFormField>

			<div class="flex w-full items-center justify-center pt-10 gap-x-4">
				<ui-button
					class="capitalize flex-1 items-center"
					:disabled="isFormSubmitting"
					@click="form.saveAsPublished()"
				>
					Simpan dan publikasikan
				</ui-button>
				<ui-button
					class="capitalize flex-1 border-2"
					variant="secondary"
					:disabled="isFormSubmitting"
					@click="form.saveAsDraft()"
				>
					{{ form.form.values.published_at ? 'Simpan' : 'Simpan sebagai Draft' }}
				</ui-button>
			</div>
		</form>
	</AdminPage>
</template>
