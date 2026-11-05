<script lang="ts" setup>
import AppSidebar from "~/components/AdminSidebar.vue";
import { SidebarProvider } from "~/components/ui/sidebar";
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
      <ClientOnly>
        <main class="m-4 flex min-h-full w-full flex-col">
          <slot />
        </main>
      </ClientOnly>
    </SidebarProvider>
  </client-only>
</template>
