<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router";
import { deleteDoc } from "firebase/firestore";
import { RefreshCcw, UserPlus2 } from "lucide-vue-next";
import { toast } from "vue-sonner";

import EmptyListPlaceholder from "~/components/admin/empty-list-placeholder.vue";
import { confirmAction } from "~/composables/use-confirm";
import { getStaffDocRef } from "~/lib/firestore-model";
import type { StaffAppModel } from "~/lib/firestore-model";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const keyword = useRouteQuery("keyword", "");

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
    description: `Are you sure you want to delete the profile of ${payload.fullname}?`,
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

  toast.success(`Profil ${payload.fullname} berhasil dihapus.`);
  refresh();
}
</script>

<template>
  <AdminPage page-title="Profil Staff">
    <div class="flex flex-col gap-y-4 py-10">
      <div class="flex w-full justify-end">
        <NuxtLink
          to="/dashboard/profiles/create"
          class="flex items-center justify-center border"
        >
          <UiButton variant="outline">
            <UserPlus2 />
            <span> Create Profile </span>
          </UiButton>
        </NuxtLink>
      </div>
      <UiInput
        v-model:model-value="keyword"
        placeholder="Cari profile dengan nama atau email"
      />
      <div class="flex">
        <UiButton class="capitalize" @click="refresh">
          <RefreshCcw /> Refresh list
        </UiButton>
      </div>
      <div class="flex flex-wrap gap-6">
        <template v-if="isLoading">
          <UiSkeleton
            v-for="i in 8"
            :key="i"
            class="h-[219px] w-[255px] rounded-xl shadow-md"
          />
        </template>
        <template v-else-if="result.hits.length === 0">
          <EmptyListPlaceholder
            v-if="result.hits.length === 0 && !isLoading"
            class="flex h-[300px] w-full items-center justify-center"
            item-name="profiles"
          />
        </template>
        <template
          v-for="person in result.hits ?? []"
          v-else
          :key="person.objectID"
        >
          <AdminStaffCard
            :id="person.objectID!"
            :fullname="person.fullname"
            :email="person.email"
            :type="person.type"
            :linkedin-url="person.linkedin_url"
            :pp-url="person.profile_picture_url"
            @click-delete="onOpenDialog($event)"
          />
        </template>
      </div>
    </div>
  </AdminPage>
</template>
