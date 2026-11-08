<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import { getDoc } from "firebase/firestore";
import { LoaderCircleIcon, SaveIcon, SendIcon } from "lucide-vue-next";

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

const form = useCreateBlogForm();
const isFormSubmitting = form.isSubmitting;

const coverFile = computed(() => {
  const value = form.values.value.cover_image;

  return value instanceof File ? value : undefined;
});

const coverPreview = computed(() =>
  coverFile.value ? URL.createObjectURL(coverFile.value) : undefined
);

watch(coverPreview, (url) => {
  if (url) {
    localStorage.setItem(LOCAL_STORAGE_KEYS.IMAGE_COVER, url);
  }
});

const category = ref("");
const debouncedCategory = useDebounce(category, DEBOUNCE_DEFAULT_TIME);

const author = ref("");
const debouncedAuthor = useDebounce(author, DEBOUNCE_DEFAULT_TIME);

onMounted(async () => {
  const parsed = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.CREATE_BLOG_FORM) || "{}"
  );

  if (parsed.category) {
    const doc = await getDoc(getCategoryDocRef(firestore, parsed.category));

    category.value = doc.data()?.name ?? "";
  }

  if (parsed.author) {
    const doc = await getDoc(getStaffDocRef(firestore, parsed.author));

    author.value = doc.data()?.fullname ?? "";
  }
});

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

function selectCoverImage(file: File) {
  form.form.setFieldValue("cover_image", file);
}
</script>

<template>
  <AdminPage
    page-title="Blog baru"
    description="Tulis, simpan sebagai draft, atau langsung terbitkan."
  >
    <template #actions>
      <UiButton
        variant="outline"
        size="sm"
        :disabled="isFormSubmitting"
        @click="form.resetForm()"
      >
        Reset
      </UiButton>
    </template>

    <form
      class="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]"
      @submit="form.onSubmit"
    >
      <div class="flex min-w-0 flex-col gap-6">
        <UiCard>
          <UiCardContent class="flex flex-col gap-5 p-5 sm:p-6">
            <UiFormField v-slot="{ componentField, meta }" name="title">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Judul</UiFormLabel>
                <UiFormControl>
                  <UiInput
                    v-bind="componentField"
                    type="text"
                    placeholder="Judul blog"
                    autofocus
                    :disabled="isFormSubmitting"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ handleChange, value, meta }" name="content">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Isi blog</UiFormLabel>
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
            <AdminCoverImageField
              name="cover_image"
              :preview-url="coverPreview"
              :disabled="isFormSubmitting"
              @select="selectCoverImage"
              @remove="form.removeCoverImage()"
            />

            <UiFormField v-slot="{ handleChange, meta }" name="category">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Kategori</UiFormLabel>
                <UiFormControl>
                  <AdminSearchableComboBox
                    v-model:model-value="category"
                    :items="mappedCategories"
                    placeholder="Pilih kategori"
                    @select="handleChange($event)"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ handleChange, meta }" name="author">
              <UiFormItem>
                <UiFormLabel :required="meta.required">Penulis</UiFormLabel>
                <UiFormControl>
                  <AdminSearchableComboBox
                    v-model:model-value="author"
                    :items="mappedAuthors"
                    placeholder="Pilih penulis"
                    @select="handleChange($event)"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>

        <UiCard>
          <UiCardContent class="flex flex-col gap-5 p-5 sm:p-6">
            <UiFormField
              v-slot="{ handleChange, meta, value }"
              name="published_at"
            >
              <UiFormItem>
                <UiFormLabel :required="meta.required">
                  Tanggal terbit
                </UiFormLabel>
                <UiFormControl>
                  <AdminDatePicker
                    class="w-full"
                    :model-value="value"
                    @update:model-value="handleChange($event)"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>
          </UiCardContent>
        </UiCard>

        <div class="flex flex-col gap-2">
          <UiButton
            type="button"
            variant="brand"
            :disabled="isFormSubmitting"
            @click="form.saveAsPublished()"
          >
            <LoaderCircleIcon v-if="isFormSubmitting" class="animate-spin" />
            <SendIcon v-else />
            {{ isFormSubmitting ? "Menyimpan…" : "Simpan dan terbitkan" }}
          </UiButton>
          <UiButton
            type="button"
            variant="outline"
            :disabled="isFormSubmitting"
            @click="form.saveAsDraft()"
          >
            <SaveIcon />
            Simpan sebagai draft
          </UiButton>
        </div>
      </aside>
    </form>
  </AdminPage>
</template>
