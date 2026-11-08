<script setup lang="ts">
import { FilterXIcon } from "lucide-vue-next";

interface Props {
  disabled?: boolean;
}

const { disabled = false } = defineProps<Props>();

const emit = defineEmits<{ clear: [] }>();
</script>

<template>
  <UiButton
    variant="outline"
    :disabled="disabled"
    title="Hapus semua filter"
    @click="emit('clear')"
  >
    <FilterXIcon />
    <span>Hapus filter</span>
  </UiButton>
</template>
