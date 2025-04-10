<script lang="ts" setup>
import { SidebarProvider } from "~/components/ui/sidebar"
import AppSidebar from "~/components/AdminSidebar.vue"
</script>

<template>
	<SidebarProvider>
		<AppSidebar />
		<main class="flex flex-col w-full min-h-full m-4">
			<slot />
		</main>
	</SidebarProvider>
</template>
