<script setup lang="ts">
import { Check, Search, XIcon } from "lucide-vue-next";

import { cn } from "@/lib/utils";

type Emits = (ev: "select", value?: string | null) => void;

const emit = defineEmits<Emits>();

interface Props {
  items?: {
    label: string;
    value: string;
  }[];
  selected?: string;
  placeholder?: string;
  emptyPlaceholderText?: string;
}

const {
  items = [],
  selected = "",
  placeholder = "Select an item...",
  emptyPlaceholderText = "No items found",
} = defineProps<Props>();

const selectedItem = defineModel<string>();

function onClear() {
  selectedItem.value = "";
  emit("select", null);
}
</script>

<template>
  <UiCombobox by="label" class="w-full">
    <UiComboboxAnchor class="w-full">
      <div class="relative w-full max-w-sm items-center">
        <UiComboboxInput
          v-model:model-value="selectedItem"
          class="pr-9 pl-9"
          :display-value="(val) => val?.label ?? ''"
          :placeholder="placeholder"
        />
        <span
          class="absolute inset-y-0 start-0 flex items-center justify-center px-3"
        >
          <Search class="size-4 text-muted-foreground" />
        </span>
        <!-- Clear button -->
        <button
          v-if="selectedItem"
          type="button"
          class="absolute inset-y-0 end-0 flex items-center justify-center px-3 text-muted-foreground hover:text-foreground focus:outline-none"
          tabindex="-1"
          aria-label="Clear selection"
          @click="onClear"
        >
          <XIcon :size="16" />
        </button>
      </div>
    </UiComboboxAnchor>

    <UiComboboxList class="w-full">
      <UiComboboxEmpty class="w-full px-4">
        {{ emptyPlaceholderText }}
      </UiComboboxEmpty>

      <UiComboboxGroup class="w-full">
        <UiComboboxItem
          v-for="item in items"
          :key="item.value"
          class="px-2"
          :value="item"
          @select="$emit('select', item.value)"
        >
          {{ item.label }}

          <UiComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </UiComboboxItemIndicator>
        </UiComboboxItem>
      </UiComboboxGroup>
    </UiComboboxList>
  </UiCombobox>
</template>
