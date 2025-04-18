<script setup lang="ts">
import { Button } from "~/components/ui/button"
import Navbar from "~/components/audience/Navbar.vue"
</script>

<template lang="html">
	<div class="h-[200vh]">
		<Navbar />
		<p class="text-blue-500 font-bold italic">
			Hello World
		</p>
		<Button>Test</Button>
		<p> Test</p>
	</div>
</template>
