<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { deleteDoc } from "firebase/firestore";
import { RotateCcw, UserPlus2 } from "lucide-vue-next";
import { toast } from "vue-sonner";

import { confirmAction } from "~/composables/use-confirm";
import { getStaffDocRef } from "~/lib/firestore-model";
import type { StaffAppModel } from "~/lib/firestore-model";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const keyword = useRouteQuery("keyword", "");

const hasActiveFilters = computed(() => keyword.value !== "");

function clearFilters() {
  keyword.value = "";
}

const { refresh, isLoading, result } = useSearch<StaffAppModel>(
  "staffs",
  keyword,
  [
    "fullname",
    "email",
    "linkedin_url",
    "type",
    "profile_picture_url",
    "slug",
    "id",
  ]
);

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
        v-else-if="result.hits.length === 0"
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
          v-for="person in result.hits"
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
    </div>
  </AdminPage>
</template>
