<script setup lang="ts">
import {
  UiAlertDialog,
  UiAlertDialogAction,
  UiAlertDialogCancel,
  UiAlertDialogContent,
  UiAlertDialogDescription,
  UiAlertDialogFooter,
  UiAlertDialogHeader,
  UiAlertDialogTitle,
} from "#components";
import { useConfirmDialogState } from "~/composables/use-confirm";

const { request, accept, cancel, handleOpenChange } = useConfirmDialogState();

const isOpen = computed(() => request.value !== null);
</script>

<template>
  <UiAlertDialog :open="isOpen" @update:open="handleOpenChange">
    <UiAlertDialogContent>
      <UiAlertDialogHeader>
        <UiAlertDialogTitle>{{ request?.title }}</UiAlertDialogTitle>
        <UiAlertDialogDescription v-if="request?.description">
          {{ request.description }}
        </UiAlertDialogDescription>
      </UiAlertDialogHeader>
      <UiAlertDialogFooter>
        <UiAlertDialogCancel @click="cancel">
          {{ request?.cancelLabel ?? "Batal" }}
        </UiAlertDialogCancel>
        <UiAlertDialogAction
          :class="
            request?.tone === 'destructive'
              ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
              : undefined
          "
          @click="accept"
        >
          {{ request?.confirmLabel ?? "Ya, lanjutkan" }}
        </UiAlertDialogAction>
      </UiAlertDialogFooter>
    </UiAlertDialogContent>
  </UiAlertDialog>
</template>
