<script setup lang="ts">
import { useDebounce } from "@vueuse/core"
import { cn } from "~/lib/utils"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const breadcrumbs = [
	{ text: "Staffs", href: "/dashboard/staffs" },
	{ text: "List Staffs", href: "/dashboard/staffs/create" },
]

const keyword = ref("")
const debouncedKeyword = useDebounce(keyword, 500)

const { result, search } = useAlgoliaSearch<Record<string, unknown>>("staffs")

onMounted(async () => {
	await search({
		query: debouncedKeyword.value,
	})
})

watch(debouncedKeyword, async (value) => {
	await search({
		query: value,
	})
})
</script>

<template>
	<AdminPage
		page-title="Create Staff"
		:breadcrumbs="breadcrumbs"
	>
		<div class="flex flex-col py-10">
			<UiInput
				v-model="keyword"
				placeholder="Cari staff berdasarkan nama"
			/>
			<div class="flex flex-wrap gap-6 mt-8">
				<div
					v-for="person in result?.hits || []"
					:key="person.objectID"
					class="flex flex-col items-center bg-white rounded-lg shadow p-6 w-64"
				>
					<NuxtImg
						:src="person.profile_picture_url"
						alt="Profile"
						:class="cn(`w-24 h-24 rounded-full object-cover mb-4`)"
					/>
					<div class="font-semibold text-center text-lg mb-1">
						{{ person.fullname }}
					</div>
					<div class="flex flex-row items-center gap-2 mb-2">
						<a
							:href="`mailto:${person.email}`"
							class="text-gray-500 text-sm hover:underline"
						>
							Email
						</a>
						<a
							:href="person.linkedin_url as string"
							target="_blank"
							rel="noopener noreferrer"
							class="text-blue-600 hover:underline text-sm"
						>
							LinkedIn
						</a>
					</div>
				</div>
			</div>
		</div>
	</AdminPage>
</template>
