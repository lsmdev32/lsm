<script setup lang="ts">
interface Props {
  placeholder?: string;
  initialValues?: string[];
}

interface Emits {
  (ev: "add-tag", tag: string): void;
  (ev: "onChange", value: string[]): void;
}

defineEmits<Emits>();

const { placeholder = "Tambahkan tag...", initialValues = [] } =
  defineProps<Props>();

function convertValue(value: string): string {
  return (
    value
      .trim()
      .toLowerCase()
      // Remove special characters
      .replaceAll(/[^a-z0-9\s-]/gu, "")
      // Replace spaces with hyphens
      .replaceAll(/\s+/gu, "-")
  );
}
</script>

<template>
  <UiTagsInput
    class="w-full"
    :model-value="initialValues"
    :convert-value="convertValue"
    @add-tag="$emit('add-tag', $event as string)"
    @update:model-value="$emit('onChange', $event as string[])"
  >
    <UiTagsInputItem v-for="item in initialValues" :key="item" :value="item">
      <UiTagsInputItemText />
      <UiTagsInputItemDelete />
    </UiTagsInputItem>

    <UiTagsInputInput :placeholder="placeholder" />
  </UiTagsInput>
</template>
