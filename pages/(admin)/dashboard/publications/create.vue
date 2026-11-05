<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import { getDoc } from "firebase/firestore";
import { PencilIcon, Trash2 } from "lucide-vue-next";

import RichTextEditor from "~/components/rte/rich-text-editor.vue";
import {
  DEBOUNCE_DEFAULT_TIME,
  LOCAL_STORAGE_KEYS,
  SESSION_STORAGE_KEYS,
} from "~/lib/constants";
import { getCategoryDocRef, getStaffDocRef } from "~/lib/firestore-model";
import type { CategoryAppModel, StaffAppModel } from "~/lib/firestore-model";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const firestore = useFirestore();

const form = useCreatePublicationForm();
const isFormSubmitting = form.isSubmitting;

const imageURL = computed(() => {
  const value = form.values.value.cover_image;

  if (!value) {
    return;
  }

  if (!(value instanceof File)) {
    return;
  }

  return URL.createObjectURL(value);
});

watch(imageURL, (v) => {
  if (!v) {
    return;
  }

  localStorage.setItem(LOCAL_STORAGE_KEYS.IMAGE_COVER, v);
});

const category = ref("");
const debouncedCategory = useDebounce(category, DEBOUNCE_DEFAULT_TIME);

const author = ref("");
const debouncedAuthor = useDebounce(author, DEBOUNCE_DEFAULT_TIME);

onMounted(async () => {
  const parsed = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.CREATE_PUBLICATION_FORM) || "{}"
  );

  if (parsed.category) {
    const q = await getDoc(getCategoryDocRef(firestore, parsed.category));

    category.value = q.data()?.name || "";
  }

  if (parsed.author) {
    const q = await getDoc(getStaffDocRef(firestore, parsed.author));
    author.value = q.data()?.fullname || "";
  }
});

function onChooseImage() {
  const target = document.querySelector("#image_cover");

  if (!target) {
    return;
  }

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  target.click();
}

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
</script>

<template>
  <AdminPage page-title="Buat Publikasi Baru">
    <form class="flex w-full flex-col gap-y-4 py-20" @submit="form.onSubmit">
      <div class="flex flex-col gap-y-2 self-center">
        <UiFormField
          v-slot="{ handleChange, meta }"
          name="cover_image"
          class="self-center"
        >
          <UiFormItem class="self-center">
            <UiFormLabel :required="meta.required"> Gambar Sampul </UiFormLabel>
            <div class="group aspect-video w-[600px] rounded-lg border">
              <NuxtImg
                :src="imageURL"
                class="h-full w-full rounded-lg bg-gray-300 object-fill object-center group-hover:hidden"
              />
              <div
                class="bg-opacity-60 hidden h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2 bg-gray-300 group-hover:flex"
                @click="onChooseImage"
              >
                <PencilIcon class="h-8 w-8 text-gray-500" />
                <span class="text-lg text-gray-500">Ubah Gambar Sampul</span>
              </div>
            </div>
            <UiFormControl>
              <UiInput
                id="image_cover"
                type="file"
                accept=".jpg,.jpeg,.png"
                placeholder="shadcn"
                class="hidden bg-transparent text-transparent outline"
                :disabled="isFormSubmitting"
                @change="handleChange"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
        <ui-button
          v-if="imageURL"
          variant="outline"
          class="mx-auto"
          @click.prevent="form.removeCoverImage"
        >
          <Trash2 /> Hapus Gambar
        </ui-button>
      </div>

      <UiFormField v-slot="{ componentField, meta }" name="title">
        <UiFormItem class="w-full">
          <UiFormLabel :required="meta.required"> Judul </UiFormLabel>
          <UiFormControl>
            <UiInput
              type="text"
              placeholder="John Doe"
              v-bind="componentField"
              :disabled="isFormSubmitting"
            />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ handleChange, value, meta }" name="content">
        <UiFormItem class="mb-4 w-full">
          <UiFormLabel :required="meta.required">
            Deskripsi Publikasi
          </UiFormLabel>
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

      <div class="flex justify-start gap-x-8">
        <UiFormField v-slot="{ handleChange, meta }" name="category">
          <UiFormItem class="w-[400px]">
            <UiFormLabel :required="meta.required"> Kategori </UiFormLabel>
            <UiFormControl>
              <AdminSearchableComboBox
                v-model:model-value="category"
                :items="mappedCategories"
                @select="handleChange($event)"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>

        <UiFormField v-slot="{ handleChange, meta }" name="author">
          <UiFormItem class="w-[400px]">
            <UiFormLabel :required="meta.required"> Penulis </UiFormLabel>
            <UiFormControl>
              <AdminSearchableComboBox
                v-model:model-value="author"
                :items="mappedAuthors"
                @select="handleChange($event)"
              />
            </UiFormControl>
            <UiFormMessage />
          </UiFormItem>
        </UiFormField>
      </div>

      <UiFormField v-slot="{ handleChange, meta }" name="publication">
        <UiFormItem class="w-full">
          <UiFormLabel :required="meta.required"> File Publikasi </UiFormLabel>
          <UiFormControl>
            <UiInput
              type="file"
              accept=".pdf"
              placeholder="Input File"
              @change="handleChange($event)"
            />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <UiFormField v-slot="{ handleChange, meta, value }" name="published_at">
        <UiFormItem class="flex w-[400px] flex-col">
          <UiFormLabel :required="meta.required">
            Dipublikasikan pada
          </UiFormLabel>
          <UiFormControl>
            <AdminDatePicker
              :model-value="value"
              @update:model-value="handleChange($event)"
            />
          </UiFormControl>
          <UiFormMessage />
        </UiFormItem>
      </UiFormField>

      <div class="flex w-full items-center justify-center gap-x-4 pt-10">
        <ui-button
          class="flex-1 items-center capitalize"
          :disabled="isFormSubmitting"
          @click="form.saveAsPublished()"
        >
          Simpan dan publikasikan
        </ui-button>
        <ui-button
          class="flex-1 capitalize"
          variant="secondary"
          :disabled="isFormSubmitting"
          @click="form.saveAsDraft()"
        >
          Simpan Draft
        </ui-button>
      </div>
      <ui-button
        type="button"
        variant="outline"
        class="mt-4 w-full"
        :disabled="isFormSubmitting"
        @click="form.resetForm()"
      >
        Reset Formulir
      </ui-button>
    </form>
  </AdminPage>
</template>
