<script setup lang="ts">
import {
  CameraIcon,
  DownloadIcon,
  FileUpIcon,
  LoaderCircleIcon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

import RichTextEditor from "~/components/rte/rich-text-editor.vue";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const route = useRoute();

// SAFETY: `/dashboard/profiles/[id]/edit` always matches exactly one `id`
// segment, which the router types as `string`.
const id = ref<string>(route.params.id as string);

const form = useEditStaffForm(id);
const isFormSubmitting = form.form.isSubmitting;

const RANKS = [
  { value: "founder", label: "Founder" },
  { value: "partner", label: "Partner" },
  { value: "associate", label: "Associate" },
  { value: "of_counsel", label: "Of Counsel" },
];

const photoUploading = ref(false);
const cvUploading = ref(false);

const photoInput = ref<{ $el?: unknown }>();
const cvInput = ref<{ $el?: unknown }>();

function chooseFile(input: { $el?: unknown } | undefined) {
  const element = input?.$el;

  if (element instanceof HTMLInputElement) {
    element.click();
  }
}

async function handlePhotoChange(event: Event) {
  // SAFETY: bound to `@change` on the photo input itself.
  const input = event.target as HTMLInputElement;
  const file = input.files?.item(0);

  if (!file) {
    return;
  }

  photoUploading.value = true;

  try {
    await form.updateProfilePicture(file);
  } catch {
    toast.error("Gagal mengunggah foto profil");
  } finally {
    photoUploading.value = false;
    input.value = "";
  }
}

async function handleCvChange(event: Event) {
  // SAFETY: bound to `@change` on the CV input itself.
  const input = event.target as HTMLInputElement;
  const file = input.files?.item(0);

  if (!file) {
    return;
  }

  cvUploading.value = true;

  try {
    await form.updateCV(file);
  } catch {
    toast.error("Gagal mengunggah CV");
  } finally {
    cvUploading.value = false;
    input.value = "";
  }
}
</script>

<template>
  <AdminPage
    page-title="Ubah profil"
    description="Perubahan langsung tampil di halaman attorneys."
    :transform-crumbs="{ 2: () => form.form.values.fullname }"
  >
    <form
      class="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]"
      @submit="form.onSubmit"
    >
      <div class="flex min-w-0 flex-col gap-6">
        <UiCard>
          <UiCardContent class="flex flex-col gap-5 p-5 sm:p-6">
            <div class="grid gap-5 sm:grid-cols-2">
              <UiFormField v-slot="{ componentField, meta }" name="fullname">
                <UiFormItem>
                  <UiFormLabel :required="meta.required">
                    Nama lengkap
                  </UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      v-bind="componentField"
                      type="text"
                      :disabled="isFormSubmitting"
                    />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField, meta }" name="type">
                <UiFormItem>
                  <UiFormLabel :required="meta.required">Jabatan</UiFormLabel>
                  <UiSelect
                    v-bind="componentField"
                    :disabled="isFormSubmitting"
                  >
                    <UiFormControl>
                      <UiSelectTrigger class="w-full">
                        <UiSelectValue placeholder="Pilih jabatan" />
                      </UiSelectTrigger>
                    </UiFormControl>
                    <UiSelectContent>
                      <UiSelectItem
                        v-for="rank in RANKS"
                        :key="rank.value"
                        :value="rank.value"
                      >
                        {{ rank.label }}
                      </UiSelectItem>
                    </UiSelectContent>
                  </UiSelect>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField v-slot="{ componentField, meta }" name="email">
                <UiFormItem>
                  <UiFormLabel :required="meta.required">Email</UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      v-bind="componentField"
                      type="email"
                      autocapitalize="none"
                      spellcheck="false"
                      :disabled="isFormSubmitting"
                    />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>

              <UiFormField
                v-slot="{ componentField, meta }"
                name="linkedin_url"
              >
                <UiFormItem>
                  <UiFormLabel :required="meta.required">LinkedIn</UiFormLabel>
                  <UiFormControl>
                    <UiInput
                      v-bind="componentField"
                      type="url"
                      autocapitalize="none"
                      spellcheck="false"
                      :disabled="isFormSubmitting"
                    />
                  </UiFormControl>
                  <UiFormMessage />
                </UiFormItem>
              </UiFormField>
            </div>

            <UiFormField v-slot="{ componentField, meta }" name="short_bio">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Bio singkat</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    v-bind="componentField"
                    type="text"
                    :disabled="isFormSubmitting"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ handleChange, value, meta }" name="bio">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Biografi</UiFormLabel>
                <UiFormControl>
                  <RichTextEditor
                    class="max-w-full"
                    :initial-value="value"
                    :disabled="isFormSubmitting"
                    @handle-change="handleChange($event)"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>
      </div>

      <aside class="flex min-w-0 flex-col gap-6">
        <UiCard>
          <UiCardContent class="flex flex-col gap-5 p-5 sm:p-6">
            <UiFormField v-slot="{ meta }" name="profile_picture">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Foto profil</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    ref="photoInput"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    class="hidden"
                    :disabled="isFormSubmitting || photoUploading"
                    @change="handlePhotoChange"
                  />
                </UiFormControl>
                <button
                  type="button"
                  class="group relative flex aspect-square w-40 items-center justify-center overflow-hidden rounded-full border bg-muted/50 transition-colors hover:border-[#4B3D2A]/40"
                  :disabled="isFormSubmitting || photoUploading"
                  @click="chooseFile(photoInput)"
                >
                  <img
                    v-if="form.form.values.pp_url"
                    :src="form.form.values.pp_url"
                    alt=""
                    class="size-full object-cover"
                  />
                  <span
                    v-else
                    class="flex flex-col items-center gap-2 text-muted-foreground"
                  >
                    <CameraIcon class="size-6" aria-hidden="true" />
                    <span class="text-xs">Pilih foto</span>
                  </span>
                  <span
                    class="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-medium text-white transition-opacity"
                    :class="
                      photoUploading || !form.form.values.pp_url
                        ? 'opacity-100'
                        : 'opacity-0 group-hover:opacity-100'
                    "
                  >
                    <LoaderCircleIcon
                      v-if="photoUploading"
                      class="mr-1 size-4 animate-spin"
                    />
                    {{ photoUploading ? "Mengunggah…" : "Ganti foto" }}
                  </span>
                </button>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ meta }" name="cv">
              <UiFormItem>
                <UiFormLabel :required="meta.required">CV</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    ref="cvInput"
                    type="file"
                    accept=".pdf"
                    class="hidden"
                    :disabled="isFormSubmitting || cvUploading"
                    @change="handleCvChange"
                  />
                </UiFormControl>
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-2 rounded-md border border-dashed px-3 py-2 text-sm transition-colors hover:border-[#4B3D2A]/40 hover:bg-muted"
                  :disabled="isFormSubmitting || cvUploading"
                  @click="chooseFile(cvInput)"
                >
                  <span class="min-w-0 truncate">
                    {{ cvUploading ? "Mengunggah…" : "Ganti file PDF" }}
                  </span>
                  <FileUpIcon class="size-4 shrink-0 text-muted-foreground" />
                </button>
                <UiButton
                  v-if="form.form.values.cv_url"
                  variant="link"
                  size="sm"
                  as-child
                  class="w-fit px-0"
                >
                  <a
                    :href="form.form.values.cv_url"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <DownloadIcon />
                    <span>Buka CV saat ini</span>
                  </a>
                </UiButton>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>

        <UiButton type="submit" variant="brand" :disabled="isFormSubmitting">
          <LoaderCircleIcon v-if="isFormSubmitting" class="animate-spin" />
          {{ isFormSubmitting ? "Menyimpan…" : "Simpan perubahan" }}
        </UiButton>
      </aside>
    </form>
  </AdminPage>
</template>
