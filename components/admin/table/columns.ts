import { createColumnHelper } from "@tanstack/vue-table"
import type { ColumnDef } from "@tanstack/vue-table"
import { ArrowDownIcon, ArrowUpIcon, DownloadIcon, PencilIcon, SaveIcon, Trash2Icon, TrashIcon } from "lucide-vue-next"
import { deleteDoc, updateDoc } from "firebase/firestore"
import { toast } from "vue-sonner"
import { AdminTableAction, NuxtImg, NuxtLink, UiBadge, UiButton, UiInput } from "#components"
import { cn } from "~/lib/utils"
import { getBlogDocRef, getCategoryDocRef } from "~/lib/firestore-model"

export type Category = {
	objectID: string
	name: string
	created_at: Date
}

export type Blog = {
	objectID: string
	title: string
	status: "published" | "not_published"
	cover_image_url: string
	tags: string[]
	created_at: { _seconds: number, _nanoseconds: number }
	published_at: { _seconds: number, _nanoseconds: number } | null
}

export type Publication = {
	objectID: string
	title: string
	status: "published" | "not_published"
	cover_image_url: string
	tags: string[]
	created_at: { _seconds: number, _nanoseconds: number }
	published_at: { _seconds: number, _nanoseconds: number } | null
	publication: string
}

const categoryHelper = createColumnHelper<Category>()
const blogHelper = createColumnHelper<Blog>()
const publicationHelper = createColumnHelper<Publication>()

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

			async function handleDeleteCategory() {
				const confirmed = window.confirm("Apakah Anda yakin ingin menghapus kategori ini?")
				if (!confirmed) return

				await deleteDoc(docRef)
					.then(() => {
						toast.success("Kategori berhasil dihapus")
					})
					.catch(() => {
						toast.error(`Gagal menghapus kategori`)
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
							title: "Simpan perubahan nama kategori",
							onClick: updateCategoryName,
						},
						h(SaveIcon)),
					h(
						UiButton,
						{
							variant: "ghost",
							title: "Hapus kategori ini",
							onClick: handleDeleteCategory,
						},
						h(Trash2Icon)),
				],
			)
		},
	}),
]

export const blogColumns: ColumnDef<Blog, never>[] = [
	blogHelper.accessor("cover_image_url", {
		id: "Gambar sampul",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Gambar Sampul",
		),
		cell: ({ getValue }) => h(
			NuxtImg,
			{
				src: getValue() as string,
				class: cn("w-[100px] aspect-video object-cover"),
			},
		),
	}),
	blogHelper.accessor("title", {
		id: "Judul",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Judul",
		),
		cell: ({ row }) => h(
			"span",
			{},
			row.original.title,
		),
	}),
	blogHelper.accessor("status", {
		id: "Status",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Status",
		),
		cell: ({ getValue }) => {
			const value = getValue() as "published" | "not_published"
			const isPublished = value === "published"
			return h(
				UiBadge,
				{
					class: cn("text-xs w-[100px] flex justify-center", isPublished ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"),

				},
				isPublished ? "Terbit" : "Tidak Terbit",
			)
		},
	}),
	blogHelper.accessor("created_at", {
		id: "Dibuat",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Dibuat pada",
		),
		cell: ({ getValue }) => {
			const dayjs = useDayjs()
			const value = getValue() as { _seconds: number, _nanoseconds: number }
			const ms = value._seconds * 1000

			return h(
				"span",
				{},
				dayjs(new Date(ms))
					.format("DD/MM/YYYY"),
			)
		},
	}),
	blogHelper.accessor("published_at", {
		id: "Terbit",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Diterbitkan pada",
		),
		cell: ({ getValue }) => {
			const dayjs = useDayjs()
			const value = getValue() as { _seconds: number, _nanoseconds: number } | null
			if (!value) return h("span", {}, "Belum diterbitkan")

			const ms = value._seconds * 1000

			return h(
				"span",
				{},
				dayjs(new Date(ms))
					.format("DD/MM/YYYY"),
			)
		},
	}),

	blogHelper.display({
		id: "actions",
		enableHiding: false,
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Aksi",
		),
		cell: ({ row }) => {
			const id = row.original.objectID
			const firestore = useFirestore()
			const docRef = getBlogDocRef(firestore, id)
			const currentStatus = row.original.status
			const isPublished = currentStatus === "published"

			async function handleDelete() {
				// Implement delete logic here
				const confirmed = window.confirm("Are you sure you want to delete this blog?")
				if (!confirmed) return

				await deleteDoc(docRef)
					.then(() => {
						toast.success("Blog berhasil dihapus")
					})
					.catch(() => {
						toast.error("Gagal menghapus blog")
					})
			}

			function handleUpdatePublish() {
				const newStatus = isPublished ? "not_published" : "published"

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const newValue: Record<string, any> = {
					status: newStatus,
				}

				updateDoc(docRef, newValue)
					.then(() => {
						toast.success(`Blog status updated to ${newStatus}`)
					})
					.catch(() => {
						toast.error(`Failed to update blog status`)
					})
					.finally(() => {
						window.location.reload()
					})
			}

			return h(AdminTableAction, {
				actions: [
					{
						label: "Edit",
						icon: PencilIcon,
						href: `/dashboard/blogs/${row.original.objectID}/edit`,
					},
					{
						label: isPublished ? "Unpublish" : "Publish",
						icon: isPublished ? ArrowDownIcon : ArrowUpIcon,
						onClick: handleUpdatePublish,
					},
					{
						label: "Delete",
						icon: TrashIcon,
						onClick: handleDelete,
					},
				],
			})
		},
	}),
]

