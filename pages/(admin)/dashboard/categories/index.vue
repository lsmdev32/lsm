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

const { result } = useCategoryList(search, page)
const { onChange, submit } = useCreateCategory()

function refresh() {
	location.reload()
}
</script>

<template>
	<AdminPage page-title="Kategori">
		<div>
			<AdminTableDataTable
				v-if="result"
				:columns="categoryColumns"
				:data="result.hits"
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
							<UiDialog>
								<UiDialogTrigger class="flex gap-x-2 items-center">
									<PlusIcon :size="24" />
									<span>Tambah Kategori</span>
								</UiDialogTrigger>
								<UiDialogContent>
									<UiDialogHeader>
										<UiDialogTitle>Tambah Kategori</UiDialogTitle>
									</UiDialogHeader>

									<UiInput
										placeholder="Nama Kategori"
										@update:model-value="onChange($event as string)"
									/>

									<UiDialogFooter>
										<UiButton @click="submit">
											Buat
										</UiButton>
									</UiDialogFooter>
								</UiDialogContent>
							</UiDialog>
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
