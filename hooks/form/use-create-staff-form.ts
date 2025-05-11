import { toTypedSchema } from "@vee-validate/zod"
import { useDebounce } from "@vueuse/core"
import { useForm } from "vee-validate"
import {
	DEBOUNCE_DEFAULT_TIME,
	LOCAL_STORAGE_KEYS,
} from "~/lib/constants"
import {
	CREATE_STAFF_FORM_SCHEMA,
	CREATE_STAFF_FORM_SCHEMA_KEYS,
} from "~/lib/schemas/form"

const validationSchema = toTypedSchema(CREATE_STAFF_FORM_SCHEMA)

export function useCreateStaffForm() {
	const form = useForm({
		validationSchema,
		keepValuesOnUnmount: true,
	})

	const values = useDebounce(computed(() => form.values), DEBOUNCE_DEFAULT_TIME)

	onMounted(() => {
		const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.CREATE_STAFF_FORM)
		if (!saved) return

		const parsed = JSON.parse(saved)
		form.setValues(parsed)
	})

	watch(values, (v) => {
		const serialized = JSON.stringify(v)
		localStorage.setItem(LOCAL_STORAGE_KEYS.CREATE_STAFF_FORM, serialized)
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
		form.resetForm()
		localStorage.removeItem(LOCAL_STORAGE_KEYS.CREATE_STAFF_FORM)
	}

	const onSubmit = form.handleSubmit((_v) => {
		console.log(`submitted`)

		// TODO: handle submit

		resetForm()
	})

	return {
		form,
		resetForm,
		onSubmit,

	}
}
