<script setup lang="ts">
import { ref as dbRef, set as dbSet, getDatabase } from "@firebase/database";
import { toast } from "vue-sonner";

import { RTDB_KEYS } from "~/lib/constants";
import { cn } from "~/lib/utils";

interface Props {
  id: string;
  type: string;
  fullname: string;
  linkedinUrl: string;
  email: string;
  ppUrl: string;
}

type Emits = (
  event: "click-delete",
  payload: { id: string; fullname: string }
) => void;

const emit = defineEmits<Emits>();
const props = withDefaults(defineProps<Props>(), {});

async function handleSetOrderHome(id: string, order: number) {
  const staffRef = dbRef(
    getDatabase(),
    `${RTDB_KEYS.HOME_ATTORNEY_ORDER}/${order}`
  );

  await dbSet(staffRef, id)
    .then(() => {
      toast.success(`Berhasil mengatur urutan home`);
    })
    .catch(() => {
      toast.error(`Gagal mengatur urutan home`);
    });
}

async function handleSetOrderPracticeAreas(id: string, order: number) {
  const staffRef = dbRef(
    getDatabase(),
    `${RTDB_KEYS.PRACTICE_AREA_ATTORNEY_ORDER}/${order}`
  );

  await dbSet(staffRef, id)
    .then(() => {
      toast.success(`Berhasil mengatur urutan practice area`);
    })
    .catch(() => {
      toast.error(`Gagal mengatur urutan practice area`);
    });
}
</script>

<template>
  <div
    :class="
      cn(
        'flex h-[340px] w-64 flex-col items-center rounded-lg border bg-white bg-gradient-to-br from-white to-orange-100 p-4 shadow-sm'
      )
    "
  >
    <div class="self-end hover:opacity-50">
      <UiDropdownMenu>
        <UiDropdownMenuTrigger>
          <div class="group flex items-center">
            <Icon name="material-symbols:action-key" size="16" />
            <span class="hidden text-sm group-hover:block">Menu</span>
          </div>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent>
          <UiDropdownMenuLabel>Menu</UiDropdownMenuLabel>
          <UiDropdownMenuItem>
            <NuxtLink :to="`/dashboard/profiles/${props.id}/edit`">
              <Icon name="mdi:pencil" /> Ubah Profil
            </NuxtLink>
          </UiDropdownMenuItem>
          <UiDropdownMenuItem
            @click="
              emit('click-delete', { id: props.id, fullname: props.fullname })
            "
          >
            <Icon name="mdi:trash" /> Hapus
          </UiDropdownMenuItem>
          <UiDropdownMenuSub>
            <UiDropdownMenuSubTrigger>
              <span>Set Urutan Home</span>
            </UiDropdownMenuSubTrigger>
            <UiDropdownMenuPortal>
              <UiDropdownMenuSubContent>
                <UiDropdownMenuItem
                  v-for="i in 4"
                  :key="i"
                  @click="handleSetOrderHome(props.id, i - 1)"
                >
                  <span>Ke - {{ i }}</span>
                </UiDropdownMenuItem>
              </UiDropdownMenuSubContent>
            </UiDropdownMenuPortal>
          </UiDropdownMenuSub>
          <UiDropdownMenuSub>
            <UiDropdownMenuSubTrigger>
              <span>Set Urutan Practice Area</span>
            </UiDropdownMenuSubTrigger>
            <UiDropdownMenuPortal>
              <UiDropdownMenuSubContent>
                <UiDropdownMenuItem
                  v-for="i in 4"
                  :key="i"
                  @click="handleSetOrderPracticeAreas(props.id, i - 1)"
                >
                  <span>Ke - {{ i }}</span>
                </UiDropdownMenuItem>
              </UiDropdownMenuSubContent>
            </UiDropdownMenuPortal>
          </UiDropdownMenuSub>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>
    <NuxtImg
      :src="props.ppUrl"
      alt="Profile"
      class="mb-4 flex size-36 items-center justify-center rounded-full object-cover"
    />
    <div class="mb-4">
      <span
        class="rounded-full bg-orange-300 p-2 text-xs font-bold tracking-wide text-black capitalize"
        >{{ type.replaceAll("_", " ") }}</span
      >
    </div>
    <div class="mb-2 flex items-center gap-2 [&_a]:cursor-pointer">
      <NuxtLink
        :to="`mailto:${props.email}`"
        class="flex cursor-pointer items-center gap-x-2 text-sm text-gray-500 hover:cursor-pointer hover:underline"
      >
        <Icon name="material-symbols:mail-outline" size="28" />
      </NuxtLink>
      <NuxtLink
        :to="props.linkedinUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-x-2 text-sm text-blue-600 hover:underline"
      >
        <Icon name="devicon:linkedin" size="24" />
      </NuxtLink>
    </div>
    <div
      class="mb-1 line-clamp-2 truncate text-center text-sm font-semibold text-wrap text-ellipsis"
    >
      {{ props.fullname }}
    </div>
  </div>
</template>
