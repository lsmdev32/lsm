<script setup lang="ts">
import { useRouteQuery } from "@vueuse/router"
import { useDebounce } from "@vueuse/core"
import PublicationQuery from "~/components/audience/PublicationQuery.vue"
import Publications from "~/components/audience/Publications.vue"
import dayjs from "#build/dayjs.imports.mjs"
import { cn } from "~/lib/utils"
import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants"
import LogoSVG from "~/assets/images/logo.svg"

const categories = await useCustomFetch("/rest/page-data/categories")

const keywordFilter = useRouteQuery<string>("keyword", undefined)
const categoryFilter = useRouteQuery<string>("category", undefined)
const pageFilter = ref(1)
const yearFilter = useRouteQuery<number>("year", undefined)

const debouncedKeyword = useDebounce(keywordFilter, DEBOUNCE_DEFAULT_TIME)

const contents = ref<Record<string, any>[]>([])
const firstContent = computed(() => contents.value.at(0))
const isLoading = ref(false)
const blink = ref(false)

onMounted(() => {
	isLoading.value = true
	$fetch("/rest/page-data/content-list", {
		params: {
			type: "blog",
			search: keywordFilter.value ?? undefined,
			category: categoryFilter.value?.length ? categoryFilter.value : undefined,
			page: pageFilter.value,
			year: yearFilter.value ?? undefined,
		},
	})
		.then((res) => {
			contents.value = res.data.contents
		})
		.finally(() => {
			isLoading.value = false
		})
})

function handleFetchNextPage() {
	$fetch("/rest/page-data/content-list", {
		params: {
			type: "blog",
			search: keywordFilter.value,
			category: categoryFilter.value,
			page: (pageFilter.value || 1) + 1,
			year: yearFilter.value,
		},
	})
		.then((res) => {
			contents.value.push(...res.data.contents)
		})
}

const archives = computed(() => {
	const startYear = 2006
	const currentYear = dayjs()
		.year()
	const years = []
	for (let y = startYear; y <= currentYear; y++) years.push(y)
	return years.reverse()
})

watch([
	debouncedKeyword,
	categoryFilter,
	yearFilter,
], ([
	keyword,
	category,
	year,
]) => {
	pageFilter.value = 1

	isLoading.value = true
	$fetch("/rest/page-data/content-list", {
		params: {
			type: "blog",
			search: keyword,
			category: category,
			page: 1,
			year: year,
		},
	})
		.then((res) => {
			contents.value = res.data.contents
		})
		.finally(() => {
			isLoading.value = false
		})
})

function loadMore() {
	if (isLoading.value) return

	isLoading.value = true
	handleFetchNextPage()
	isLoading.value = false
}

function resetFilters() {
	window.location.href = "/blogs"
}
</script>

