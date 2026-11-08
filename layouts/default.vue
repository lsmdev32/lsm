<script setup lang="ts">
import Footer from "~/components/audience/footer.vue";
import Navbar from "~/components/audience/navbar.vue";
</script>

<template>
  <div class="flex w-full flex-col">
    <Navbar />
    <main class="flex min-h-screen w-full flex-col pt-20">
      <slot />
    </main>
    <Footer />
  </div>
</template>
