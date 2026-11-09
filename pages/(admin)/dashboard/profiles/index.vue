<script setup lang="ts">
import { deleteDoc } from "firebase/firestore";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  RotateCcw,
  UserPlus2,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

import { confirmAction } from "~/composables/use-confirm";
import { getStaffDocRef } from "~/lib/firestore-model";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const {
  keyword,
  results,
  currentPage,
  totalPages,
  setPage,
  isLoading,
  refresh,
} = useStaffList();

const hasActiveFilters = computed(() => keyword.value !== "");

const canGoBack = computed(() => totalPages.value > 0 && currentPage.value > 0);

const canGoForward = computed(
  () => totalPages.value > 0 && currentPage.value < totalPages.value - 1
);

function clearFilters() {
  keyword.value = "";
  setPage(0);
}

async function onOpenDialog(payload: { id: string; fullname: string }) {
  const confirmed = await confirmAction({
    title: "Hapus profil?",
    description: `Profil ${payload.fullname} akan dihapus permanen dari situs publik.`,
    confirmLabel: "Hapus profil",
    tone: "destructive",
  });

  if (!confirmed) {
    return;
  }

  try {
    await deleteDoc(getStaffDocRef(useFirestore(), payload.id));
  } catch {
    toast.error(`Gagal menghapus profil ${payload.fullname}`);

    return;
  }

  toast.success(`Profil ${payload.fullname} dihapus.`);
  refresh();
}
</script>

<template>
  <AdminPage
    page-title="Profil Organisasi"
    description="Advokat firma yang tampil di halaman attorneys."
  >
    <template #actions>
      <UiButton
        variant="outline"
        size="sm"
        :disabled="isLoading"
        @click="refresh"
      >
        <RotateCcw :class="isLoading ? 'animate-spin' : ''" />
        <span>Muat ulang</span>
      </UiButton>
      <UiButton variant="brand" size="sm" as-child>
        <NuxtLink to="/dashboard/profiles/create">
          <UserPlus2 />
          <span>Profil baru</span>
        </NuxtLink>
      </UiButton>
    </template>

    <div class="flex w-full flex-col gap-4">
      <div class="flex flex-wrap items-center gap-2">
        <div class="max-w-md min-w-60 flex-1">
          <AdminSearchField
            v-model="keyword"
            placeholder="Cari nama atau email…"
          />
        </div>
        <AdminClearFilterButton
          :disabled="!hasActiveFilters"
          @clear="clearFilters"
        />
      </div>

      <div
        v-if="isLoading"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <UiSkeleton
          v-for="i in 8"
          :key="i"
          class="h-[248px] w-full rounded-xl"
        />
      </div>

      <AdminEmptyListPlaceholder
        v-else-if="results.length === 0"
        :item-name="hasActiveFilters ? 'hasil' : 'profil'"
        :description="
          hasActiveFilters
            ? 'Coba nama atau email lain.'
            : 'Profil advokat yang dibuat akan muncul di sini.'
        "
      />

      <div
        v-else
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      >
        <AdminStaffCard
          v-for="person in results"
          :key="person.objectID"
          :id="person.objectID!"
          :fullname="person.fullname"
          :email="person.email"
          :type="person.type"
          :linkedin-url="person.linkedin_url"
          :pp-url="person.profile_picture_url"
          @click-delete="onOpenDialog($event)"
        />
      </div>

      <div
        v-if="results.length > 0"
        class="flex flex-wrap items-center justify-end gap-2"
      >
        <span class="text-xs text-muted-foreground">
          Halaman {{ currentPage + 1 }} dari {{ Math.max(totalPages, 1) }}
        </span>
        <UiButton
          variant="outline"
          size="icon"
          aria-label="Halaman sebelumnya"
          :disabled="!canGoBack"
          @click="setPage(currentPage - 1)"
        >
          <ChevronLeftIcon class="size-4" />
        </UiButton>
        <UiButton
          variant="outline"
          size="icon"
          aria-label="Halaman berikutnya"
          :disabled="!canGoForward"
          @click="setPage(currentPage + 1)"
        >
          <ChevronRightIcon class="size-4" />
        </UiButton>
      </div>
    </div>
  </AdminPage>
</template>
