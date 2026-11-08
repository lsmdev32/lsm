<script setup lang="ts">
import { ImagePlusIcon, LoaderCircleIcon, Trash2Icon } from "lucide-vue-next";

interface Props {
  /** Name of the vee-validate field this input belongs to. */
  name: string;
  /** Image to preview: a server URL, or an object URL for a freshly chosen file. */
  previewUrl: string | null | undefined;
  label?: string;
  disabled?: boolean;
  /** Shows the remove button when there is something to remove. */
  removable?: boolean;
}

const {
  name,
  previewUrl,
  label = "Gambar sampul",
  disabled = false,
  removable = true,
} = defineProps<Props>();

const emit = defineEmits<{
  select: [file: File];
  remove: [];
}>();

const inputRef = ref<{ $el?: unknown }>();

function openPicker() {
  const input = inputRef.value?.$el;

  if (input instanceof HTMLInputElement) {
    input.click();
  }
}

function handleChange(event: Event) {
  // SAFETY: bound to `@change` on the file input itself.
  const input = event.target as HTMLInputElement;
  const file = input.files?.item(0);

  if (!file) {
    return;
  }

  emit("select", file);
  input.value = "";
}
</script>

<template>
  <UiFormField v-slot="{ meta }" :name="name">
    <UiFormItem>
      <div class="flex items-center justify-between gap-2">
        <UiFormLabel :required="meta.required">{{ label }}</UiFormLabel>
        <UiButton
          v-if="removable && previewUrl"
          type="button"
          variant="ghost"
          size="xs"
          class="text-muted-foreground"
          :disabled="disabled"
          @click="emit('remove')"
        >
          <Trash2Icon />
          <span>Hapus</span>
        </UiButton>
      </div>

      <UiFormControl>
        <UiInput
          ref="inputRef"
          type="file"
          accept=".jpg,.jpeg,.png"
          class="hidden"
          :disabled="disabled"
          @change="handleChange"
        />
      </UiFormControl>

      <button
        type="button"
        class="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed bg-muted/50 transition-colors hover:border-[#4B3D2A]/40 hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="disabled"
        @click="openPicker"
      >
        <img
          v-if="previewUrl"
          :src="previewUrl"
          alt=""
          class="size-full object-cover"
        />
        <span
          v-else
          class="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <ImagePlusIcon class="size-6" aria-hidden="true" />
          <span class="text-sm">Pilih gambar</span>
          <span class="text-xs">JPG atau PNG, lanskap</span>
        </span>

        <span
          v-if="previewUrl"
          class="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <LoaderCircleIcon v-if="disabled" class="mr-2 size-4 animate-spin" />
          {{ disabled ? "Mengunggah…" : "Ganti gambar" }}
        </span>
      </button>

      <UiFormMessage />
    </UiFormItem>
  </UiFormField>
</template>
