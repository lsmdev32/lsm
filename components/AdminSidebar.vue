<script setup lang="ts">
import { ChevronUp, Inbox, Pencil, Tags, Notebook, User } from "lucide-vue-next"
import { signOut } from "firebase/auth"
import { toast } from "vue-sonner"
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
import LogoSVG from "~/assets/images/logo.svg"

const items = [
	{
		title: "Blogs",
		path: "/dashboard/blogs",
		icon: Pencil,
	},
	{
		title: "Publications",
		path: "/dashboard/publications",
		icon: Notebook,
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
	{
		title: "Staffs",
		path: "/dashboard/staffs",
		icon: User,
	},
]

const auth = useFirebaseAuth()
const username = auth?.currentUser?.email?.split("@")
	.at(0) ?? ""

async function _signOut() {
	if (!auth) return

	await signOut(auth)
		.then(() => {
			toast.success("Sign out successful!", { dismissible: true })
			navigateTo("/login")
		})
		.catch((_) => {
			toast.error("Sign out failed!", {
				dismissible: true,
				closeButton: true,
			})
		})
}
</script>

<template>
	<SidebarTrigger />
	<Sidebar>
		<SidebarContent>
			<SidebarHeader class="flex flex-row items-center justify-center">
				<NuxtLink to="/dashboard">
					<NuxtImg
						:src="LogoSVG"
						class="aspect-square size-[75px]"
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
							<SidebarMenuButton class="truncate flex items-center justify-between">
								{{ username }}
								<ChevronUp class="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="top"
							class="w-[--reka-popper-anchor-width]"
						>
							<DropdownMenuItem
								v-if="!!auth"
								@click="_signOut"
							>
								<span>Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	</Sidebar>
</template>
