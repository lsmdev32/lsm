<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  redirect: "/dashboard/blogs",
});
</script>

<template>
  <div>Index</div>
</template>
