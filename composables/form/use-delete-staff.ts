import { useConfirmDialog } from "@vueuse/core"
import { deleteDoc } from "firebase/firestore"
import { toast } from "vue-sonner"
import { getDocRef } from "~/lib/firestore-model"

type DeleteConfirmPayload = {
	id: string
	fullname: string
}

export function useDeleteStaff() {
	const firestore = useFirestore()
	const currentDialogData = ref<DeleteConfirmPayload>()
	const deleteDialog = useConfirmDialog<DeleteConfirmPayload, DeleteConfirmPayload>()

	async function onConfirmDialog(payload: DeleteConfirmPayload) {
		const docRef = getDocRef(firestore, "staff", payload.id)

		toast.info(`Menghapus profil ${payload.fullname}...`)
		await deleteDoc(docRef)
			.catch(() => {
				toast.error(`Profil ${payload.fullname} gagal dihapus`)
			})
			.then(() => {
				toast.success(`Profil ${payload.fullname} berhasil dihapus`)
			})
			.finally(() => {
				setTimeout(() => window.location.reload(), 3000)
			})
	}

	async function onOpenDialog(payload: DeleteConfirmPayload) {
		currentDialogData.value = payload
		await deleteDialog.reveal(payload)
	}

	deleteDialog.onConfirm(() => onConfirmDialog(currentDialogData.value!))
	deleteDialog.onCancel(() => {})

	return {
		currentDialogData,
		onOpenDialog,
		confirmDialog: deleteDialog.confirm,
		cancelDialog: deleteDialog.cancel,
		isDialogOpen: deleteDialog.isRevealed,
	}
}
