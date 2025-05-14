<template>
	<div class="p-4">
		<section class="md:hidden">
			<!-- Search Bar -->
			<div class="mb-4">
				<input
					v-model="searchQuery"
					type="text"
					placeholder="Search..."
					class="w-full p-2 border bg-[#F5F5F5] text-[#C5C5C5] border-gray-300 rounded-md"
				>
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
						:key="category"
						class="py-2 text-lg font-[Ubuntu] text-[#DAB38D] last:border-b-0"
					>
						{{ category }}
					</li>
				</ul>
			</div>

			<!-- Archives Menu -->
			<div
				v-if="showArchives"
				class="bg-white  p-2 w-full"
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
						class="py-2 text-lg font-[Ubuntu] text-[#DAB38D] last:border-b-0"
					>
						{{ archive }}
					</li>
				</ul>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchQuery: "",
			showCategories: false,
			showArchives: false,
			categories: [
				"Category 1", "Category 2", "Category 3",
			],
			archives: [
				"January 2023", "February 2023", "March 2023",
			],
		}
	},
	methods: {
		toggleCategories() {
			this.showCategories = !this.showCategories
			this.showArchives = false
		},
		toggleArchives() {
			this.showArchives = !this.showArchives
			this.showCategories = false
		},
		closeCategories() {
			this.showCategories = false
		},
		closeArchives() {
			this.showArchives = false
		},
	},
}
</script>

<style scoped>
/* No additional styles */
</style>
