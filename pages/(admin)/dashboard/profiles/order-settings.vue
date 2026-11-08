<script setup lang="ts">
import { ArrowUpDown } from "lucide-vue-next";

definePageMeta({
  layout: "auth",
  middleware: ["auth"],
});
</script>

<template>
  <AdminPage
    page-title="Susunan profil"
    description="Atur urutan advokat yang tampil di halaman home dan practice area."
  >
    <UiCard>
      <UiCardContent class="flex flex-col gap-3 p-6">
        <p class="text-sm text-muted-foreground">
          Urutan diatur dari menu tiap profil di halaman
          <NuxtLink
            to="/dashboard/profiles"
            class="underline underline-offset-4"
          >
            Profil
          </NuxtLink>
          — pilih <span class="font-medium">Posisi 1–4</span>.
        </p>
        <UiButton variant="outline" size="sm" class="w-fit" as-child>
          <NuxtLink to="/dashboard/profiles">
            <ArrowUpDown />
            <span>Buka daftar profil</span>
          </NuxtLink>
        </UiButton>
      </UiCardContent>
    </UiCard>
  </AdminPage>
</template>
