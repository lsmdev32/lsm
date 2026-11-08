<script setup lang="ts">
import { useDebounce, useFileDialog } from "@vueuse/core";
import { getDoc } from "firebase/firestore";
import { LoaderCircleIcon, SaveIcon, SendIcon } from "lucide-vue-next";

import RichTextEditor from "~/components/rte/rich-text-editor.vue";
import { useEditBlogForm } from "~/composables/form/use-edit-blog-form";
import { DEBOUNCE_DEFAULT_TIME, LOCAL_STORAGE_KEYS } from "~/lib/constants";
import { getCategoryDocRef, getStaffDocRef } from "~/lib/firestore-model";
import type { CategoryAppModel, StaffAppModel } from "~/lib/firestore-model";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

// SAFETY: `/dashboard/blogs/[id]/edit` always matches exactly one `id`
// segment, which the router types as `string`.
const id = useRoute().params.id as string;
const firestore = useFirestore();

const form = useEditBlogForm(id);
const isFormSubmitting = form.isSubmitting;

const coverPreview = computed(() => form.form.values.image_url ?? undefined);
const isPublished = computed(() => form.form.values.status === "published");

const coverDialog = useFileDialog();

onMounted(() => {
  const listener = coverDialog.onChange(async (files) => {
    const file = files?.item(0);

    if (!file) {
      return;
    }

    localStorage.setItem(
      LOCAL_STORAGE_KEYS.IMAGE_COVER,
      URL.createObjectURL(file)
    );

    await form.uploadCoverImage(file);
  });

  return () => {
    listener.off();
  };
});

function selectCoverImage() {
  coverDialog.open({ accept: "image/*", multiple: false });
}

const category = ref("");
const debouncedCategory = useDebounce(category, DEBOUNCE_DEFAULT_TIME);

const author = ref("");
const debouncedAuthor = useDebounce(author, DEBOUNCE_DEFAULT_TIME);

watch(
  form.form.values,
  async (values) => {
    if (values.image_url) {
      localStorage.setItem(LOCAL_STORAGE_KEYS.IMAGE_COVER, values.image_url);
    }

    if (values.category) {
      const doc = await getDoc(getCategoryDocRef(firestore, values.category));

      category.value = doc.data()?.name ?? "";
    }

    if (values.author) {
      const doc = await getDoc(getStaffDocRef(firestore, values.author));

      author.value = doc.data()?.fullname ?? "";
    }
  },
  { deep: true }
);

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
</script>

<template>
  <AdminPage
    page-title="Ubah blog"
    :description="
      isPublished ? 'Sudah terbit di situs publik.' : 'Masih draft.'
    "
    :transform-crumbs="{ 2: () => form.values.value.title }"
  >
    <template #actions>
      <UiBadge :variant="isPublished ? 'default' : 'secondary'">
        {{ isPublished ? "Terbit" : "Draft" }}
      </UiBadge>
      <UiButton variant="outline" size="sm" as-child v-if="isPublished">
        <a
          :href="`/blogs/${form.form.values.slug}`"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat di situs
        </a>
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
