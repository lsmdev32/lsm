<script setup lang="ts">
import {
  CameraIcon,
  FileUpIcon,
  LoaderCircleIcon,
  PlusIcon,
} from "lucide-vue-next";

import RichTextEditor from "~/components/rte/rich-text-editor.vue";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const router = useRouter();

const form = useCreateStaffForm();
const isFormSubmitting = form.form.isSubmitting;

const RANKS = [
  { value: "founder", label: "Founder" },
  { value: "partner", label: "Partner" },
  { value: "associate", label: "Associate" },
  { value: "of_counsel", label: "Of Counsel" },
];

const photoPreview = computed(() => {
  const value = form.form.values.profile_picture;

  return value instanceof File ? URL.createObjectURL(value) : undefined;
});

const cvName = computed(() => {
  const value = form.form.values.cv;

  return value instanceof File ? value.name : "";
});

const photoInput = ref<{ $el?: unknown }>();
const cvInput = ref<{ $el?: unknown }>();

function chooseFile(input: { $el?: unknown } | undefined) {
  const element = input?.$el;

  if (element instanceof HTMLInputElement) {
    element.click();
  }
}

function resetForm() {
  form.resetForm();
  window.location.reload();
}

function cancel() {
  form.resetForm();
  void router.replace({ path: "/dashboard/profiles" });
}
</script>

<template>
  <AdminPage
    page-title="Profil baru"
    description="Profil akan tampil di halaman attorneys setelah disimpan."
  >
    <template #actions>
      <UiButton
        variant="ghost"
        size="sm"
        :disabled="isFormSubmitting"
        @click="cancel"
      >
        Batal
      </UiButton>
      <UiButton
        variant="outline"
        size="sm"
        :disabled="isFormSubmitting"
        @click="resetForm"
      >
        Reset
      </UiButton>
    </template>

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
                      placeholder="Nama lengkap advokat"
                      autofocus
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
                      placeholder="nama@lsmlaw.co.id"
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
                      placeholder="https://www.linkedin.com/in/…"
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
                    placeholder="Satu kalimat tentang advokat ini"
                    :disabled="isFormSubmitting"
                  />
                </UiFormControl>
                <UiFormDescription>
                  Tampil di kartu profil dan daftar advokat.
                </UiFormDescription>
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
            <UiFormField v-slot="{ handleChange, meta }" name="profile_picture">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Foto profil</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    ref="photoInput"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    class="hidden"
                    :disabled="isFormSubmitting"
                    @change="handleChange"
                  />
                </UiFormControl>
                <button
                  type="button"
                  class="group relative flex aspect-square w-40 items-center justify-center overflow-hidden rounded-full border bg-muted/50 transition-colors hover:border-[#4B3D2A]/40"
                  :disabled="isFormSubmitting"
                  @click="chooseFile(photoInput)"
                >
                  <img
                    v-if="photoPreview"
                    :src="photoPreview"
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
                    v-if="photoPreview"
                    class="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    Ganti foto
                  </span>
                </button>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ handleChange, meta }" name="cv">
              <UiFormItem>
                <UiFormLabel :required="meta.required">CV</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    ref="cvInput"
                    type="file"
                    accept=".pdf"
                    class="hidden"
                    :disabled="isFormSubmitting"
                    @change="handleChange"
                  />
                </UiFormControl>
                <button
                  type="button"
                  class="flex w-full items-center justify-between gap-2 rounded-md border border-dashed px-3 py-2 text-sm transition-colors hover:border-[#4B3D2A]/40 hover:bg-muted"
                  :disabled="isFormSubmitting"
                  @click="chooseFile(cvInput)"
                >
                  <span class="min-w-0 truncate">
                    {{ cvName || "Pilih file PDF" }}
                  </span>
                  <FileUpIcon class="size-4 shrink-0 text-muted-foreground" />
                </button>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>

        <UiButton type="submit" variant="brand" :disabled="isFormSubmitting">
          <LoaderCircleIcon v-if="isFormSubmitting" class="animate-spin" />
          <PlusIcon v-else />
          {{ isFormSubmitting ? "Menyimpan…" : "Simpan profil" }}
        </UiButton>
      </aside>
    </form>
  </AdminPage>
</template>
