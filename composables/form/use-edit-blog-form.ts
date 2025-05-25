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

	const blog = useDocument(getBlogDocRef(firestore, id))

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
			published_at: v.published_at ?? undefined,
			tags: v.tags,
			type: "blog",
		})
	})

	onMounted(() => {
		const saved = sessionStorage.getItem(SESSION_STORAGE_KEYS.EDIT_BLOG_FORM)
		if (!saved) return

		const parsed = JSON.parse(saved)
		form.setValues(parsed)
	})

	watch(values, (v) => {
		sessionStorage.setItem(
			SESSION_STORAGE_KEYS.EDIT_BLOG_FORM,
			JSON.stringify(v),
		)
	}, {
		deep: true,
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
		sessionStorage.removeItem(SESSION_STORAGE_KEYS.CREATE_STAFF_FORM)
		form.resetForm()
	}

	function resetFields() {
		form.handleReset()
		form.resetForm()
	}

	const onSubmit = form.handleSubmit(async (v) => {
		toast.info("Harap tunggu blogs sedang dibuat...")
		try {
			await updateDoc(getBlogDocRef(firestore, id), {
				type: v.type,
				cover_image_url: v.image_url,
				title: v.title,
				content: v.content,
				category_id: v.category,
				author_id: v.author ?? null,
				slug: v.slug,
				status: v.status,
				published_at: v.status === CONTENT_FORM_STATUS.publish ? new Date() : null,
				tags: v.tags,
			})
		}

		catch (e) {
			console.log(e)

			toast.error("Gagal membuat blog")
			return
		}

		toast.success("Blog sukses dibuat")
		resetForm()
		router.replace("/dashboard/blogs")
	})

	async function saveAsDraft() {
		form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.status, CONTENT_FORM_STATUS.not_published)
		await onSubmit()
	}

	async function saveAsPublished() {
		form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.status, CONTENT_FORM_STATUS.publish)
		form.setFieldValue(CONTENT_FORM_SCHEMA_KEYS.published_at, new Date())
		await onSubmit()
	}

	async function uploadCoverImage(file: File) {
		const url = await coverUploader.upload(file)
		if (!url) {
			toast.error("Gagal mengupload gambar sampul")
			return
		}

		await updateDoc(getBlogDocRef(firestore, id), {
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
