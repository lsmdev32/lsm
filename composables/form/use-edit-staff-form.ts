import { toTypedSchema } from "@vee-validate/zod"
import { useDebounce } from "@vueuse/core"
import { getDocs, query, updateDoc, where } from "firebase/firestore"
import { useForm } from "vee-validate"
import { toast } from "vue-sonner"

import {
	DEBOUNCE_DEFAULT_TIME,
	IMAGES_STORAGE_PATH,
	SESSION_STORAGE_KEYS,
} from "~/lib/constants"
import { getCollectionRef, getDocRef } from "~/lib/firestore-model"
import {
	EDIT_STAFF_FORM_SCHEMA,
	STAFF_FORM_SCHEMA_KEYS,
} from "~/lib/schemas/form"

const validationSchema = toTypedSchema(EDIT_STAFF_FORM_SCHEMA)

export function useEditStaffForm(id: Ref<string>) {
	const router = useRouter()
	const firestore = useFirestore()

	const form = useForm({
		validationSchema,
		validateOnMount: false,
	})

	const docRef = getDocRef(firestore, "staff", id.value)
	const staff = useDocument(docRef)

	const ppUploader = useUploader(IMAGES_STORAGE_PATH.PROFILE_PICTURE)
	const cvUploader = useUploader(IMAGES_STORAGE_PATH.CV)

	watch(staff.data, (v) => {
		if (!v) return

		form.setValues(v)
	}, {
		deep: true,
	})

	const values = useDebounce(form.controlledValues, DEBOUNCE_DEFAULT_TIME)

	onMounted(() => {
		const saved = sessionStorage.getItem(SESSION_STORAGE_KEYS.EDIT_STAFF_FORM)
		if (!saved) return

		const parsed = JSON.parse(saved)
		form.setValues(parsed)
	})

	watch(values, (v) => {
		sessionStorage.setItem(
			SESSION_STORAGE_KEYS.EDIT_STAFF_FORM,
			JSON.stringify(v),
		)
	}, {
		deep: true,
	})

	watch(() => values.value.fullname, (v) => {
		if (!v) {
			form.resetField(STAFF_FORM_SCHEMA_KEYS.slug)
			return
		}

		const slug = v
			.toLowerCase()
			.replaceAll(/[^a-z0-9]+/g, "-")
			.replaceAll(/^-|-$/g, "")

		form.setFieldValue(STAFF_FORM_SCHEMA_KEYS.slug, slug)
	})

	function resetForm() {
		sessionStorage.removeItem(SESSION_STORAGE_KEYS.EDIT_STAFF_FORM)
		form.resetForm()
		location.reload()
	}

	function resetFields() {
		form.handleReset()
		form.resetForm()
	}

	const onSubmit = form.handleSubmit(async (v) => {
		const colRef = getCollectionRef(firestore, "staff")

		const duplicateSlugQuery = query(colRef,
			where("slug", "==", v.slug),
		)
		const docs = await getDocs(duplicateSlugQuery)
		if (docs.size > 0) {
			toast.error("Harap gunakan nama lain, nama ini sudah digunakan")
			return
		}

		toast.info("Harap tunggu profil sedang diperbarui...", { duration: 3000 })
		try {
			await updateDoc(docRef, {
				type: v.type,
				fullname: v.fullname,
				slug: v.slug,
				email: v.email,
				linkedin_url: v.linkedin_url,
				short_bio: v.short_bio,
				bio: v.bio,
			})
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		catch (e) {
			toast.error("Gagal memperbarui profil")
			return
		}

		const DELAY = 5000
		await new Promise(() => {
			setTimeout(() => {
				toast.success("Profil sukses diperbarui")
				resetForm()
				Promise.resolve()
			}, DELAY)
		})

		router.replace("/dashboard/profiles")
	})

	async function updateProfilePicture(file: File) {
		await ppUploader
			.upload(file)
			.then(() => {
				toast.success("Foto profil sukses diperbarui")
			})
			.catch(() => {
				toast.error("Gagal memperbarui foto profil")
			})
	}

	async function updateCV(file: File) {
		await cvUploader.upload(file)
			.then(() => {
				toast.success("CV sukses diperbarui")
			})
			.catch(() => {
				toast.error("Gagal memperbarui CV")
			})
	}

	return {
		form,
		resetForm,
		resetFields,
		onSubmit,
		updateProfilePicture,
		updateCV,
	}
}
