<script setup lang="ts">
import { PlusIcon, RefreshCwIcon } from "lucide-vue-next";

import { categoryColumns } from "~/components/admin/table/columns";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const isCreateModalOpen = ref(false);

const { results, searchString, totalPages, currentPage, setPage, isLoading } =
  useCategoryList();

const { onChange, submit, isSubmitting } = useCreateCategory();

const tableLoading = computed(() => isSubmitting.value || isLoading.value);

function refresh() {
  location.reload();
}

const hasActiveFilters = computed(() => searchString.value !== "");

function clearFilters() {
  searchString.value = "";
  setPage(0);
}

async function submitCreateCategory() {
  await submit();

  isCreateModalOpen.value = false;
  refresh();
}
</script>

<template>
  <AdminPage page-title="Kategori">
    <div>
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
        <template #upper="{}">
          <div class="flex w-full items-center gap-x-2">
            <UiInput
              v-model="searchString"
              class="max-w-xs"
              placeholder="Cari kategori"
              :disabled="isSubmitting"
            />
            <AdminClearFilterButton
              :disabled="!hasActiveFilters || isSubmitting"
              @clear="clearFilters"
            />
            <UiButton
              class=""
              color="primary"
              :disabled="isSubmitting"
              @click="refresh"
            >
              <RefreshCwIcon :size="24" />
              <span>Refresh</span>
            </UiButton>

            <UiButton class="ml-auto" color="primary">
              <UiDialog>
                <UiDialogTrigger class="flex items-center gap-x-2">
                  <PlusIcon :size="24" />
                  <span>Tambah Kategori</span>
                </UiDialogTrigger>
                <UiDialogContent>
                  <UiDialogHeader>
                    <UiDialogTitle>Tambah Kategori</UiDialogTitle>
                  </UiDialogHeader>

                  <UiInput
                    type="text"
                    placeholder="Masukkan nama Kategori"
                    @update:model-value="onChange($event as string)"
                  />

                  <UiDialogFooter>
                    <UiButton @click="submitCreateCategory"> Buat </UiButton>
                  </UiDialogFooter>
                </UiDialogContent>
              </UiDialog>
            </UiButton>
          </div>
        </template>
        <template #empty-list="{}">
          <AdminEmptyListPlaceholder item-name="Categories" />
        </template>
      </AdminTableDataTable>
    </div>
  </AdminPage>
</template>
