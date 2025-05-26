<script setup lang="ts" generic="T extends Record<string, unknown>, TData extends any = any">
import type {
	ColumnDef,
	ColumnFiltersState,
	ExpandedState,
	SortingState,
	VisibilityState,

	PaginationState } from "@tanstack/vue-table"
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

type Emits = {
	(ev: "update:page" | "update:pageSize", value: number): void
}

defineEmits<Emits>()

type Props = {
	data: T[]
	columns: ColumnDef<T, TData>[]
	isLoading?: boolean
	selectable?: boolean
	totalPages?: number
	currentPage?: number
	pageSize?: number
	meta?: Record<string, unknown>
	noToggleColumnVisibility?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	isLoading: false,
	selectable: false,
	totalPages: 0,
	currentPage: 1,
	pageSize: 10,
	noToggleColumnVisibility: false,
})

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})
const expanded = ref<ExpandedState>({})
const pagination = computed<PaginationState>(() => ({
	pageIndex: props.currentPage,
	pageSize: props.pageSize,
}))

const table = useVueTable({
	get data() {
		return props.data
	},
	columns: props.columns,
	getCoreRowModel: getCoreRowModel(),
	getPaginationRowModel: getPaginationRowModel(),
	getSortedRowModel: getSortedRowModel(),
	getFilteredRowModel: getFilteredRowModel(),
	getExpandedRowModel: getExpandedRowModel(),
	onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
	onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
	onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
	onRowSelectionChange: props.selectable ? updaterOrValue => valueUpdater(updaterOrValue, rowSelection) : undefined,
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
	meta: {
		isLoading: props.isLoading,
		...props.meta,
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
				v-if="table.getAllColumns().some((column) => column.getCanHide()) && !props.noToggleColumnVisibility"
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
					<!-- Loading skeleton -->
					<template v-if="table.options.meta?.isLoading">
						<UiTableRow
							v-for="n in props.pageSize"
							:key="'skeleton-' + n"
						>
							<UiTableCell
								v-for="col in columns"
								:key="'skeleton-cell-' + n + '-' + col.id"
							>
								<div class="animate-pulse h-4 bg-muted rounded w-full" />
							</UiTableCell>
						</UiTableRow>
					</template>
					<!-- Table rows -->
					<template v-else-if="table.getRowModel().rows?.length">
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
					<!-- Empty state -->
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
							<span v-else>
								No results.
							</span>
						</UiTableCell>
					</UiTableRow>
				</UiTableBody>
			</UiTable>
		</div>

		<div class="flex items-center justify-end space-x-2 py-4">
			<div
				v-if="props.selectable"
				class="flex-1 text-sm text-muted-foreground"
			>
				{{ table.getFilteredSelectedRowModel().rows.length }} of
				{{ table.getFilteredRowModel().rows.length }} row(s) selected.
			</div>
			<div class="space-x-2 flex justify-end items-center">
				<span class="text-xs">Halaman <b>{{ pagination.pageIndex + 1 }}</b> dari <b>{{ props.totalPages }}</b></span>
				<UiButton
					variant="outline"
					size="sm"
					:disabled="!(props.totalPages > 0 && props.currentPage > 0)"
					@click="$emit('update:page', pagination.pageIndex - 1)"
				>
					Previous
				</UiButton>
				<UiButton
					variant="outline"
					size="sm"
					:disabled="!(props.totalPages> 0 && props.currentPage < (props.totalPages - 1))"
					@click="$emit('update:page', pagination.pageIndex + 1)"
				>
					Next
				</UiButton>
			</div>
		</div>
	</div>
</template>
