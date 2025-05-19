<script setup lang="ts">
import type { FunctionalComponent } from "vue"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"

type Props = {
	// open?: boolean
	title?: string
	actions?: Array<{
		label: string
		icon?: FunctionalComponent
		iconClass?: string
		onClick?(...args: unknown[]): void
		href?: string
	}>
}

withDefaults(defineProps<Props>(), {
	title: "Actions",
	// open: false,
	actions: () => [],
})
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger>
			<Icon
				name="mage:dots"
				size="24"
			/>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="flex flex-col">
			<DropdownMenuLabel>
				{{ title }}
			</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuItem
				v-for="item in actions"
				:key="item.label"
				:as="item.href ? 'a' : 'button'"
				:href="item.href"
				class="w-full flex items-center gap-x-2 cursor-pointer"
				@click="item.onClick"
			>
				<component
					:is="item.icon"
					size="24"
					:class="item.iconClass"
				/>
				{{ item.label }}
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
