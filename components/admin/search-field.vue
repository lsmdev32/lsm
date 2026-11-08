<script setup lang="ts">
import { SearchIcon, XIcon } from "lucide-vue-next";

interface Props {
  placeholder?: string;
  disabled?: boolean;
}

const { placeholder = "Cari…", disabled = false } = defineProps<Props>();

const model = defineModel<string>({ default: "" });
</script>

<template>
  <div class="relative w-full">
    <SearchIcon
      class="pointer-events-none absolute inset-y-0 left-3 my-auto size-4 text-muted-foreground"
      aria-hidden="true"
    />
    <UiInput
      v-model="model"
      type="search"
      :placeholder="placeholder"
      :disabled="disabled"
      class="pl-9"
    />
    <button
      v-if="model"
      type="button"
      class="absolute inset-y-0 right-0 flex w-9 items-center justify-center text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
      aria-label="Bersihkan pencarian"
      tabindex="-1"
      @click="model = ''"
    >
      <XIcon class="size-4" />
    </button>
  </div>
</template>