export const publicationColumns: ColumnDef<Publication, never>[] = [
	publicationHelper.accessor("cover_image_url", {
		id: "Gambar sampul",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Gambar Sampul",
		),
		cell: ({ getValue }) => h(
			NuxtImg,
			{
				src: getValue() as string,
				class: cn("w-[100px] aspect-video object-cover"),
			},
		),
	}),
	publicationHelper.accessor("title", {
		id: "Judul",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Judul",
		),
		cell: ({ row }) => h(
			"span",
			{},
			row.original.title,
		),
	}),
	publicationHelper.accessor("status", {
		id: "Status",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Status",
		),
		cell: ({ getValue }) => {
			const value = getValue() as "published" | "not_published"
			const isPublished = value === "published"
			return h(
				UiBadge,
				{
					class: cn("text-xs w-[100px] flex justify-center", isPublished ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"),

				},
				isPublished ? "Terbit" : "Tidak Terbit",
			)
		},
	}),
	publicationHelper.accessor("created_at", {
		id: "Dibuat",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Dibuat pada",
		),
		cell: ({ getValue }) => {
			const dayjs = useDayjs()
			const value = getValue() as { _seconds: number, _nanoseconds: number }
			const ms = value._seconds * 1000
			console.log(`value`, value)

			return h(
				"span",
				{},
				dayjs(new Date(ms))
					.format("DD/MM/YYYY"),
			)
		},
	}),
	publicationHelper.accessor("published_at", {
		id: "Terbit",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Diterbitkan pada",
		),
		cell: ({ getValue }) => {
			const dayjs = useDayjs()
			const value = getValue() as { _seconds: number, _nanoseconds: number } | null
			if (!value) return h("span", {}, "Belum diterbitkan")

			const ms = value._seconds * 1000

			return h(
				"span",
				{},
				dayjs(new Date(ms))
					.format("DD/MM/YYYY"),
			)
		},
	}),

	publicationHelper.accessor("publication", {
		id: "publikasi",
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Link Publikasi",
		),
		cell: ({ getValue }) => {
			return h(
				NuxtLink,
				{
					href: getValue() as string,
					class: cn("text-blue-600 hover:underline flex w-[50px] justify-center"),
					target: "_blank",
				},
				h(DownloadIcon),
			)
		},
	}),

	publicationHelper.display({
		id: "actions",
		enableHiding: false,
		header: () => h(
			"span",
			{
				class: cn("text-center w-[20px]") },
			"Aksi",
		),
		cell: ({ row }) => {
			const id = row.original.objectID
			const firestore = useFirestore()
			const docRef = getBlogDocRef(firestore, id)
			const currentStatus = row.original.status
			const isPublished = currentStatus === "published"

			async function handleDelete() {
				// Implement delete logic here
				const confirmed = window.confirm("Are you sure you want to delete this blog?")
				if (!confirmed) return

				await deleteDoc(docRef)
					.then(() => {
						toast.success("Blog berhasil dihapus")
					})
					.catch(() => {
						toast.error("Gagal menghapus blog")
					})
			}

			function handleUpdatePublish() {
				const newStatus = isPublished ? "not_published" : "published"

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const newValue: Record<string, any> = {
					status: newStatus,
				}

				updateDoc(docRef, newValue)
					.then(() => {
						toast.success(`Blog status updated to ${newStatus}`)
					})
					.catch(() => {
						toast.error(`Failed to update blog status`)
					})
					.finally(() => {
						window.location.reload()
					})
			}

			return h(AdminTableAction, {
				actions: [
					{
						label: "Edit",
						icon: PencilIcon,
						href: `/dashboard/publications/${row.original.objectID}/edit`,
					},
					{
						label: isPublished ? "Unpublish" : "Publish",
						icon: isPublished ? ArrowDownIcon : ArrowUpIcon,
						onClick: handleUpdatePublish,
					},
					{
						label: "Delete",
						icon: TrashIcon,
						onClick: handleDelete,
					},
				],
			})
		},
	}),
]
