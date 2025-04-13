<script lang="ts" setup>
import { SidebarProvider } from "~/components/ui/sidebar"
import AppSidebar from "~/components/AdminSidebar.vue"
import { Toaster } from "~/components/ui/sonner"
</script>

<template>
	<SidebarProvider>
		<Toaster
			position="top-right"
			:duration="2000"
		/>
		<AppSidebar />
		<ClientOnly>
			<main class="flex flex-col w-full min-h-full m-4">
				<slot />
			</main>
		</ClientOnly>
	</SidebarProvider>
</template>
