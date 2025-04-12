<script setup lang="ts">
import { ChevronUp, Inbox, Pencil, Tags } from "lucide-vue-next"
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"

const items = [
	{
		title: "Blog and Publications",
		path: "/dashboard/blogs",
		icon: Pencil,
	},
	{
		title: "Content Category",
		path: "/dashboard/categories",
		icon: Inbox,
	},
	{
		title: "Content Tags",
		path: "/dashboard/tags",
		icon: Tags,
	},
]
</script>

<template>
	<SidebarTrigger />
	<Sidebar>
		<SidebarContent>
			<SidebarHeader class="flex flex-row items-center justify-center">
				<NuxtLink to="/dashboard">
					<NuxtImg
						src="/lsm.svg"
						class="aspect-square"
					/>
				</NuxtLink>
			</SidebarHeader>
			<SidebarGroup>
				<SidebarGroupLabel>Menu</SidebarGroupLabel>
				<SidebarGroupContent>
					<SidebarMenu>
						<SidebarMenuItem
							v-for="item in items"
							:key="item.title"
							:class="$route.path.includes(item.path) ? 'border border-black border-opacity-45 rounded-full bg-opacity-50' : ''"
						>
							<SidebarMenuButton as-child>
								<a :href="item.path">
									<component :is="item.icon" />
									<span>{{ item.title }}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroupContent>
			</SidebarGroup>
		</SidebarContent>
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger as-child>
							<SidebarMenuButton>
								<User2 /> Username
								<ChevronUp class="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="top"
							class="w-[--reka-popper-anchor-width]"
						>
							<DropdownMenuItem>
								<span>Account</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Billing</span>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	</Sidebar>
</template>
