<script setup lang="ts">
import { Pencil, UserIcon } from "lucide-vue-next";

import RichTextEditor from "~/components/rte/rich-text-editor.vue";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

const router = useRouter();

const form = useCreateStaffForm();
const isFormSubmitting = form.form.isSubmitting;

const imageURL = computed(() => {
  const value = form.form.values.profile_picture;

  if (!value) {
    return;
  }

  if (!(value instanceof File)) {
    return;
  }

  return URL.createObjectURL(value);
});

function onChooseFile() {
  const target = document.querySelector("#pp");

  if (!target) {
    return;
  }

  if (!(target instanceof HTMLInputElement)) {
    return;
  }

  target.click();
}

function onResetForm() {
  form.resetForm();
  window.location.reload();
}

function onCancel() {
  onResetForm();
  router.replace({ path: "/dashboard/profiles" });
}
</script>

<template>
  <AdminPage page-title="Create Profile">
    <form class="flex w-full flex-col py-10" @submit="form.onSubmit">
      <div class="flex gap-8">
        <div class="flex flex-col items-center space-y-4">
          <UiFormField v-slot="{ handleChange, meta }" name="profile_picture">
            <UiFormItem class="w-[200px]">
              <UiFormLabel :required="meta.required"> Foto Profil </UiFormLabel>
              <UiAvatar
                class="group size-[200px] cursor-pointer hover:opacity-80"
                shape="square"
                @click="onChooseFile"
              >
                <UiAvatarImage
                  :src="imageURL ?? ''"
                  alt="@unovue"
                  class="group-hover:hidden"
                />
                <div
                  :class="[
                    'hidden flex-col items-center gap-y-4',
                    imageURL ? 'group-hover:flex' : 'hidden',
                  ]"
                >
                  <Pencil :size="50" color="gray" />
                  <span class="font-semibold">Change Picture</span>
                </div>
                <UiAvatarFallback class="">
                  <UserIcon
                    :size="100"
                    color="gray"
                    class="block group-hover:hidden"
                  />
                  <div
                    class="hidden flex-col items-center gap-y-4 group-hover:flex"
                  >
                    <Pencil :size="50" color="gray" />
                    <span class="font-semibold">Change Picture</span>
                  </div>
                </UiAvatarFallback>
              </UiAvatar>
              <UiFormControl>
                <UiInput
                  id="pp"
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
        </div>
        <keep-alive>
          <div class="flex w-1/2 flex-col gap-y-4">
            <UiFormField v-slot="{ componentField, meta }" name="type">
              <UiFormItem class="w-fit" :required="meta.required">
                <UiFormLabel :required="meta.required">
                  Tipe Staff
                </UiFormLabel>
                <UiSelect v-bind="componentField" :disabled="isFormSubmitting">
                  <UiFormControl>
                    <UiSelectTrigger>
                      <UiSelectValue class="pr-4" />
                    </UiSelectTrigger>
                  </UiFormControl>
                  <UiSelectContent>
                    <UiSelectGroup>
                      <UiSelectItem value="partner"> Partner </UiSelectItem>
                      <UiSelectItem value="associate"> Associate </UiSelectItem>
                      <UiSelectItem value="founder"> Founder </UiSelectItem>
                      <UiSelectItem value="of_counsel">
                        Of Counsel
                      </UiSelectItem>
                    </UiSelectGroup>
                  </UiSelectContent>
                </UiSelect>
                <UiFormDescription> Pilih tipe staff </UiFormDescription>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ componentField, meta }" name="fullname">
              <UiFormItem class="w-full">
                <UiFormLabel :required="meta.required">
                  Nama Lengkap
                </UiFormLabel>
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

            <UiFormField v-slot="{ componentField, meta }" name="email">
              <UiFormItem class="w-full">
                <UiFormLabel :required="meta.required"> Email </UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="email"
                    placeholder="john@doe.com"
                    v-bind="componentField"
                    :disabled="isFormSubmitting"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ componentField, meta }" name="linkedin_url">
              <UiFormItem class="w-full">
                <UiFormLabel :required="meta.required">
                  Linkedin URL
                </UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="url"
                    placeholder="https://www.linkedin.com/in/johndoe"
                    v-bind="componentField"
                    :disabled="isFormSubmitting"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ componentField, meta }" name="short_bio">
              <UiFormItem class="w-full">
                <UiFormLabel :required="meta.required">
                  Short Biography
                </UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="text"
                    placeholder="Saya adalah..."
                    v-bind="componentField"
                    :disabled="isFormSubmitting"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ handleChange, value, meta }" name="bio">
              <UiFormItem class="mb-24 w-full">
                <UiFormLabel :required="meta.required"> Biography </UiFormLabel>
                <UiFormControl>
                  <RichTextEditor
                    class="min-h-[200px] max-w-full"
                    :initial-value="value"
                    :disabled="isFormSubmitting"
                    @handle-change="handleChange($event)"
                  />
                </UiFormControl>
                <UiFormMessage />
              </UiFormItem>
            </UiFormField>

            <UiFormField v-slot="{ handleChange, meta }" name="cv">
              <UiFormItem class="">
                <UiFormLabel :required="meta.required"> CV/Resume </UiFormLabel>
                <UiFormControl>
                  <UiInput
                    type="file"
                    accept=".pdf"
                    placeholder="shadcn"
                    class="w-[150px] bg-transparent text-transparent outline"
                    :disabled="isFormSubmitting"
                    @change="handleChange"
                  />
                </UiFormControl>
                <UiFormMessage />
                <UiFormDescription v-if="form.form.values.cv">
                  {{ form.form.values.cv.name }}
                </UiFormDescription>
                <UiFormDescription> Upload dalam format PDF </UiFormDescription>
              </UiFormItem>
            </UiFormField>
            <ui-button type="submit" class="" :disabled="isFormSubmitting">
              Simpan
            </ui-button>
            <div class="flex justify-between gap-x-2">
              <ui-button
                variant="secondary"
                class="flex-grow"
                :disabled="isFormSubmitting"
                @click="onResetForm"
              >
                Reset
              </ui-button>
              <ui-button
                variant="outline"
                class="flex-grow"
                :disabled="isFormSubmitting"
                @click="onCancel"
              >
                Batal
              </ui-button>
            </div>
          </div>
        </keep-alive>
      </div>
    </form>
  </AdminPage>
</template>
