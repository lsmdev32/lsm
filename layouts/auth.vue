<script lang="ts" setup>
import AppSidebar from "~/components/AdminSidebar.vue";
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
      <AppSidebar />
      <SidebarInset class="min-w-0">
        <div class="flex flex-1 flex-col gap-2 p-4">
          <SidebarTrigger class="-mt-1 -ml-1" />
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </client-only>
</template>
