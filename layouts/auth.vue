<script lang="ts" setup>
import { SidebarProvider } from "~/components/ui/sidebar"
import AppSidebar from "~/components/AdminSidebar.vue"
import { Toaster } from "~/components/ui/sonner"

useHead({
	title: "LSM Dashboard",
})
</script>

<template>
	<client-only>
		<SidebarProvider>
			<Toaster
				position="top-right"
				:duration="2000"
				rich-colors
			/>
			<AppSidebar />
			<ClientOnly>
				<main class="flex flex-col w-full min-h-full m-4">
					<slot />
				</main>
			</ClientOnly>
		</SidebarProvider>
	</client-only>
</template>
