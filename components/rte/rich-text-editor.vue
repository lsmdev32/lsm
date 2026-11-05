<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill";

import "@vueup/vue-quill/dist/vue-quill.snow.css";

interface Props {
  class?: string;
  disabled?: boolean;
  initialValue?: string;
}

type Emits = (key: "handleChange", value: string) => void;

const {
  class: className = "",
  disabled = false,
  initialValue = "",
} = defineProps<Props>();

defineEmits<Emits>();
</script>

<template>
  <ClientOnly fallback="Loading...">
    <quill-editor
      :content="initialValue"
      :class="['mb-40 min-h-[50px]', className, disabled ? 'opacity-40' : '']"
      :enable="!disabled"
      :toolbar="[
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ]"
      :read-only="disabled"
      content-type="html"
      @update:content="$emit('handleChange', $event)"
    />
  </ClientOnly>
</template>
