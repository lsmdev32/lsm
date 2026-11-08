<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});

useHead({ title: "Tag · LSM Dashboard" });
</script>

<template>
  <AdminPage
    page-title="Tag"
    description="Tag ditulis langsung di setiap blog atau publikasi."
  >
    <UiCard>
      <UiCardContent class="flex flex-col gap-3 p-6">
        <p class="text-sm text-muted-foreground">
          Belum ada pengelolaan tag terpisah. Tambahkan tag saat membuat atau
          mengubah konten, lalu konten dapat disaring berdasarkan tag di situs
          publik.
        </p>
        <div class="flex flex-wrap gap-2">
          <UiButton variant="outline" size="sm" as-child>
            <NuxtLink to="/dashboard/blogs">Kelola blog</NuxtLink>
          </UiButton>
          <UiButton variant="outline" size="sm" as-child>
            <NuxtLink to="/dashboard/publications">Kelola publikasi</NuxtLink>
          </UiButton>
        </div>
      </UiCardContent>
    </UiCard>
  </AdminPage>
</template>
