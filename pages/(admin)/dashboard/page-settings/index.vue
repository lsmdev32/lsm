<script setup lang="ts">
import {
  FileTextIcon,
  FileUpIcon,
  LoaderCircleIcon,
  SaveIcon,
  Trash2Icon,
} from "lucide-vue-next";

import { confirmAction } from "~/composables/use-confirm";
import { PAGE_SETTINGS_CONSTANTS } from "~/lib/constants";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

useHead({ title: "Pengaturan Halaman · LSM Dashboard" });

const {
  companyProfileUrl,
  selectedFile,
  isUploading,
  selectCompanyProfile,
  clearCompanyProfile,
  uploadCompanyProfile,
  removeCompanyProfile,
} = usePageSettingsForm();

const fileInput = ref<{ $el?: unknown }>();

const isBusy = computed(() => isUploading.value);

const selectedFileName = computed(() => selectedFile.value?.name ?? "");

const companyProfileLabel = computed(() => {
  if (selectedFileName.value) {
    return selectedFileName.value;
  }

  return companyProfileUrl.value
    ? "Profil perusahaan tersimpan"
    : "Belum ada berkas";
});

function openPicker() {
  const input = fileInput.value?.$el;

  if (input instanceof HTMLInputElement) {
    input.click();
  }
}

function handleFileChange(event: Event) {
  // SAFETY: bound to `@change` on the file input itself.
  const input = event.target as HTMLInputElement;
  const file = input.files?.item(0);

  if (!file) {
    return;
  }

  selectCompanyProfile(file);
  input.value = "";
}

async function confirmRemove() {
  const confirmed = await confirmAction({
    title: "Hapus profil perusahaan?",
    description:
      "Tautan unduhan profil perusahaan akan dihapus dari pengaturan halaman.",
    confirmLabel: "Hapus",
    tone: "destructive",
  });

  if (!confirmed) {
    return;
  }

  await removeCompanyProfile();
}
</script>

<template>
  <AdminPage
    page-title="Pengaturan halaman"
    description="Berkas yang dipakai bersama oleh halaman situs publik."
  >
    <UiCard class="w-full max-w-2xl">
      <UiCardHeader>
        <UiCardTitle class="text-base">Profil perusahaan</UiCardTitle>
        <UiCardDescription>
          Berkas PDF yang diunduh pengunjung dari tombol "Download Company
          Profile" di halaman beranda dan tentang.
        </UiCardDescription>
      </UiCardHeader>

      <UiCardContent class="flex flex-col gap-4">
        <div
          class="flex items-center justify-between gap-3 rounded-md border border-dashed px-3 py-2.5"
        >
          <span class="flex min-w-0 items-center gap-2">
            <FileTextIcon class="size-4 shrink-0 text-muted-foreground" />
            <span class="min-w-0 truncate text-sm">
              {{ companyProfileLabel }}
            </span>
          </span>

          <span class="flex shrink-0 items-center gap-1">
            <UiButton
              v-if="companyProfileUrl"
              variant="ghost"
              size="xs"
              as-child
            >
              <a
                :href="companyProfileUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lihat
              </a>
            </UiButton>
            <UiButton
              v-if="companyProfileUrl"
              variant="ghost"
              size="xs"
              class="text-destructive"
              :disabled="isBusy"
              @click="confirmRemove"
            >
              <Trash2Icon />
              <span>Hapus</span>
            </UiButton>
          </span>
        </div>

        <UiInput
          ref="fileInput"
          type="file"
          accept=".pdf"
          class="hidden"
          :disabled="isBusy"
          @change="handleFileChange"
        />

        <div class="flex flex-wrap items-center gap-2">
          <UiButton
            type="button"
            variant="outline"
            size="sm"
            :disabled="isBusy"
            @click="openPicker"
          >
            <FileUpIcon />
            <span>Pilih berkas</span>
          </UiButton>

          <UiButton
            type="button"
            variant="brand"
            size="sm"
            :disabled="isBusy || !selectedFile"
            @click="uploadCompanyProfile"
          >
            <LoaderCircleIcon v-if="isBusy" class="animate-spin" />
            <SaveIcon v-else />
            <span>{{ isBusy ? "Mengunggah…" : "Simpan" }}</span>
          </UiButton>

          <UiButton
            v-if="selectedFile"
            type="button"
            variant="ghost"
            size="sm"
            :disabled="isBusy"
            @click="clearCompanyProfile"
          >
            Batal
          </UiButton>
        </div>

        <p class="text-xs text-muted-foreground">
          Format PDF, maksimal
          {{
            PAGE_SETTINGS_CONSTANTS.COMPANY_PROFILE.MAX_SIZE / 1024 / 1024
          }}MB.
        </p>
      </UiCardContent>
    </UiCard>
  </AdminPage>
</template>
