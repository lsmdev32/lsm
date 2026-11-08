<script setup lang="ts">
import { getDoc } from "firebase/firestore";
import { PlusIcon, RotateCwIcon } from "lucide-vue-next";

import { blogColumns } from "~/components/admin/table/columns";
import { getCategoryDocRef, getStaffDocRef } from "~/lib/firestore-model";
import type { CategoryAppModel, StaffAppModel } from "~/lib/firestore-model";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const firestore = useFirestore();

const {
  keyword,
  category,
  author,
  debouncedCategory,
  debouncedAuthor,
  currentPage,
  results,
  setPage,
  isLoading,
  totalPages,
  refresh,
} = useBlogList();

const tempCategorySearch = ref("");
const tempAuthorSearch = ref("");

const { result: resultCategories } = useSearch<CategoryAppModel>(
  "categories",
  debouncedCategory,
  ["name"]
);

const mappedCategories = computed(() =>
  (resultCategories.value?.hits ?? []).map((item) => ({
    label: item.name,
    value: item.objectID,
  }))
);

const { result: resultAuthors } = useSearch<StaffAppModel>(
  "staffs",
  debouncedAuthor,
  ["fullname"]
);

const mappedAuthors = computed(() =>
  (resultAuthors.value?.hits ?? []).map((item) => ({
    label: item.fullname,
    value: item.objectID,
  }))
);

watch(tempCategorySearch, (value) => {
  if (!value) {
    category.value = "";
  }
});

watch(tempAuthorSearch, (value) => {
  if (!value) {
    author.value = "";
  }
});

onMounted(async () => {
  if (category.value) {
    const doc = await getDoc(
      getCategoryDocRef(firestore, debouncedCategory.value)
    );

    tempCategorySearch.value = doc.data()?.name ?? "";
  }

  if (author.value) {
    const doc = await getDoc(getStaffDocRef(firestore, debouncedAuthor.value));
    tempAuthorSearch.value = doc.data()?.fullname ?? "";
  }
});

function handleChangeCategory(value?: string | null) {
  category.value = value ?? "";
}

function handleChangeAuthor(value?: string | null) {
  author.value = value ?? "";
}

const hasActiveFilters = computed(
  () => keyword.value !== "" || category.value !== "" || author.value !== ""
);

function clearFilters() {
  keyword.value = "";
  tempCategorySearch.value = "";
  tempAuthorSearch.value = "";
  category.value = "";
  author.value = "";
  setPage(0);
}
</script>

<template>
  <AdminPage
    page-title="Blog"
    description="Tulisan yang tampil di halaman blog situs publik."
  >
    <template #actions>
      <UiButton
        variant="outline"
        size="sm"
        :disabled="isLoading"
        @click="refresh"
      >
        <RotateCwIcon :class="isLoading ? 'animate-spin' : ''" />
        <span>Muat ulang</span>
      </UiButton>
      <UiButton variant="brand" size="sm" as-child>
        <NuxtLink to="/dashboard/blogs/create">
          <PlusIcon />
          <span>Blog baru</span>
        </NuxtLink>
      </UiButton>
    </template>

    <AdminTableDataTable
      v-if="results"
      :columns="blogColumns as []"
      :data="results"
      :current-page="currentPage"
      :total-pages="totalPages"
      :page-size="10"
      :loading="isLoading"
      :selectable="false"
      :no-toggle-column-visibility="true"
      @update:page="setPage($event)"
    >
      <template #upper>
        <div class="flex w-full flex-wrap items-center gap-2">
          <div class="max-w-sm min-w-60 flex-1">
            <AdminSearchField
              v-model="keyword"
              placeholder="Cari judul blog…"
            />
          </div>
          <div class="w-44">
            <AdminSearchableComboBox
              v-model:model-value="tempCategorySearch"
              :items="mappedCategories"
              placeholder="Kategori"
              @select="handleChangeCategory($event)"
            />
          </div>
          <div class="w-44">
            <AdminSearchableComboBox
              v-model:model-value="tempAuthorSearch"
              :items="mappedAuthors"
              placeholder="Penulis"
              @select="handleChangeAuthor($event)"
            />
          </div>
          <AdminClearFilterButton
            :disabled="!hasActiveFilters"
            @clear="clearFilters"
          />
        </div>
      </template>

      <template #empty-list>
        <AdminEmptyListPlaceholder
          :item-name="hasActiveFilters ? 'hasil' : 'blog'"
          :description="
            hasActiveFilters
              ? 'Coba kata kunci atau filter lain.'
              : 'Blog yang dibuat akan muncul di sini.'
          "
        />
      </template>
    </AdminTableDataTable>
  </AdminPage>
</template>
