<script setup lang="ts">
import { ChevronUp, Inbox, Pencil, Tags, Notebook, User, UserPlus, ListOrdered } from "lucide-vue-next"
import { signOut } from "firebase/auth"
import { toast } from "vue-sonner"
import type { FunctionalComponent } from "vue"
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

type SidebarItem = {
	title: string
	path: string
	icon: FunctionalComponent
	submenus?: Omit<SidebarItem, "submenus">[]
}

const items: SidebarItem[] = [
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
		title: "Profil staff",
		path: "/dashboard/profiles",
		icon: User,
		submenus: [
			{
				title: "Tambahkan profil",
				icon: UserPlus,
				path: "/dashboard/profiles/create",
			},
			{
				title: "Atur susunan profil",
				icon: ListOrdered,
				path: "/dashboard/profiles/order-settings",
			},
		],
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
						>
							<SidebarMenuButton
								as-child
								:class="$route.path.includes(item.path) ? 'border border-black border-opacity-45 rounded-full bg-opacity-50' : ''"
							>
								<NuxtLink :to="item.path">
									<component :is="item.icon" />
									<span class="capitalize">{{ item.title }}</span>
								</NuxtLink>
							</SidebarMenuButton>
							<UiSidebarMenuSub v-if="item.submenus">
								<UiSidebarMenuSubItem
									v-for="subItem in item.submenus"
									:key="subItem.title"
								>
									<NuxtLink :to="subItem.path">
										<UiSidebarMenuSubButton>
											<component :is="subItem.icon" />
											<span class="capitalize">{{ subItem.title }}</span>
										</UiSidebarMenuSubButton>
									</NuxtLink>
								</UiSidebarMenuSubItem>
							</UiSidebarMenuSub>
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
