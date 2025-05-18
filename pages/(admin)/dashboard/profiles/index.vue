<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"
import { RefreshCcw, UserPlus2 } from "lucide-vue-next"
import EmptyListPlaceholder from "~/components/admin/EmptyListPlaceholder.vue"
import { useDeleteStaff } from "~/composables/form/use-delete-staff"
import type { StaffAppModel } from "~/lib/firestore-model"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const keyword = useRouteQuery("keyword", "")

const { refresh, isLoading, result } = useSearch<StaffAppModel>("staffs", keyword, [
	"fullname",
	"email",
	"linkedin_url",
	"type",
	"profile_picture_url",
	"slug",
	"id",
])

const {
	isDialogOpen,
	onOpenDialog,
	cancelDialog,
	confirmDialog,
	currentDialogData,
} = useDeleteStaff()
</script>

<template>
	<AdminPage
		page-title="Profil Staff"
	>
		<div class="flex flex-col py-10 gap-y-4">
			<div class="flex justify-end w-full">
				<NuxtLink
					to="/dashboard/profiles/create"
					class=" flex items-center border justify-center"
				>
					<UiButton variant="outline">
						<UserPlus2 />
						<span>
							Create Profile
						</span>
					</UiButton>
				</NuxtLink>
			</div>
			<UiInput
				v-model:model-value="keyword"
				placeholder="Cari profile dengan nama atau email"
			/>
			<div class="flex">
				<UiButton
					class="capitalize"
					@click="refresh"
				>
					<RefreshCcw /> Refresh list
				</UiButton>
			</div>
			<div class="flex flex-wrap gap-6">
				<template v-if="isLoading">
					<UiSkeleton
						v-for="i in 8"
						:key="i"
						class="w-[255px] h-[219px] rounded-xl shadow-md"
					/>
				</template>
				<template v-else-if="result.hits.length === 0">
					<EmptyListPlaceholder
						v-if="result.hits.length === 0 && !isLoading"
						class="w-full h-[300px] flex items-center justify-center"
						item-name="profiles"
					/>
				</template>
				<template
					v-for="person in result.hits ?? []"
					v-else
					:key="person.objectID"
				>
					<AdminStaffCard
						:id="person.objectID!"
						:fullname="person.fullname"
						:email="person.email"
						:type="person.type"
						:linkedin-url="person.linkedin_url"
						:pp-url="person.profile_picture_url"
						@click-delete="onOpenDialog($event)"
					/>
				</template>
			</div>
		</div>

		<UiAlertDialog :open="isDialogOpen">
			<UiAlertDialogContent>
				<UiAlertDialogHeader>
					<UiAlertDialogTitle>Hapus Profile <span class="font-bold">{{ currentDialogData?.fullname }}</span> ?</UiAlertDialogTitle>
					<UiAlertDialogDescription>
						Ini akan menghapus profile {{ currentDialogData?.fullname }} dari sistem.
						Apakah Anda yakin ingin melanjutkan?
					</UiAlertDialogDescription>
				</UiAlertDialogHeader>
				<UiAlertDialogFooter>
					<UiAlertDialogCancel @click="cancelDialog">
						Batal
					</UiAlertDialogCancel>
					<UiAlertDialogAction
						class="bg-red-500 text-white hover:bg-red-600"
						@click="confirmDialog"
					>
						Hapus
					</UiAlertDialogAction>
				</UiAlertDialogFooter>
			</UiAlertDialogContent>
		</UiAlertDialog>
	</AdminPage>
</template>
