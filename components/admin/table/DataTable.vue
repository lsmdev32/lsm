<script
  setup
  lang="ts"
  generic="T extends Record<string, unknown>, TData extends any = any"
>
import type {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  SortingState,
  VisibilityState,
  PaginationState,
} from "@tanstack/vue-table";
import {
  FlexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable,
} from "@tanstack/vue-table";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  ChevronDown,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-vue-next";
import { ref } from "vue";

import { TableCell } from "@/components/ui/table";
import { cn, valueUpdater } from "~/lib/utils";

interface Emits {
  (ev: "update:page" | "update:pageSize", value: number): void;
}

defineEmits<Emits>();

interface Props {
  data: T[];
  columns: ColumnDef<T, TData>[];
  isLoading?: boolean;
  selectable?: boolean;
  totalPages?: number;
  currentPage?: number;
  pageSize?: number;
  meta?: Record<string, unknown>;
  noToggleColumnVisibility?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  selectable: false,
  totalPages: 0,
  currentPage: 1,
  pageSize: 10,
  noToggleColumnVisibility: false,
});

const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);
const columnVisibility = ref<VisibilityState>({});
const rowSelection = ref({});
const expanded = ref<ExpandedState>({});

const pagination = computed<PaginationState>(() => ({
  pageIndex: props.currentPage,
  pageSize: props.pageSize,
}));

const canGoBack = computed(() => props.totalPages > 0 && props.currentPage > 0);

const canGoForward = computed(
  () => props.totalPages > 0 && props.currentPage < props.totalPages - 1
);

const table = useVueTable({
  get data() {
    return props.data;
  },
  columns: props.columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getExpandedRowModel: getExpandedRowModel(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: props.selectable
    ? (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection)
    : undefined,
  onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expanded),
  state: {
    get sorting() {
      return sorting.value;
    },
    get columnFilters() {
      return columnFilters.value;
    },
    get columnVisibility() {
      return columnVisibility.value;
    },
    get rowSelection() {
      return rowSelection.value;
    },
    get expanded() {
      return expanded.value;
    },
  },
  meta: {
    isLoading: props.isLoading,
    ...props.meta,
  },
});
</script>

<template>
  <div class="flex w-full flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2">
      <slot name="upper" :table="table" />
      <UiDropdownMenu
        v-if="
          table.getAllColumns().some((column) => column.getCanHide()) &&
          !props.noToggleColumnVisibility
        "
      >
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline" class="ml-auto">
            Kolom
            <ChevronDown class="ml-1 size-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end">
          <UiDropdownMenuCheckboxItem
            v-for="column in table
              .getAllColumns()
              .filter((column) => column.getCanHide())"
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

    <div class="overflow-x-auto rounded-lg border bg-card">
      <UiTable>
        <UiTableHeader>
          <UiTableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="hover:bg-transparent"
          >
            <UiTableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              :data-pinned="header.column.getIsPinned()"
              :aria-sort="
                header.column.getIsSorted() === 'asc'
                  ? 'ascending'
                  : header.column.getIsSorted() === 'desc'
                    ? 'descending'
                    : undefined
              "
              :class="
                cn(
                  'text-xs font-medium tracking-wide whitespace-nowrap text-muted-foreground uppercase',
                  { 'sticky bg-background/95': header.column.getIsPinned() },
                  header.column.getIsPinned() === 'left' ? 'left-0' : 'right-0',
                  header.column.getCanSort() ? 'cursor-pointer select-none' : ''
                )
              "
              @click="
                header.column.getCanSort() && header.column.toggleSorting()
              "
            >
              <span class="inline-flex items-center gap-1">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
                <template v-if="header.column.getCanSort()">
                  <ArrowUpIcon
                    v-if="header.column.getIsSorted() === 'asc'"
                    class="size-3.5 text-foreground"
                  />
                  <ArrowDownIcon
                    v-else-if="header.column.getIsSorted() === 'desc'"
                    class="size-3.5 text-foreground"
                  />
                  <ArrowUpDownIcon v-else class="size-3.5 opacity-40" />
                </template>
              </span>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>

        <UiTableBody>
          <template v-if="table.options.meta?.isLoading">
            <UiTableRow v-for="n in props.pageSize" :key="`skeleton-${n}`">
              <UiTableCell
                v-for="col in columns"
                :key="`skeleton-cell-${n}-${col.id}`"
              >
                <div class="h-4 w-full animate-pulse rounded bg-muted" />
              </UiTableCell>
            </UiTableRow>
          </template>

          <template v-else-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <UiTableRow
                :data-state="row.getIsSelected() && 'selected'"
                class="transition-colors hover:bg-muted/60"
              >
                <UiTableCell
                  v-for="cell in row.getVisibleCells()"
                  :key="cell.id"
                  :data-pinned="cell.column.getIsPinned()"
                  :class="
                    cn(
                      { 'sticky bg-card': cell.column.getIsPinned() },
                      cell.column.getIsPinned() === 'left'
                        ? 'left-0'
                        : 'right-0'
                    )
                  "
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

          <UiTableRow v-else class="hover:bg-transparent">
            <UiTableCell :colspan="columns.length" class="p-0">
              <slot
                v-if="$slots['empty-list']"
                name="empty-list"
                :table="table"
              />
              <p v-else class="py-12 text-center text-sm text-muted-foreground">
                Tidak ada data.
              </p>
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-3">
      <p v-if="props.selectable" class="text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} dari
        {{ table.getFilteredRowModel().rows.length }} dipilih
      </p>

      <div class="ml-auto flex items-center gap-2">
        <span class="text-xs text-muted-foreground">
          Halaman {{ props.currentPage + 1 }} dari
          {{ Math.max(props.totalPages, 1) }}
        </span>
        <UiButton
          variant="outline"
          size="icon"
          aria-label="Halaman sebelumnya"
          :disabled="!canGoBack"
          @click="$emit('update:page', pagination.pageIndex - 1)"
        >
          <ChevronLeftIcon class="size-4" />
        </UiButton>
        <UiButton
          variant="outline"
          size="icon"
          aria-label="Halaman berikutnya"
          :disabled="!canGoForward"
          @click="$emit('update:page', pagination.pageIndex + 1)"
        >
          <ChevronRightIcon class="size-4" />
        </UiButton>
      </div>
    </div>
  </div>
</template>
