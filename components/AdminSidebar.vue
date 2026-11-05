<script setup lang="ts">
import { signOut } from "firebase/auth";
import {
  ChevronUp,
  Inbox,
  Pencil,
  Notebook,
  User,
  UserPlus,
  PlusSquareIcon,
} from "lucide-vue-next";
import type { FunctionalComponent } from "vue";
import { toast } from "vue-sonner";

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
} from "@/components/ui/sidebar";
import LogoSVG from "~/assets/images/logo.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface SidebarItem {
  title: string;
  path: string;
  icon: FunctionalComponent;
  submenus?: Omit<SidebarItem, "submenus">[];
}

const items: SidebarItem[] = [
  {
    title: "Blogs",
    path: "/dashboard/blogs",
    icon: Pencil,
    submenus: [
      {
        title: "Buat blog baru",
        icon: PlusSquareIcon,
        path: "/dashboard/blogs/create",
      },
    ],
  },
  {
    title: "Publikasi",
    path: "/dashboard/publications",
    icon: Notebook,
    submenus: [
      {
        title: "Buat publikasi baru",
        icon: PlusSquareIcon,
        path: "/dashboard/publications/create",
      },
    ],
  },
  {
    title: "Kategori Konten",
    path: "/dashboard/categories",
    icon: Inbox,
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
    ],
  },
];

const auth = useFirebaseAuth();

const username = auth?.currentUser?.email?.split("@").at(0) ?? "";

async function _signOut() {
  if (!auth) {
    return;
  }

  await signOut(auth)
    .then(() => {
      toast.success("Sign out successful!", { dismissible: true });
      navigateTo("/login");
    })
    .catch((_) => {
      toast.error("Sign out failed!", {
        dismissible: true,
        closeButton: true,
      });
    });
}
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarHeader class="flex flex-row items-center justify-center">
        <NuxtLink to="/dashboard">
          <NuxtImg :src="LogoSVG" class="aspect-square size-[75px]" />
        </NuxtLink>
      </SidebarHeader>
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton
                as-child
                :class="
                  $route.path.includes(item.path)
                    ? 'border-opacity-45 bg-opacity-50 rounded-full border border-black'
                    : ''
                "
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
              <SidebarMenuButton
                class="flex items-center justify-between truncate"
              >
                {{ username }}
                <ChevronUp class="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              class="w-(--reka-popper-anchor-width)"
            >
              <DropdownMenuItem v-if="!!auth" @click="_signOut">
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
