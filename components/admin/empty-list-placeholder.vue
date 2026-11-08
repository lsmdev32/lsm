<script setup lang="ts">
import { InboxIcon } from "lucide-vue-next";

interface Props {
  itemName?: string;
  description?: string;
}

const {
  itemName = "data",
  description = "Belum ada yang bisa ditampilkan di sini.",
} = defineProps<Props>();
</script>

<template>
  <div
    class="flex flex-col items-center justify-center gap-2 px-6 py-14 text-center"
  >
    <span
      class="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground"
    >
      <InboxIcon class="size-5" aria-hidden="true" />
    </span>
    <p class="text-sm font-medium">Belum ada {{ itemName }}</p>
    <p class="max-w-xs text-sm text-muted-foreground">{{ description }}</p>
  </div>
</template>
