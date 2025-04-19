<script setup lang="ts">
import Footer from "~/components/audience/Footer.vue"
import Navbar from "~/components/audience/Navbar.vue"
</script>

<template>
	<div class="w-full flex flex-col">
		<Navbar />
		<main class="w-full flex flex-col min-h-screen">
			<slot />
		</main>
		<Footer />
	</div>
</template>
