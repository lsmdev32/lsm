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

export function useCreateBlogs() {
	const form = useForm({
		validationSchema: validationSchemas.createBlogsForm,
		initialValues: {
			type: CONTENT_FORM_TYPE.blog,
			status: CONTENT_FORM_STATUS.not_published,
		},
	})

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

	const submit = form.handleSubmit(async (v) => {
		toast.info("Mengupload file...", { duration: 3000 })

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

		const colRef = getBlogCollectionRef(firestore)

		const [coverImageURL] = res
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

		toast.info("Harap tunggu blogs sedang dibuat...", { duration: 3000 })
		try {
			await addDoc(colRef, {
				type: v.type,
				cover_image_url: coverImageURL,
				title: v.title,
				content: v.content,
				category_id: v.category,
				slug: v.slug,
				status: v.status,
				author_id: v.author,
				published_at: v.status === CONTENT_FORM_STATUS.publish ? new Date() : undefined,
			})
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		catch (e) {
			toast.error("Gagal membuat blog")
			return
		}

		const DELAY = 5000
		await new Promise(() => {
			setTimeout(() => {
				toast.success("Blog sukses dibuat")
				resetForm()
				Promise.resolve()
			}, DELAY)
		})

		router.replace("/dashboard/blogs")
	})

	return {
		submit,
		resetForm,
		resetFields,
	}
}
