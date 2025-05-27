import { useDebounce } from "@vueuse/core"
import { updateDoc } from "firebase/firestore"
import { useForm } from "vee-validate"
import { toast } from "vue-sonner"
import {
	DEBOUNCE_DEFAULT_TIME,
	IMAGES_STORAGE_PATH,
	SESSION_STORAGE_KEYS,
} from "~/lib/constants"
import { getBlogDocRef } from "~/lib/firestore-model"
import {
	validationSchemas,
	CONTENT_FORM_TYPE,
	CONTENT_FORM_SCHEMA_KEYS,
	CONTENT_FORM_STATUS,
} from "~/lib/schemas/form"

export function useEditBlogForm(id: string) {
	const form = useForm({
		validationSchema: validationSchemas.editBlogsForm,
		initialValues: {
			type: CONTENT_FORM_TYPE.blog,
		},
	})
	const isSubmitting = form.isSubmitting

	const firestore = useFirestore()
	const router = useRouter()

	const blogDocRef = getBlogDocRef(firestore, id)
	const blog = useDocument(blogDocRef)

	const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME)
	const coverUploader = useUploader(IMAGES_STORAGE_PATH.BLOG_IMAGES)

	watch(blog.data, (v) => {
		if (!v) return

		form.setValues({
			title: v.title,
			content: v.content,
			slug: v.slug,
			category: v.category_id,
			author: v.author_id ?? undefined,
			status: v.status,
			image_url: v.cover_image_url ?? undefined,
			// @ts-expect-error - assuming v.published_at is a Firestore Timestamp
			published_at: v.published_at ? new Date(v.published_at.seconds * 1000) : undefined,
			tags: v.tags,
			type: "blog",
		})
	})

	watch(() => values.value.title, (v) => {
		if (!v) {
			form.resetField(CONTENT_FORM_SCHEMA_KEYS.slug)
			return
		}

		const slug = v
			.toLowerCase()
			.replaceAll(/[^a-z0-9]+/g, "-")
			.replaceAll(/^-|-$/g, "")

		form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.slug, slug)
	})

	function resetForm() {
		sessionStorage.removeItem(SESSION_STORAGE_KEYS.EDIT_BLOG_FORM)
		form.resetForm()
	}

	function resetFields() {
		form.handleReset()
		form.resetForm()
	}

	const onSubmit = form.handleSubmit(async (v) => {
		toast.info("Harap tunggu blogs sedang diperbarui...")
		try {
			await updateDoc(blogDocRef, {
				type: CONTENT_FORM_TYPE.blog,
				cover_image_url: v.image_url,
				title: v.title,
				content: v.content,
				category_id: v.category,
				author_id: v.author,
				slug: v.slug,
				status: v.status,
				published_at: v.status === CONTENT_FORM_STATUS.publish ? new Date() : null,
				tags: v.tags,
			})
		}

		catch (e) {
			console.log(e)

			toast.error("Gagal memperbarui blog")
			return
		}

		toast.success("Blog sukses diperbarui")
		resetForm()
		router.replace("/dashboard/blogs")
	})

	async function saveAsDraft() {
		form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.status, CONTENT_FORM_STATUS.not_published)
		await onSubmit()
	}

	async function saveAsPublished() {
		form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.status, CONTENT_FORM_STATUS.publish)
		if (!form.values.published_at) {
			form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.published_at, new Date())
		}
		console.log(`Saving as published`, form.values)

		await onSubmit()
	}

	async function uploadCoverImage(file: File) {
		const url = await coverUploader.upload(file)
		if (!url) {
			toast.error("Gagal mengupload gambar sampul")
			return
		}

		await updateDoc(blogDocRef, {
			cover_image_url: url,
		})
			.catch(() => {
				toast.error("Gagal memperbarui gambar sampul")
			})
	}

	return {
		saveAsDraft,
		saveAsPublished,
		uploadCoverImage,
		onSubmit,
		resetForm,
		resetFields,
		form,
		isSubmitting,
		values,

	}
}
