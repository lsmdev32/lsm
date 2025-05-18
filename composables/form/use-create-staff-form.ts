import { toTypedSchema } from "@vee-validate/zod"
import { useDebounce } from "@vueuse/core"
import { addDoc, getDocs, query, where } from "firebase/firestore"
import { useForm } from "vee-validate"
import { toast } from "vue-sonner"
import { useUploader } from "~/composables"
import {
	DEBOUNCE_DEFAULT_TIME,
	IMAGES_STORAGE_PATH,
	SESSION_STORAGE_KEYS,
} from "~/lib/constants"
import { getCollectionRef } from "~/lib/firestore-model"
import {
	CREATE_STAFF_FORM_SCHEMA,
	CREATE_STAFF_FORM_SCHEMA_KEYS,
} from "~/lib/schemas/form"

const validationSchema = toTypedSchema(CREATE_STAFF_FORM_SCHEMA)

export function useCreateStaffForm() {
	const form = useForm({
		validationSchema,
		validateOnMount: false,
	})

	const firestore = useFirestore()
	const router = useRouter()
	const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME)
	const ppUploader = useUploader(IMAGES_STORAGE_PATH.PROFILE_PICTURE)
	const cvUploader = useUploader(IMAGES_STORAGE_PATH.CV)

	onMounted(() => {
		const saved = localStorage.getItem(SESSION_STORAGE_KEYS.CREATE_STAFF_FORM)
		if (!saved) return

		const parsed = JSON.parse(saved)
		form.setValues(parsed)
	})

	watch(values, (v) => {
		localStorage.setItem(
			SESSION_STORAGE_KEYS.CREATE_STAFF_FORM,
			JSON.stringify(v),
		)
	}, {
		deep: true,
	})

	watch(() => values.value.fullname, (v) => {
		if (!v) {
			form.resetField(CREATE_STAFF_FORM_SCHEMA_KEYS.slug)
			return
		}

		const slug = v
			.toLowerCase()
			.replaceAll(/[^a-z0-9]+/g, "-")
			.replaceAll(/^-|-$/g, "")

		form.setFieldValue(CREATE_STAFF_FORM_SCHEMA_KEYS.slug, slug)
	})

	function resetForm() {
		localStorage.removeItem(SESSION_STORAGE_KEYS.CREATE_STAFF_FORM)
		form.resetForm()
		location.reload()
	}

	function resetFields() {
		form.handleReset()
		form.resetForm()
	}

	const onSubmit = form.handleSubmit(async (v) => {
		toast.info("Mengupload file...", { duration: 3000 })

		// TODO: handle submit
		const res = await Promise.all([
			ppUploader
				.upload(v.profile_picture),
			cvUploader
				.upload(v.cv),
		])

		const success = res.every(p => !!p)
		if (!success) {
			toast.error("Gagal mengupload file")
			return
		}

		const [
			profilePictureURL,
			cvURL,
		] = res

		const collectionRef = getCollectionRef(firestore, "staff")

		const duplicateSlugQuery = query(collectionRef, where("slug", "==", v.slug))
		const docs = await getDocs(duplicateSlugQuery)

		if (docs.size > 0) {
			toast.error("Harap gunakan nama lain, nama ini sudah digunakan")
			return
		}

		toast.info("Harap tunggu profil sedang dibuat...", { duration: 3000 })
		try {
			await addDoc(collectionRef, {
				type: v.type,
				fullname: v.fullname,
				slug: v.slug,
				email: v.email,
				linkedin_url: v.linkedin_url,
				short_bio: v.short_bio,
				bio: v.bio,
				cv_url: cvURL,
				profile_picture_url: profilePictureURL,
			})
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		catch (e) {
			toast.error("Gagal membuat profil")
			return
		}

		const DELAY = 5000
		await new Promise(() => {
			setTimeout(() => {
				toast.success("Profil sukses dibuat")
				resetForm()
				Promise.resolve()
			}, DELAY)
		})

		router.replace("/dashboard/profiles")
	})

	return {
		form,
		resetForm,
		resetFields,
		onSubmit,
	}
}
