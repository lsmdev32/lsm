<script setup lang="ts">
definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});
</script>

<template>
  <AdminPage page-title="Pengaturan Susunan Profil">
    <div class="flex flex-col">
      <div class="flex flex-col gap-4">
        <p class="text-xl">Profil halaman home</p>
      </div>
    </div>
  </AdminPage>
</template>