<template>
	<div>
		<!-- Mobile -->
		<section class="md:hidden">
			<PublicationQuery
				v-model:keyword="keywordFilter"
				v-model:category="categoryFilter"
				v-model:year="yearFilter"
				:archives="archives"
				:categories="categories.data.data.categories as any"
			/>
		</section>
		<section class="md:hidden">
			<div class="p-4">
				<Publications :publications="contents" />
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
								Cari
							</h2>
						</div>
						<div class="w-full flex flex-col gap-y-4">
							<UiInput
								v-model="keywordFilter"
								type="text"
								placeholder="Cari..."
								class="w-full p-2 border bg-[#F5F5F5] border-gray-300 rounded-md"
							/>
							<button
								class="mx-1 p-2 font-[Ubuntu] rounded-md"
								:class="{
									'text-gray-300': !blink,
									'text-[#4B3D2A] border border-[#4B3D2A] bg-[#DAB38D]': blink,
								}"
								@click="resetFilters"
							>
								Reset Filters
							</button>
						</div>
					</div>
					<!-- Kategoti been Hidden -->
					<!-- <div class="flex flex-col mb-8">
						<div class="flex mb-8">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Kategori
							</h2>
						</div>
						<button
							v-for="category in categories.data?.data?.categories"
							:key="category.id"
							to="#"
							class="text-[#DAB38D] font-[Ubuntu] text-lg mb-2 hover:underline text-left max-w-[300px] truncate"
							@click="categoryFilter = category.id"
						>
							{{ category.name }}
						</button>
					</div> -->
					<!-- <div class="flex flex-col mb-8">
						<div class="flex mb-8">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Arsip
							</h2>
						</div>
						<div class="flex flex-wrap max-w-[150px]">
							<div
								v-for="archive in archives"
								:key="archive"
								to="#"
								:class="cn(`text-[#DAB38D] font-[Ubuntu] text-lg text-left w-fit cursor-pointer px-1 py-0.5`, {
									'hover:underline': yearFilter !== archive,
									'underline font-bold': yearFilter === archive,
								})"
								@click="yearFilter = archive"
							>
								{{ archive }}
							</div>
						</div>
					</div> -->
				</div>

				<!-- Main Content -->
				<div class="w-3/4">
					<!-- Featured Post -->
					<!-- <nuxt-link
						v-if="firstContent"
						class="mb-10"
						:to="`/blogs/${firstContent?.slug}`"
					>
						<NuxtImg
							v-if="firstContent?.image_url"
							:src="firstContent?.image_url"
							class="w-full h-64 object-cover object-center mb-4"
						/>
						<NuxtImg
							v-else
							:src="LogoSVG"
							alt="Thumbnail"
							class="w-full h-64 object-cover object-center mb-4"
						/>
						<span class="text-sm text-[#DAB38D] font-[Ubuntu]">{{ firstContent?.category }}</span>
						<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
							{{ firstContent?.title }}
						</h3>
						<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
							<div class="flex items-center space-x-1 ">
								<img
									v-if="firstContent?.author?.photo_url"
									:src="firstContent.author?.photo_url"
									alt="Author"
									class="w-8 h-8 rounded-full mr-1"
								>
								<span class="uppercase tracking-wider text-[#DAB38D]">{{ firstContent?.author?.name || 'LSM Content Team' }}</span>
							</div>
							<div class="flex items-center space-x-1">
								<Icon
									name="mdi:calendar"
									size="20"
									class="text-[#DAB38D]"
								/>
								<span class="uppercase text-[#DAB38D]">{{ firstContent?.published_at }}</span>
							</div>
						</div>
						<p class="mt-4 text-gray-700 line-clamp-2">
							{{ firstContent?.description }}
						</p>
						<button class="mt-4 px-4 py-2 bg-[#91AEAC] text-white hover:bg-[#9aaea1] rounded w-fit text-sm">
							Read More
						</button>
					</nuxt-link> -->

					<!-- Grid of Posts -->
					<div class="grid grid-cols-1 gap-4 mt-10">
						<nuxt-link
							v-for="(post, index) in contents"
							:key="index"
							class="mb-6"
							:to="`/blogs/${post.slug}`"
						>
							<!-- <NuxtImg
								v-if="post?.image_url"
								:src="post?.image_url"
								class="w-full h-64 object-cover object-center mb-4"
							/>
							<NuxtImg
								v-else
								:src="LogoSVG"
								alt="Thumbnail"
								class="w-full h-64 object-cover object-center mb-4"
							/> -->
							<span class="text-sm text-[#DAB38D] font-[Ubuntu]">{{ post?.category }}</span>
							<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
								{{ post?.title }}
							</h3>
							<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
								<div class="flex items-center space-x-1 ">
									<img
										v-if="post?.author?.photo_url"
										:src="post?.author?.photo_url"
										alt="Author"
										class="w-8 h-8 rounded-full mr-1"
									>
									<span class="uppercase tracking-wider text-[#DAB38D]">{{ post?.author?.name || 'LSM Content Team' }}</span>
								</div>
								<div class="flex items-center space-x-1">
									<Icon
										name="mdi:calendar"
										size="20"
										class="text-[#DAB38D]"
									/>
									<span class="uppercase text-[#DAB38D]">{{ post?.published_at }}</span>
								</div>
							</div>
							<p class="mt-4 text-gray-700 line-clamp-2">
								{{ post?.description }}
							</p>
							<button class="mt-4 px-4 py-2 bg-[#91AEAC] text-white hover:bg-[#9aaea1] rounded w-fit text-sm">
								Read More
							</button>
						</nuxt-link>
					</div>
					<div class="flex w-full justify-center mt-10">
						<button
							v-if="!isLoading && firstContent"
							class="bg-[#4B3D2A] text-[#DAB38D] rounded-md py-2 px-4 font-[Ubuntu] hover:cursor-pointer"
							@click="loadMore"
						>
							Load More
						</button>
						<div v-if="!firstContent && !isLoading">
							<span class="text-gray-400 text-lg font-[Ubuntu]">
								No blogs found.
							</span>
						</div>
						<div
							v-if="isLoading"
							class="w-full"
						>
							<UiSkeleton
								class="w-full h-[315px]"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
