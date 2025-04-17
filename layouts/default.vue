<script setup lang="ts">
import Footer from "~/components/audience/Footer.vue"
</script>

<template>
	<div class="w-full flex flex-col">
		<!-- add navbar disini -->
		<main class="w-full flex flex-col min-h-screen">
			<slot />
		</main>
		<Footer />
	</div>
</template>
