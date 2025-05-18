<script setup lang="ts">
import { cn } from "~/lib/utils"

type Props = {
	id: string
	type: string
	fullname: string
	linkedinUrl: string
	email: string
	ppUrl: string
}

type Emits = {
	(event: "click-delete", payload: { id: string, fullname: string }): void
}

const emit = defineEmits<Emits>()

const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
	<div
		:class="cn(
			'flex flex-col items-center bg-white rounded-lg shadow-sm p-4 w-64 bg-gradient-to-br from-white to-orange-100 border')"
	>
		<div class="hover:opacity-50 self-end">
			<UiDropdownMenu>
				<UiDropdownMenuTrigger>
					<div class="flex items-center group">
						<Icon
							name="material-symbols:action-key"
							size="16"
						/>
						<span class="text-sm hidden group-hover:block">Menu</span>
					</div>
				</UiDropdownMenuTrigger>
				<UiDropdownMenuContent>
					<UiDropdownMenuLabel>Menu</UiDropdownMenuLabel>
					<UiDropdownMenuItem>
						<NuxtLink :to="`/dashboard/profiles/${props.id}/edit`">
							<Icon name="mdi:pencil" /> Ubah Profil
						</NuxtLink>
					</UiDropdownMenuItem>
					<UiDropdownMenuItem @click="emit('click-delete', { id: props.id, fullname: props.fullname })">
						<Icon name="mdi:trash" /> Hapus
					</UiDropdownMenuItem>
				</UiDropdownMenuContent>
			</UiDropdownMenu>
		</div>
		<NuxtImg
			:src="props.ppUrl"
			alt="Profile"
			class="size-36 rounded-full object-cover mb-4"
		/>
		<div class="mb-4">
			<span class="capitalize p-2 bg-orange-300 rounded-full text-xs">{{ type }}</span>
		</div>
		<div class="flex items-center gap-2 mb-2 [&_a]:cursor-pointer">
			<NuxtLink
				:to="`mailto:${props.email}`"
				class="text-gray-500 text-sm hover:underline cursor-pointer flex items-center gap-x-2 hover:cursor-pointer"
			>
				<Icon
					name="material-symbols:mail-outline"
					size="28"
				/>
			</NuxtLink>
			<NuxtLink
				:to="props.linkedinUrl"
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-600 hover:underline text-sm flex items-center gap-x-2"
			>
				<Icon
					name="devicon:linkedin"
					size="24"
				/>
			</NuxtLink>
		</div>
		<div class="font-semibold text-center text-sm mb-1">
			{{ props.fullname }}
		</div>
	</div>
</template>
