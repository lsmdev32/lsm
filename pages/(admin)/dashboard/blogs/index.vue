<script setup lang="ts">
definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})
</script>

<template>
	<AdminPage page-title="Blogs">
		<p>Test Blog</p>
	</AdminPage>
</template>
