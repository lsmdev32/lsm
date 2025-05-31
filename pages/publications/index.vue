<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"
import PublicationThumbnail from "../../assets/PublicationThumbnail.png"
import PublicationQuery from "~/components/audience/PublicationQuery.vue"
import Publications from "~/components/audience/Publications.vue"
import dayjs from "#build/dayjs.imports.mjs"

const posts = [
	{
		image: PublicationThumbnail,
		description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum dui consectetur morbi ultricies sed ipsum. Porttitor ultricies turpis dictum scelerisque phasellus. Etiam est sed quam mauris id sit lacus, ut. Aliquam duis id ipsum a facilisi in vestibulum hac ullamcorper. Sed at urna velit. Suspendisse fermentum nisi nulla, nec porta felis porta non. Curabitur volutpat est nec laoreet efficitur. Integer luctus gravida massa in pulvinar. Sed hendrerit, justo nec egestas porta, lorem orci rhoncus massa, nec bibendum risus turpis in nunc. Mauris vitae urna nec ligula.",
	},
	{
		image: PublicationThumbnail,
		description: "Another example description here with more than 150 words. ...",
	},
	{
		image: PublicationThumbnail,
		description: "Short description only.",
	},
]

const categories = await useCustomFetch("/rest/page-data/categories")

const keywordFilter = useRouteQuery("keyword", "")
const categoryFilter = useRouteQuery("category", "")
const pageFilter = useRouteQuery<number>("page", 1)
const yearFilter = useRouteQuery<number>("year", dayjs()
	.year())

const archives = computed(() => {
	const currentYear = dayjs()
		.year()
	return Array.from({ length: 20 }, (_, i) => currentYear - i)
})

watch([
	keywordFilter,
	categoryFilter,
	yearFilter,
], () => {
	pageFilter.value = 1
})
</script>

<template>
	<div>
		<!-- Mobile -->
		<section class="md:hidden">
			<PublicationQuery />
		</section>
		<section class="md:hidden">
			<div class="p-4">
				<Publications />
			</div>
		</section>
		<!-- Desktop -->
		<section class="hidden md:flex justify-center w-full">
			<div class="flex flex-row max-w-7xl p-4 gap-8 mx-auto w-full px-2 sm:px-6 lg:px-8">
				<!-- Sidebar -->
				<div class="w-1/4">
					<div class="flex flex-col mb-8">
						<div class="flex mb-8">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Search
							</h2>
						</div>
						<UiInput
							v-model="keywordFilter"
							type="text"
							placeholder="Search..."
							class="w-full p-2 border bg-[#F5F5F5] border-gray-300 rounded-md"
						/>
					</div>
					<div class="flex flex-col mb-8">
						<div class="flex mb-8">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Categories
							</h2>
						</div>
						<button
							v-for="category in categories.data?.data?.categories"
							:key="category.id"
							to="#"
							class="text-[#DAB38D] font-[Ubuntu] text-lg mb-2 hover:underline text-left max-w-[300px] truncate"
							@click="categoryFilter = category.name"
						>
							{{ category.name }}
						</button>
					</div>
					<div class="flex flex-col mb-8">
						<div class="flex mb-8">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Archives
							</h2>
						</div>
						<button
							v-for="archive in archives"
							:key="archive"
							to="#"
							class="text-[#DAB38D] font-[Ubuntu] text-lg mb-2 text-left"
							@click="yearFilter = archive"
						>
							{{ archive }}
						</button>
					</div>
				</div>

				<!-- Main Content -->
				<div class="w-3/4">
					<!-- Featured Post -->
					<div class="mb-8">
						<img
							:src="posts[0]?.image"
							alt="Thumbnail"
							class="w-full h-64 object-cover mb-4"
						>
						<span class="text-sm text-[#DAB38D] font-[Ubuntu]">Lorem ipsum dolor</span>
						<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
							Lorem ipsum dolor sit amet, consectetur
						</h3>
						<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
							<div class="flex items-center space-x-1 ">
								<img
									src="~/assets/images/Dummy_DamianAgataYuvens.jpg"
									alt="Author"
									class="w-8 h-8 rounded-full mr-1"
								>
								<span class="uppercase tracking-wider text-[#DAB38D]">John Doe</span>
							</div>
							<div class="flex items-center space-x-1">
								<Icon
									name="mdi:calendar"
									size="20"
									class="text-[#DAB38D]"
								/>
								<span class="uppercase text-[#DAB38D]">Jan 18, 2019</span>
							</div>
						</div>
						<p class="mt-4 text-gray-700 line-clamp-2">
							{{ posts[0]?.description }}
						</p>
						<button class="mt-4 px-4 py-2 bg-[#91AEAC] text-white hover:bg-[#9aaea1] rounded w-fit text-sm">
							Read More
						</button>
					</div>

					<!-- Grid of Posts -->
					<div class="grid grid-cols-3 gap-4">
						<div
							v-for="(post, index) in posts.slice(0)"
							:key="index"
							class="mb-6"
						>
							<img
								:src="post.image"
								alt="Thumbnail"
								class="w-full h-40 object-cover mb-4"
							>
							<span class="text-sm text-[#DAB38D] font-[Ubuntu]">Lorem ipsum dolor</span>
							<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
								Lorem ipsum dolor sit amet, consectetur
							</h3>
							<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
								<div class="flex items-center space-x-1 ">
									<img
										src="~/assets/images/Dummy_DamianAgataYuvens.jpg"
										alt="Author"
										class="w-8 h-8 rounded-full mr-1"
									>
									<span class="uppercase tracking-wider text-[#DAB38D]">John Doe</span>
								</div>
								<div class="flex items-center space-x-1">
									<Icon
										name="mdi:calendar"
										size="20"
										class="text-[#DAB38D]"
									/>
									<span class="uppercase text-[#DAB38D]">Jan 18, 2019</span>
								</div>
							</div>
							<button class="mt-4 px-4 py-2 bg-[#91AEAC] text-white hover:bg-[#9aaea1] rounded w-fit text-sm">
								Read More
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
