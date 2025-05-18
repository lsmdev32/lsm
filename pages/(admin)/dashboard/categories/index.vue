<script setup lang="ts">
import { categoryColumns } from "~/components/admin/table/columns"
import type { Category } from "~/components/admin/table/columns"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const datas: Category[] = [
	{
		name: "Electronics",
		created_at: new Date("2024-01-10"),
	},
	{
		name: "Books",
		created_at: new Date("2024-02-15"),
	},
	{
		name: "Clothing",
		created_at: new Date("2024-03-05"),
	},
	{
		name: "Home & Kitchen",
		created_at: new Date("2024-01-22"),
	},
	{
		name: "Toys",
		created_at: new Date("2024-04-10"),
	},
	{
		name: "Sports",
		created_at: new Date("2024-02-28"),
	},
	{
		name: "Beauty",
		created_at: new Date("2024-03-18"),
	},
	{
		name: "Automotive",
		created_at: new Date("2024-01-30"),
	},
	{
		name: "Garden",
		created_at: new Date("2024-04-02"),
	},
	{
		name: "Music",
		created_at: new Date("2024-05-01"),
	},
	{
		name: "Jewelry",
		created_at: new Date("2024-05-10"),
	},
	{
		name: "Office Supplies",
		created_at: new Date("2024-03-25"),
	},
	{
		name: "Pet Supplies",
		created_at: new Date("2024-02-12"),
	},
	{
		name: "Health",
		created_at: new Date("2024-04-18"),
	},
	{
		name: "Shoes",
		created_at: new Date("2024-01-18"),
	},
	{
		name: "Baby",
		created_at: new Date("2024-03-12"),
	},
	{
		name: "Groceries",
		created_at: new Date("2024-05-05"),
	},
	{
		name: "Tools",
		created_at: new Date("2024-02-22"),
	},
	{
		name: "Games",
		created_at: new Date("2024-04-25"),
	},
	{
		name: "Furniture",
		created_at: new Date("2024-05-15"),
	},
]
</script>

<template>
	<AdminPage page-title="Categories">
		<div>
			<AdminTableDataTable
				:columns="categoryColumns"
				:data="datas"
				:pagination="{ pageSize: 10, pageIndex: 0 }"
			>
				<template #upper="{ table }">
					<UiInput
						class="max-w-sm"
						placeholder="Cari kategori"
						:model-value="table.getColumn('name')?.getFilterValue() as string"
						@update:model-value="table.getColumn('name')?.setFilterValue($event)"
					/>
				</template>
			</AdminTableDataTable>
		</div>
	</AdminPage>
</template>
