<script setup lang="ts">
import { signOut } from "firebase/auth";
import {
  ChevronsUpDown,
  ExternalLink,
  FolderIcon,
  LogOut,
  PenLine,
  PlusIcon,
  SlidersHorizontal,
  UserRound,
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import LogoSVG from "~/assets/images/logo-lsm-main.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

interface NavItem {
  label: string;
  to: string;
  icon: FunctionalComponent;
  create?: { label: string; to: string };
}

const items: NavItem[] = [
  {
    label: "Blog",
    to: "/dashboard/blogs",
    icon: PenLine,
    create: { label: "Blog baru", to: "/dashboard/blogs/create" },
  },
  {
    label: "Publikasi",
    to: "/dashboard/publications",
    icon: FolderIcon,
    create: { label: "Publikasi baru", to: "/dashboard/publications/create" },
  },
  {
    label: "Kategori",
    to: "/dashboard/categories",
    icon: FolderIcon,
  },
  {
    label: "Profil Organisasi",
    to: "/dashboard/profiles",
    icon: UserRound,
    create: { label: "Profil baru", to: "/dashboard/profiles/create" },
  },
  {
    label: "Pengaturan Halaman",
    to: "/dashboard/page-settings",
    icon: SlidersHorizontal,
  },
];

const route = useRoute();
const auth = useFirebaseAuth();
const user = useCurrentUser();

const email = computed(() => user.value?.email ?? "");
const accountLabel = computed(() => email.value || "Akun");
const initial = computed(() => email.value.charAt(0).toUpperCase() || "A");

function isActive(to: string) {
  return route.path === to || route.path.startsWith(`${to}/`);
}

async function signOutUser() {
  if (!auth) {
    return;
  }

  try {
    await signOut(auth);
  } catch {
    toast.error("Gagal keluar. Coba lagi.");

    return;
  }

  void navigateTo("/login");
}
</script>

<template>
  <Sidebar collapsible="icon">
    <SidebarHeader class="p-2">
      <NuxtLink
        to="/dashboard"
        class="flex h-12 items-center justify-center rounded-md transition-colors hover:bg-sidebar-accent"
        aria-label="Dashboard"
      >
        <img
          :src="LogoSVG"
          alt="Lubis Santosa &amp; Partners"
          width="221"
          height="44"
          class="h-7 w-auto max-w-full object-contain group-data-[collapsible=icon]:size-6 group-data-[collapsible=icon]:object-cover group-data-[collapsible=icon]:object-left"
        />
      </NuxtLink>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Konten</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.to">
              <SidebarMenuButton
                as-child
                :is-active="isActive(item.to)"
                :tooltip="item.label"
              >
                <NuxtLink :to="item.to">
                  <component :is="item.icon" />
                  <span class="group-data-[collapsible=icon]:hidden">
                    {{ item.label }}
                  </span>
                </NuxtLink>
              </SidebarMenuButton>

              <SidebarMenuSub v-if="item.create && isActive(item.to)">
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton
                    as-child
                    :is-active="route.path === item.create.to"
                  >
                    <NuxtLink :to="item.create.to">
                      <PlusIcon />
                      <span>{{ item.create.label }}</span>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
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
              <SidebarMenuButton size="lg" class="justify-between">
                <span
                  class="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#4B3D2A] text-xs font-semibold text-white"
                >
                  {{ initial }}
                </span>
                <span
                  class="truncate text-sm group-data-[collapsible=icon]:hidden"
                >
                  {{ accountLabel }}
                </span>
                <ChevronsUpDown
                  class="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden"
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              align="start"
              class="w-(--reka-popper-anchor-width) min-w-56"
            >
              <DropdownMenuLabel class="truncate text-xs font-normal">
                {{ email || "Belum masuk" }}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem as-child>
                <NuxtLink to="/" target="_blank" rel="noopener noreferrer">
                  <ExternalLink class="size-4" />
                  <span>Lihat situs</span>
                </NuxtLink>
              </DropdownMenuItem>
              <DropdownMenuItem class="text-destructive" @click="signOutUser">
                <LogOut class="size-4" />
                <span>Keluar</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  </Sidebar>
</template>
