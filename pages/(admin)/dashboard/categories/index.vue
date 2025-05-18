<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"
import { PlusIcon, RefreshCwIcon } from "lucide-vue-next"
import { categoryColumns } from "~/components/admin/table/columns"

definePageMeta({
	layout: "auth",
	middleware: ["auth"],
})

const search = useRouteQuery<string>("search", "")
const page = useRouteQuery<number>("page", 0)

const params = computed(() => ({ search: search.value, page: page.value }))

const { result, refresh } = useCategoryList(params)
</script>

<template>
	<AdminPage page-title="Categories">
		<div>
			<AdminTableDataTable
				:columns="categoryColumns"
				:data="result?.hits.map((item) => ({
					name: item.name,
					created_at: item.created_at!,
				})) ?? []"
				:pagination="{ pageSize: 10, pageIndex: 0 }"
			>
				<template #upper="{ }">
					<div class="flex gap-x-2 items-center w-full">
						<UiInput
							v-model="search"
							class="max-w-xs"
							placeholder="Cari kategori"
						/>
						<UiButton
							class=""
							color="primary"
							@click="refresh"
						>
							<RefreshCwIcon :size="24" />
							<span>Refresh</span>
						</UiButton>
						<UiButton
							class="ml-auto"
							color="primary"
						>
							<PlusIcon :size="24" />
							<span>Tambah Kategori</span>
						</UiButton>
					</div>
				</template>
				<template #empty-list="{}">
					<AdminEmptyListPlaceholder item-name="Categories" />
				</template>
			</AdminTableDataTable>
		</div>
	</AdminPage>
</template>
