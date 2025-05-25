import { createColumnHelper } from "@tanstack/vue-table"
import type { ColumnDef } from "@tanstack/vue-table"
import { SaveIcon } from "lucide-vue-next"
import { updateDoc } from "firebase/firestore"
import { toast } from "vue-sonner"
import { UiButton, UiInput } from "#components"
import { cn } from "~/lib/utils"
import { getCategoryDocRef } from "~/lib/firestore-model"

export type Category = {
	objectID: string
	name: string
	created_at: Date
}

const categoryHelper = createColumnHelper<Category>()

export const categoryColumns: ColumnDef<Category, string>[] = [
	categoryHelper.display({
		id: "rowNumber",
		header: () => h("span", { class: cn("text-center w-[20px]") }, "#"),
		cell: ({ row }) => {
			const numbering = row.index + 1

			return h("span", { class: cn("text-center") }, `${numbering}.`)
		},
		enableHiding: false,
		filterFn: "includesString",
		sortingFn: "alphanumeric",
		enableSorting: true,
	}),
	categoryHelper.accessor("name", {
		header: "Category Name",
		enableHiding: false,
		cell: ({ row, getValue }) => {
			const id = row.original.objectID
			const inputRef = ref("")
			const firestore = useFirestore()
			const docRef = getCategoryDocRef(firestore, id)

			async function updateCategoryName() {
				const inputValue = inputRef.value.trim()
				console.log(inputValue)

				if (inputValue === getValue()) {
					toast.info("Tidak ada perubahan pada nama kategori")
					return
				}

				if (!inputValue) {
					toast.error("Nama kategori tidak boleh kosong")
					return
				}

				if (inputValue.length < 4) {
					toast.error("Nama kategori harus lebih dari 4 karakter")
					return
				}

				if (inputValue.length > 50) {
					toast.error("Nama kategori tidak boleh lebih dari 50 karakter")
					return
				}

				await updateDoc(docRef, {
					name: inputValue,
				})
					.then(() => {
						toast.success("Kategori berhasil diperbarui")
					})
					.catch((error) => {
						toast.error(`Gagal memperbarui kategori: ${error.message}`)
					})
			}

			function handleChange(value: string | number) {
				inputRef.value = value as string
			}

			return h(
				"div",
				{
					key: id,
					class: cn("text-sm flex gap-x-2"),
				},
				[
					h(
						UiInput,
						{
							"defaultValue": getValue(),
							"onUpdate:modelValue": handleChange,
							"class": cn("w-[200px]"),
						},
					),
					h(
						UiButton,
						{
							variant: "ghost",
							onClick: updateCategoryName,
						},
						h(SaveIcon)),
				],
			)
		},
	}),
]
