<script setup lang="ts" generic="T extends Record<string, unknown>">
import type {
	ColumnDef,
	ColumnFiltersState,
	ExpandedState,
	SortingState,
	VisibilityState,
} from "@tanstack/vue-table"
import {
	FlexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useVueTable,
} from "@tanstack/vue-table"
import { ChevronDown, ChevronUpSquare } from "lucide-vue-next"

import { ref } from "vue"
import { cn, valueUpdater } from "~/lib/utils"
import {
	TableCell,
} from "@/components/ui/table"

type Props = {
	data?: T[]
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	columns: ColumnDef<T, any>[]
	pagination?: {
		pageIndex: number
		pageSize: number
	}
}

const props = withDefaults(defineProps<Props>(), {
	data: () => [],
	pagination: () => ({
		pageIndex: 0,
		pageSize: 10,
	}),
})

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})

const table = useVueTable({
	data: props.data,
	columns: props.columns,
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getExpandedRowModel: getExpandedRowModel(),
	onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
	onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
	onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
	onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
	state: {
		get sorting() {
			return sorting.value
		},
		get columnFilters() {
			return columnFilters.value
		},
		get columnVisibility() {
			return columnVisibility.value
		},
		get rowSelection() {
			return rowSelection.value
		},
		get expanded() {
			return expanded.value
		},
	},
})
</script>

<template>
	<div class="w-full">
		<div class="flex gap-2 items-center py-4">
			<slot
				name="upper"
				:table="table"
			/>
			<UiDropdownMenu
				v-if="table.getAllColumns().some((column) => column.getCanHide())"
			>
				<UiDropdownMenuTrigger as-child>
					<UiButton
						variant="outline"
						class="ml-auto"
					>
						Tampilan Kolom <ChevronDown class="ml-2 h-4 w-4" />
					</UiButton>
				</UiDropdownMenuTrigger>
				<UiDropdownMenuContent align="end">
					<UiDropdownMenuCheckboxItem
						v-for="column in table.getAllColumns().filter((column) => column.getCanHide())"
						:key="column.id"
						class="capitalize"
						:model-value="column.getIsVisible()"
						@update:model-value="(value) => column.toggleVisibility(!!value)"
					>
						{{ column.id }}
					</UiDropdownMenuCheckboxItem>
				</UiDropdownMenuContent>
			</UiDropdownMenu>
		</div>
		<div class="rounded-md border">
			<UiTable>
				<UiTableHeader>
					<UiTableRow
						v-for="headerGroup in table.getHeaderGroups()"
						:key="headerGroup.id"
					>
						<UiTableHead
							v-for="header in headerGroup.headers"
							:key="header.id"
							:data-pinned="header.column.getIsPinned()"
							:class="cn(
								{ 'sticky bg-background/95': header.column.getIsPinned() },
								header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
								header.column.getCanSort() ? 'cursor-pointer select-none' : '',
							)"
							@click="header.column.getCanSort() && header.column.toggleSorting()"
						>
							<FlexRender
								v-if="!header.isPlaceholder"
								:render="header.column.columnDef.header"
								:props="header.getContext()"
							/>
							<!-- Sorting indicator -->
							<span
								v-if="header.column.getCanSort()"
								class="ml-1 inline-block align-middle"
							>
								<span v-if="header.column.getIsSorted() === 'asc'">
									<ChevronUpSquare />
								</span>
								<span v-else-if="header.column.getIsSorted() === 'desc'">
									<ChevronDown />
								</span>
								<span
									v-else
									class="opacity-30"
								>.</span>
							</span>
						</UiTableHead>
					</UiTableRow>
				</UiTableHeader>
				<UiTableBody>
					<template v-if="table.getRowModel().rows?.length">
						<template
							v-for="row in table.getRowModel().rows"
							:key="row.id"
						>
							<UiTableRow
								:data-state="row.getIsSelected() && 'selected'"
								:class="row.index % 2 === 0 ? 'bg-muted/50' : ''"
							>
								<UiTableCell
									v-for="cell in row.getVisibleCells()"
									:key="cell.id"
									:data-pinned="cell.column.getIsPinned()"
									:class="cn(
										{ 'sticky bg-background/95': cell.column.getIsPinned() },
										cell.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
									)"
								>
									<FlexRender
										:render="cell.column.columnDef.cell"
										:props="cell.getContext()"
									/>
								</UiTableCell>
							</UiTableRow>
							<UiTableRow v-if="row.getIsExpanded()">
								<TableCell :colspan="row.getAllCells().length">
									{{ JSON.stringify(row.original) }}
								</TableCell>
							</UiTableRow>
						</template>
					</template>

					<UiTableRow v-else>
						<UiTableCell
							:colspan="columns.length"
							class="h-24 text-center"
						>
							<slot
								v-if="$slots['empty-list']"
								name="empty-list"
								:table="table"
							/>
							<span v-else>No results.</span>
						</UiTableCell>
					</UiTableRow>
				</UiTableBody>
			</UiTable>
		</div>

		<div class="flex items-center justify-end space-x-2 py-4">
			<div class="flex-1 text-sm text-muted-foreground">
				{{ table.getFilteredSelectedRowModel().rows.length }} of
				{{ table.getFilteredRowModel().rows.length }} row(s) selected.
			</div>
			<div class="space-x-2">
				<UiButton
					variant="outline"
					size="sm"
					:disabled="!table.getCanPreviousPage()"
					@click="table.previousPage()"
				>
					Previous
				</UiButton>
				<UiButton
					variant="outline"
					size="sm"
					:disabled="!table.getCanNextPage()"
					@click="table.nextPage()"
				>
					Next
				</UiButton>
			</div>
		</div>
	</div>
</template>
