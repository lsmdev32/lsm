<script setup lang="ts">
import { PlusIcon, RotateCwIcon } from "lucide-vue-next";

import { categoryColumns } from "~/components/admin/table/columns";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const isCreateModalOpen = ref(false);
const newCategoryName = ref("");

const {
  results,
  searchString,
  totalPages,
  currentPage,
  setPage,
  isLoading,
  refresh,
} = useCategoryList();

const { onChange, submit, isSubmitting } = useCreateCategory();

const tableLoading = computed(() => isSubmitting.value || isLoading.value);

const hasActiveFilters = computed(() => searchString.value !== "");

function clearFilters() {
  searchString.value = "";
  setPage(0);
}

async function submitCreateCategory() {
  onChange(newCategoryName.value);

  if (!(await submit())) {
    return;
  }

  newCategoryName.value = "";
  isCreateModalOpen.value = false;
  refresh();
}
</script>

<template>
  <AdminPage
    page-title="Kategori"
    description="Kelompok konten yang dipakai blog dan publikasi."
  >
    <template #actions>
      <UiButton
        variant="outline"
        size="sm"
        :disabled="tableLoading"
        @click="refresh"
      >
        <RotateCwIcon />
        <span>Muat ulang</span>
      </UiButton>
      <UiDialog v-model:open="isCreateModalOpen">
        <UiDialogTrigger as-child>
          <UiButton variant="brand" size="sm">
            <PlusIcon />
            <span>Kategori baru</span>
          </UiButton>
        </UiDialogTrigger>
        <UiDialogContent>
          <UiDialogHeader>
            <UiDialogTitle class="font-[Marcellus] text-xl">
              Kategori baru
            </UiDialogTitle>
            <UiDialogDescription>
              Nama kategori harus unik, 4–50 karakter.
            </UiDialogDescription>
          </UiDialogHeader>

          <form
            class="flex flex-col gap-4"
            @submit.prevent="submitCreateCategory"
          >
            <div class="flex flex-col gap-2">
              <label class="text-sm font-medium" for="new-category-name">
                Nama kategori
              </label>
              <UiInput
                id="new-category-name"
                v-model="newCategoryName"
                type="text"
                autofocus
                placeholder="Misalnya: Hukum Ketenagakerjaan"
                :disabled="isSubmitting"
              />
            </div>

            <UiDialogFooter>
              <UiButton
                type="button"
                variant="outline"
                :disabled="isSubmitting"
                @click="isCreateModalOpen = false"
              >
                Batal
              </UiButton>
              <UiButton type="submit" :disabled="isSubmitting">
                <RotateCwIcon v-if="isSubmitting" class="animate-spin" />
                {{ isSubmitting ? "Menyimpan…" : "Simpan" }}
              </UiButton>
            </UiDialogFooter>
          </form>
        </UiDialogContent>
      </UiDialog>
    </template>

    <AdminTableDataTable
      v-if="results"
      :columns="categoryColumns as []"
      :data="results"
      :current-page="currentPage"
      :total-pages="totalPages"
      :page-size="10"
      :loading="tableLoading"
      :selectable="false"
      @update:page="setPage($event)"
    >
      <template #upper>
        <div class="flex w-full flex-wrap items-center gap-2">
          <div class="max-w-sm min-w-60 flex-1">
            <AdminSearchField
              v-model="searchString"
              placeholder="Cari kategori…"
              :disabled="isSubmitting"
            />
          </div>
          <AdminClearFilterButton
            :disabled="!hasActiveFilters || isSubmitting"
            @clear="clearFilters"
          />
        </div>
      </template>

      <template #empty-list>
        <AdminEmptyListPlaceholder
          :item-name="hasActiveFilters ? 'hasil' : 'kategori'"
          :description="
            hasActiveFilters
              ? 'Coba kata kunci lain.'
              : 'Tambahkan kategori untuk mengelompokkan konten.'
          "
        />
      </template>
    </AdminTableDataTable>
  </AdminPage>
</template>
