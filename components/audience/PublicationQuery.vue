<script setup lang="ts">
import { cn } from "~/lib/utils"

type Props = {
	archives?: number[]
	categories?: Record<string, unknown>[]
}

defineProps<Props>()

const keywordFilter = defineModel<string>("keyword")
const categoryFilter = defineModel<string>("category")
const yearFilter = defineModel<number>("year")

const showCategories = ref(false)
const showArchives = ref(false)

function toggleCategories() {
	showCategories.value = !showCategories.value
	showArchives.value = false
}
function toggleArchives() {
	showArchives.value = !showArchives.value
	showCategories.value = false
}
function closeCategories() {
	showCategories.value = false
}
function closeArchives() {
	showArchives.value = false
}
</script>

<template>
	<div class="p-4">
		<section class="md:hidden">
			<!-- Search Bar -->
			<div class="mb-4">
				<UiInput
					v-model="keywordFilter"
					type="text"
					placeholder="Search..."
					class="w-full p-2 border bg-[#F5F5F5] text-[#C5C5C5] border-gray-300 rounded-md"
				/>
			</div>

			<!-- Buttons -->
			<div class="flex justify-between mb-4">
				<button
					class="flex-1 mx-1 p-2 bg-white font-[Ubuntu] rounded-md"
					:class="{
						'text-[#DAB38D]': !showCategories,
						'text-[#8B5E34] border border-black': showCategories,
					}"
					@click="toggleCategories"
				>
					Categories
				</button>
				<button
					class="flex-1 mx-1 p-2 bg-white font-[Ubuntu] rounded-md"
					:class="{
						'text-[#DAB38D]': !showArchives,
						'text-[#8B5E34] border border-black': showArchives,
					}"
					@click="toggleArchives"
				>
					Archives
				</button>
			</div>

			<!-- Categories Menu -->
			<div
				v-if="showCategories"
				class="bg-white p-2 w-full"
			>
				<div class="flex justify-end mb-2">
					<button
						class="text-gray-600 hover:text-gray-800"
						@click="closeCategories"
					>
						✕
					</button>
				</div>
				<ul>
					<li
						v-for="category in categories"
						:key="category.id as string"
						:class="cn(`py-2 text-lg font-[Ubuntu] text-[#DAB38D] last:border-b-0 cursor-pointer`, {
							underline: category.id === categoryFilter,
						})"
						@click="categoryFilter = category.id as string"
					>
						{{ category.name }}
					</li>
				</ul>
			</div>

			<!-- Archives Menu -->
			<div
				v-if="showArchives"
				class="bg-white p-2 w-full"
			>
				<div class="flex justify-end mb-2">
					<button
						class="text-gray-600 hover:text-gray-800"
						@click="closeArchives"
					>
						✕
					</button>
				</div>
				<ul>
					<li
						v-for="archive in archives"
						:key="archive"
						:class="cn(`py-2 text-lg font-[Ubuntu] text-[#DAB38D] last:border-b-0 cursor-pointer`, {
							underline: archive === yearFilter,
						})"
						@click="yearFilter = archive"
					>
						{{ archive }}
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>
