<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"
import { useDeleteStaff } from "~/composables/form/use-delete-staff"
import type { StaffAppModel } from "~/lib/firestore-model"

const BREADCRUMBS = [{ text: "Staffs", href: "/dashboard/staffs" }]

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const keyword = useRouteQuery("keyword", "")

const { refresh, isLoading, result } = useSearch<StaffAppModel>("staffs", keyword, [
	"fullname", "email", "linkedin_url", "profile_picture_url", "type",
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
		:breadcrumbs="BREADCRUMBS"
	>
		<div class="flex flex-col py-10 gap-y-4">
			<UiInput
				v-model:model-value="keyword"
				placeholder="Cari profile dengan nama atau email"
			/>
			<div class="flex">
				<UiButton @click="refresh">
					Refresh list
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
				<AdminStaffCard
					v-for="person in result.hits ?? []"
					v-else
					:id="person.objectID"
					:key="person.objectID"
					:fullname="person.fullname"
					:email="person.email"
					:type="person.type"
					:linkedin-url="person.linkedin_url"
					:pp-url="person.profile_picture_url"
					@click-delete="onOpenDialog($event)"
				/>
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
						Batalkan
					</UiAlertDialogCancel>
					<UiAlertDialogAction @click="confirmDialog">
						Lanjut
					</UiAlertDialogAction>
				</UiAlertDialogFooter>
			</UiAlertDialogContent>
		</UiAlertDialog>
	</AdminPage>
</template>
