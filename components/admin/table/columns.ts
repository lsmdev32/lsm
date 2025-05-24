import { createColumnHelper } from "@tanstack/vue-table"
import type { ColumnDef } from "@tanstack/vue-table"
import { Pencil } from "lucide-vue-next"
import TableAction from "~/components/admin/table/TableAction.vue"
import { cn } from "~/lib/utils"

export type Category = {
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
		cell: ({ getValue }) => h(
			"span",
			{
				class: cn("text-sm"),
			},
			getValue()),
	}),

	categoryHelper.display({
		id: "action",
		enableHiding: false,
		header: () => h("span", { class: cn("text-center") }, "Action"),
		cell: ({ table }) => h(TableAction, {
			class: cn(""),
			title: "Action",
			disabled: table.options.meta?.isLoading,
			actions: [
				{
					label: "Ubah Kategori",
					icon: Pencil,
					iconClass: cn("hover:cursor-pointer"),
				},
			],
		}),
	}),
]
