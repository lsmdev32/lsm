<script setup lang="ts">
import type { FunctionalComponent } from "vue";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface TableActionItem {
  label: string;
  icon?: FunctionalComponent;
  iconClass?: string;
  onClick?: (...args: unknown[]) => void;
  href?: string;
}

interface Props {
  title?: string;
  actions?: TableActionItem[];
  disabled?: boolean;
}

const {
  title = "Actions",
  actions = [],
  disabled = false,
} = defineProps<Props>();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger :disabled="disabled">
      <Icon name="mage:dots" size="24" />
    </DropdownMenuTrigger>
    <DropdownMenuContent class="flex flex-col">
      <DropdownMenuLabel>
        {{ title }}
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        v-for="item in actions"
        :key="item.label"
        :as="item.href ? 'a' : 'button'"
        :href="item.href"
        class="flex w-full cursor-pointer items-center gap-x-2"
        @click="item.onClick"
      >
        <component :is="item.icon" size="24" :class="item.iconClass" />
        {{ item.label }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
