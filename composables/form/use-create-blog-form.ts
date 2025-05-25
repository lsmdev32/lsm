import { useDebounce } from "@vueuse/core"
import { query, getDocs, addDoc, where, limit } from "firebase/firestore"
import { useForm } from "vee-validate"
import { toast } from "vue-sonner"
import {
	DEBOUNCE_DEFAULT_TIME,
	IMAGES_STORAGE_PATH,
	SESSION_STORAGE_KEYS,
} from "~/lib/constants"
import { getBlogCollectionRef } from "~/lib/firestore-model"
import {
	CONTENT_FORM_SCHEMA_KEYS,
	CONTENT_FORM_STATUS,
	CONTENT_FORM_TYPE,
	validationSchemas,
} from "~/lib/schemas/form"

export function useCreateBlogForm() {
	const form = useForm({
		validationSchema: validationSchemas.createBlogsForm,
		initialValues: {
			type: CONTENT_FORM_TYPE.blog,
			status: CONTENT_FORM_STATUS.not_published,
			tags: [],
		},
	})
	const isSubmitting = form.isSubmitting

	const firestore = useFirestore()
	const router = useRouter()
	const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME)
	const coverUploader = useUploader(IMAGES_STORAGE_PATH.BLOG_IMAGES)

	onMounted(() => {
		const saved = sessionStorage.getItem(SESSION_STORAGE_KEYS.CREATE_BLOG_FORM)
		if (!saved) return

		const parsed = JSON.parse(saved)
		form.setValues(parsed)
	})

	watch(values, (v) => {
		sessionStorage.setItem(
			SESSION_STORAGE_KEYS.CREATE_BLOG_FORM,
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
		toast.info("Mengupload file...", { duration: 3000 })

		const colRef = getBlogCollectionRef(firestore)
		const duplicateSlugQuery = query(
			colRef,
			where("slug", "==", v.slug),
			limit(1),
		)

		const docs = await getDocs(duplicateSlugQuery)
		if (!docs.empty) {
			toast.error("Harap gunakan judul lain, judul ini sudah digunakan")
			return
		}

		// TODO: handle submit
		const res = await Promise.all([
			coverUploader
				.upload(v.cover_image),

		])

		const success = res.every(p => !!p)
		if (!success) {
			toast.error("Gagal mengupload file")
			return
		}

		const [coverImageURL] = res

		toast.info("Harap tunggu blogs sedang dibuat...")
		try {
			await addDoc(colRef, {
				type: v.type,
				cover_image_url: coverImageURL,
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

	return {
		form,
		isSubmitting,
		values,
		onSubmit,
		resetForm,
		resetFields,
		saveAsDraft,
		saveAsPublished,
	}
}
