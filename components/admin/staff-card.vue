<script setup lang="ts">
import { ref as dbRef, set as dbSet, getDatabase } from "@firebase/database";
import {
  ExternalLinkIcon,
  MailIcon,
  MoreHorizontalIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-vue-next";
import { toast } from "vue-sonner";

import { RTDB_KEYS } from "~/lib/constants";

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
const { id, type, fullname, linkedinUrl, email, ppUrl } = defineProps<Props>();

function rankLabelOf(value: string) {
  switch (value) {
    case "founder": {
      return "Founder";
    }

    case "partner": {
      return "Partner";
    }

    case "associate": {
      return "Associate";
    }

    case "of_counsel": {
      return "Of Counsel";
    }

    default: {
      return value.replaceAll("_", " ");
    }
  }
}

const rankLabel = computed(() => rankLabelOf(type));

async function setOrder(
  key: string,
  staffId: string,
  order: number,
  label: string
) {
  try {
    await dbSet(dbRef(getDatabase(), `${key}/${order}`), staffId);
  } catch {
    toast.error(`Gagal mengatur urutan ${label}`);

    return;
  }

  toast.success(`Urutan ${label} diperbarui`);
}

function handleSetOrderHome(staffId: string, order: number) {
  return setOrder(RTDB_KEYS.HOME_ATTORNEY_ORDER, staffId, order, "home");
}

function handleSetOrderPracticeAreas(staffId: string, order: number) {
  return setOrder(
    RTDB_KEYS.PRACTICE_AREA_ATTORNEY_ORDER,
    staffId,
    order,
    "practice area"
  );
}
</script>

<template>
  <article
    class="group relative flex h-full flex-col items-center gap-3 rounded-xl border bg-card px-5 pt-6 pb-4 text-center shadow-sm transition-shadow hover:shadow-md"
  >
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton
          variant="ghost"
          size="icon"
          class="absolute top-2 right-2 size-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          :aria-label="`Menu ${fullname}`"
        >
          <MoreHorizontalIcon />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent align="end" class="w-56">
        <UiDropdownMenuItem as-child>
          <NuxtLink :to="`/dashboard/profiles/${id}/edit`">
            <PencilIcon />
            <span>Ubah profil</span>
          </NuxtLink>
        </UiDropdownMenuItem>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuLabel class="text-xs font-normal text-muted-foreground">
          Urutan home
        </UiDropdownMenuLabel>
        <UiDropdownMenuItem
          v-for="i in 4"
          :key="`home-${i}`"
          @click="handleSetOrderHome(id, i - 1)"
        >
          <span>Posisi {{ i }}</span>
        </UiDropdownMenuItem>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuLabel class="text-xs font-normal text-muted-foreground">
          Urutan practice area
        </UiDropdownMenuLabel>
        <UiDropdownMenuItem
          v-for="i in 4"
          :key="`pa-${i}`"
          @click="handleSetOrderPracticeAreas(id, i - 1)"
        >
          <span>Posisi {{ i }}</span>
        </UiDropdownMenuItem>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem
          class="text-destructive"
          @click="emit('click-delete', { id, fullname })"
        >
          <Trash2Icon />
          <span>Hapus profil</span>
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>

    <UiAvatar class="size-24 shrink-0 ring-1 ring-border">
      <UiAvatarImage :src="ppUrl" :alt="fullname" />
      <UiAvatarFallback
        class="bg-[#4B3D2A]/10 text-2xl font-medium text-[#4B3D2A]"
      >
        {{ fullname.charAt(0) }}
      </UiAvatarFallback>
    </UiAvatar>

    <div class="flex w-full min-w-0 flex-col items-center gap-1.5">
      <h2
        class="line-clamp-2 text-base leading-snug font-medium text-balance"
        :title="fullname"
      >
        {{ fullname }}
      </h2>
      <UiBadge variant="secondary" class="font-normal">{{ rankLabel }}</UiBadge>
    </div>

    <div class="mt-auto flex items-center gap-1 pt-1">
      <UiButton
        variant="ghost"
        size="icon"
        as-child
        class="size-8 text-muted-foreground"
      >
        <a :href="`mailto:${email}`">
          <MailIcon />
          <span class="sr-only">Email {{ fullname }}</span>
        </a>
      </UiButton>
      <UiButton
        v-if="linkedinUrl"
        variant="ghost"
        size="icon"
        as-child
        class="size-8 text-muted-foreground"
      >
        <a :href="linkedinUrl" target="_blank" rel="noopener noreferrer">
          <ExternalLinkIcon />
          <span class="sr-only">LinkedIn {{ fullname }}</span>
        </a>
      </UiButton>
    </div>
  </article>
</template>
