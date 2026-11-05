<script setup lang="ts">
import Footer from "~/components/audience/Footer.vue";
import Navbar from "~/components/audience/Navbar.vue";
</script>

<template>
  <div class="flex w-full flex-col">
    <Navbar />
    <main class="flex min-h-screen w-full flex-col pt-[80px]">
      <slot />
    </main>
    <Footer />
  </div>
</template>
