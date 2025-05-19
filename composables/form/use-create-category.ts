import { addDoc } from "firebase/firestore"
import { toast } from "vue-sonner"
import { getCategoryCollectionRef } from "~/lib/firestore-model"

export function useCreateCategory() {
	const firestore = useFirestore()

	const isSubmitting = ref(false)
	const tempCategory = ref("")

	async function submit() {
		isSubmitting.value = true
		await addDoc(getCategoryCollectionRef(firestore), {
			name: tempCategory.value,
		})
			.then(() => {
				toast.success("Berhasil menambahkan kategori")
			})
			.catch(() => {
				toast.error("Gagal menambahkan kategori")
			})
			.finally(()	=> {
				isSubmitting.value = false
			})
	}

	function onChange(value: string) {
		tempCategory.value = value
	}

	return {
		submit,
		isSubmitting,
		onChange,
	}
}
