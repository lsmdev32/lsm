<script lang="ts" setup>
import AppSidebar from "~/components/admin-sidebar.vue";
import ConfirmDialog from "~/components/confirm-dialog.vue";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { Toaster } from "~/components/ui/sonner";

useHead({
  title: "LSM Dashboard",
});
</script>

<template>
  <client-only>
    <SidebarProvider>
      <Toaster position="top-right" :duration="2000" rich-colors />
      <ConfirmDialog />
      <AppSidebar />
      <SidebarInset class="min-w-0">
        <header
          class="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b bg-background/85 px-4 backdrop-blur md:px-6"
        >
          <SidebarTrigger class="-ml-2" />
          <span class="h-5 w-px bg-border" aria-hidden="true" />
          <p class="text-sm font-medium text-muted-foreground">Panel admin</p>
        </header>
        <div class="flex flex-1 flex-col px-4 py-6 md:px-6 lg:px-8">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </client-only>
</template>
