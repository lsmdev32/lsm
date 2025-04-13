<script setup lang="ts">
import { PATH_NAMES } from "~/lib/constants"

definePageMeta({
	middleware: ["auth"],
	redirect(_) {
		return {
			path: PATH_NAMES.BLOGS,
		}
	},
})
</script>

<template>
	<div>Index</div>
</template>
