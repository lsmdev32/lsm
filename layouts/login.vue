<script lang="ts" setup>
import LoadingPage from "~/components/LoadingPage.vue";

const indicator = useLoadingIndicator();
</script>

<template>
  <LoadingPage v-if="indicator.isLoading.value" />
  <NuxtPage v-else />
</template>
