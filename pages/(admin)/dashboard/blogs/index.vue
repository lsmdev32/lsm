<script setup lang="ts">
import { getDoc } from "firebase/firestore";
import { PlusIcon, RefreshCwIcon } from "lucide-vue-next";

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
} = useBlogList();

const tableLoading = computed(() => isLoading.value);
const tempCategorySearch = ref("");
const tempAuthorSearch = ref("");

const { result: resultCategories } = useSearch<CategoryAppModel>(
  "categories",
  debouncedCategory,
  ["name"]
);

const mappedCategories = computed(() => {
  if (!resultCategories.value) {
    return [];
  }

  return resultCategories.value.hits.map((item) => ({
    label: item.name,
    value: item.objectID,
  }));
});

const { result: resultAuthors } = useSearch<StaffAppModel>(
  "staffs",
  debouncedAuthor,
  ["fullname"]
);

const mappedAuthors = computed(() => {
  if (!resultAuthors.value) {
    return [];
  }

  return resultAuthors.value.hits.map((item) => ({
    label: item.fullname,
    value: item.objectID,
  }));
});

watch(tempCategorySearch, (value) => {
  if (!value) {
    category.value = "";

    return;
  }
});

watch(tempAuthorSearch, (value) => {
  if (!value) {
    author.value = "";

    return;
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

function refresh() {
  location.reload();
}
</script>

<template>
  <AdminPage page-title="Blogs">
    <AdminTableDataTable
      v-if="results"
      :columns="blogColumns as []"
      :data="results"
      :current-page="currentPage"
      :total-pages="totalPages"
      :page-size="10"
      :loading="tableLoading"
      :selectable="false"
      :no-toggle-column-visibility="true"
      @update:page="setPage($event)"
    >
      <template #upper="{}">
        <div class="flex w-full items-end gap-x-2">
          <div class="flex flex-col gap-y-2">
            <UiInput
              v-model="keyword"
              class="max-w-[420px]"
              placeholder="Cari berdasarkan judul"
            />
            <div class="flex gap-x-2">
              <div class="w-[200px]">
                <AdminSearchableComboBox
                  v-model:model-value="tempCategorySearch"
                  :items="mappedCategories"
                  placeholder="Pilih kategori"
                  @select="handleChangeCategory($event)"
                />
              </div>
              <div class="w-[200px]">
                <AdminSearchableComboBox
                  v-model:model-value="tempAuthorSearch"
                  :items="mappedAuthors"
                  placeholder="Pilih Penulis"
                  @select="handleChangeAuthor($event)"
                />
              </div>
            </div>
          </div>
          <UiButton class="" color="primary" @click="refresh">
            <RefreshCwIcon :size="24" />
          </UiButton>
          <UiButton class="ml-auto" color="primary">
            <NuxtLink
              class="flex items-center gap-x-1"
              to="/dashboard/blogs/create"
            >
              <PlusIcon />
              <span> Buat Blog Baru </span>
            </NuxtLink>
          </UiButton>
        </div>
      </template>
      <template #empty-list="{}">
        <AdminEmptyListPlaceholder item-name="Blogs" />
      </template>
    </AdminTableDataTable>
  </AdminPage>
</template>
