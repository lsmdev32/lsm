<script setup lang="ts">
import "@vueup/vue-quill/dist/vue-quill.snow.css"

import { Download } from "lucide-vue-next"
import Publications from "~/components/audience/Publications.vue"
import LogoSVG from "/images/book.png"

const slug = useRoute().params.slug

const { data } = await useCustomFetch(`/rest/page-data/publications/${slug}`)
if (!data) {
	throw createError({
		statusCode: 404,
		statusMessage: "Publikasi Tidak Ditemukan",
	})
}

const detail = data?.data?.detail
const relatedContents = data?.data?.related_contents ?? []
</script>

<template>
	<div>
		<!-- Mobile -->
		<section class="md:hidden">
			<div class="mb-4 flex flex-col w-full">
				<!-- <img
					v-if="detail?.image_url"
					:src="detail?.image_url"
					alt="Thumbnail"
					class="w-full h-72 object-cover mb-4"
				>
				<img
					v-else
					:src="LogoSVG"
					alt="Thumbnail"
					class="w-full h-72 object-cover mb-4"
				> -->
				<div class="p-4 self-center flex flex-col gap-y-4">
					<span class="text-sm text-[#DAB38D] font-[Ubuntu] text-center">{{ detail?.category }}</span>
					<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug text-center">
						{{ detail?.title }}
					</h3>
					<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
						<div class="flex items-center space-x-1 ">
							<img
								v-if="detail?.author"
								:src="detail.author?.image_url"
								alt="Author"
								class="w-8 h-8 rounded-full mr-1"
							>
							<span class="uppercase tracking-wider text-[#DAB38D]">{{ detail.author?.name || 'LSM Content Team' }}</span>
						</div>
						<div class="flex items-center space-x-1">
							<Icon
								name="mdi:calendar"
								size="20"
								class="text-[#DAB38D]"
							/>
							<span class="uppercase text-[#DAB38D]">{{ detail?.published_at }}</span>
						</div>
					</div>
				</div>
				<div
					class="mt-4 p-4 text-gray-700 text-justify ql-editor"
					v-html="detail?.content"
				/>

				<div class="flex justify-between px-4">
					<!-- <div class="w-[400px] flex gap-x-4 items-center">
						<span
							v-for="tag in detail.tags"
							:key="tag"
							class="text-[#DAB38D] font-[Ubuntu] text-sm"
						>
							#{{ tag }}
						</span>
					</div> -->
					<div class="w-full">
						<nuxt-link
							:to="detail?.publication_file_url"
							target="_blank"
							class="flex items-center font-[Marcellus] justify-center py-4 bg-[#4B3D2A] rounded-lg text-[#DAB38D]"
						>
							Download Publication
						</nuxt-link>
					</div>
				</div>
			</div>
		</section>
		<section class="md:hidden">
			<div class="p-4">
				<Publications />
			</div>
		</section>
		<!-- Desktop -->
		<section class="hidden md:flex justify-center w-full">
			<div class="flex flex-row justify-center max-w-7xl p-4 gap-8 mx-auto w-full px-2 sm:px-6 lg:px-8">
				<!-- Main Content -->
				<div class="w-3/4">
					<!-- Featured Post -->
					<div class="mb-8 flex flex-col gap-y-4">
						<!-- <img
							v-if="detail?.image_url"
							:src="detail?.image_url"
							alt="Thumbnail"
							class="w-full h-80 object-cover mb-4"
						>
						<img
							v-else
							:src="LogoSVG"
							alt="Thumbnail"
							class="w-full h-80 object-cover mb-4"
						> -->
						<span class="text-sm text-[#DAB38D] font-[Ubuntu] self-center">{{ detail?.category }}</span>
						<h3 class="text-2xl font-[Marcellus] text-[#4B3D2A] leading-snug self-center">
							{{ detail?.title }}
						</h3>
						<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu] self-center">
							<div class="flex items-center space-x-1 ">
								<nuxt-link
									v-if="detail?.author"
									:to="`/attorneys/${detail.author?.slug}`"
								>
									<img
										:src="detail.author?.image_url"
										alt="Author"
										class="w-8 h-8 rounded-full mr-1"
									>
								</nuxt-link>
								<span class="uppercase tracking-wider text-[#DAB38D]">{{ detail.author?.name || 'LSM Content Team' }}</span>
							</div>
							<div class="flex items-center space-x-1">
								<Icon
									name="mdi:calendar"
									size="20"
									class="text-[#DAB38D]"
								/>
								<span class="uppercase text-[#DAB38D]">{{ detail?.published_at }}</span>
							</div>
						</div>
						<div
							class="mt-4 text-gray-700 ql-editor"
							v-html="detail?.content"
						/>

						<div class="flex justify-between px-4">
							<div class="w-[400px] flex gap-x-4 items-center">
								<span
									v-for="tag in detail.tags"
									:key="tag"
									class="text-[#DAB38D] font-[Ubuntu] text-sm"
								>
									#{{ tag }}
								</span>
							</div>
							<div class="">
								<nuxt-link
									:to="detail?.publication_file_url"
									target="_blank"
									class="flex items-center justify-center p-3 bg-[#4B3D2A] rounded-lg text-[#DAB38D] gap-x-4"
								>
									<Download /> Download Publication
								</nuxt-link>
							</div>
						</div>
					</div>

					<!-- Grid of Posts -->
					<div class="flex font-[Marcellus] text-[#4B3D2A] text-2xl mb-6">
						Related Articles
					</div>
					<div class="grid grid-cols-3 gap-4">
						<nuxt-link
							v-for="(content, index) in relatedContents"
							:key="index"
							class="mb-6"
							:to="`/publications/${content.slug}`"
						>
							<img
								v-if="content.image_url"
								:src="content.image_url"
								alt="Thumbnail"
								class="w-full h-40 object-cover mb-4"
							>
							<img
								v-else
								:src="LogoSVG"
								alt="Thumbnail"
								class="w-full h-40 object-cover mb-4"
							>
							<span class="text-sm text-[#DAB38D] font-[Ubuntu]">{{ content.category }}</span>
							<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
								{{ content.title }}
							</h3>
							<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
								<div class="flex items-center space-x-1 ">
									<img
										v-if="content.author"
										:src="content.author?.image_url"
										alt="Author"
										class="w-8 h-8 rounded-full mr-1"
									>
									<span class="uppercase tracking-wider text-[#DAB38D]">{{ content.author?.name || 'LSM Content Team' }}</span>
								</div>
								<div class="flex items-center space-x-1">
									<Icon
										name="mdi:calendar"
										size="20"
										class="text-[#DAB38D]"
									/>
									<span class="uppercase text-[#DAB38D]">{{ content.published_at }}</span>
								</div>
							</div>
							<button class="mt-4 px-4 py-2 bg-[#91AEAC] text-white hover:bg-[#9aaea1] rounded w-fit text-sm">
								Read More
							</button>
						</nuxt-link>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
