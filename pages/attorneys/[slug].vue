<script setup lang="ts">
import { ref } from "vue"
import Publications from "~/components/audience/Publications.vue"

const slug = useRoute().params.slug as string

const { data } = await useCustomFetch(`/rest/page-data/staffs/${slug}`)

const result = data.data

console.log(`result`, result)

defineProps({
	image: String,
	name: String,
	email: String,
	description: String,
})

// State
const showPartners = ref(false)
const showAssociates = ref(false)

// Methods
function togglePartners() {
	showPartners.value = !showPartners.value
	showAssociates.value = false
}

function closePartners() {
	showPartners.value = false
}

function toggleAssociates() {
	showAssociates.value = !showAssociates.value
	showPartners.value = false
}

function closeAssociates() {
	showAssociates.value = false
}
</script>

<template>
	<div>
		<!-- Desktop -->
		<section class="hidden md:block">
			<div class="max-w-7xl mx-auto py-12 flex flex-col md:flex-row gap-28 px-2 sm:px-6 lg:px-8">
				<!-- Sidebar: List Partners -->
				<aside class="md:col-span-1 space-y-4 pr-8">
					<h2 class="text-3xl font-[Marcellus] text-[#2e1e10]">
						Partners
					</h2>
					<ul class="text-[#c89d71] space-y-2 font-[Ubuntu] whitespace-nowrap">
						<li
							v-for="partner in result.other_partners"
							:key="partner.id"
							class="cursor-pointer hover:underline"
						>
							<nuxt-link :href="`/attorneys/${partner.slug}`">
								{{ partner.name }}
							</nuxt-link>
						</li>
					</ul>
				</aside>

				<!-- Main Profile Section -->
				<div class="w-full bg-[#dfb78d] md:rounded-bl-[152px] lg:rounded-bl-[128px] flex flex-col md:flex-row items-center border-bottom-left-radius  ">
					<!-- Circle Image -->
					<div class="relative md:w-[287px] md:h-[287px] lg:w-[260px] lg:h-[260px] shrink-0 overflow-hidden rounded-full md:rounded-l-full  ">
						<NuxtImg
							:src="result.person.image_url"
							alt=""
							class="object-cover object-top w-full h-full "
						/>
					</div>

					<!-- Text Content -->
					<div class="md:ml-10 mt-6 text-center md:text-left ">
						<h1 class="text-4xl font-[Marcellus] text-[#3a2b1c] leading-tight uppercase">
							{{ result.person.name }}
						</h1>

						<p class="text-white font-[Ubuntu] mt-4 leading-relaxed max-w-xl">
							{{ result.person.short_bio }}
						</p>

						<!-- Contact Info -->
						<div class="flex flex-col sm:flex-row justify-center  lg:justify-start items-center gap-2 my-4 text-[#3a2b1c] text-sm pb-2">
							<nuxt-link
								:href="result.person.linkedin_url"
								class="w-10 h-10 bg-[#4B3D2A] text-[#DAB38D] hover:text-white flex items-center justify-center rounded-full"
							>
								<Icon
									name="mdi:linkedin"
									size="20"
								/>
							</nuxt-link>
							<div class="flex items-center gap-2 mr-2 text-white font-[Ubuntu]">
								<span class="first-letter:uppercase">{{ result.person.name }}</span>
							</div>
							<nuxt-link
								:href="`mailto:${result.person.email}`"
								class="w-10 h-10 bg-[#4B3D2A] text-[#DAB38D] hover:text-white flex items-center justify-center rounded-full"
							>
								<Icon
									name="mdi:email-outline"
									size="20"
								/>
							</nuxt-link>
							<div class="flex items-center gap-2 mr-2 text-white font-[Ubuntu]">
								<span class="first-letter:uppercase">{{ result.person.email }}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="max-w-7xl mx-auto pb-12 flex flex-col md:flex-row gap-28 px-2 sm:px-6 lg:px-8">
				<!-- Sidebar: List Partners -->
				<aside class="md:col-span-1 space-y-4 pr-8">
					<h2 class="text-3xl font-[Marcellus] text-[#2e1e10]">
						Associate
					</h2>
					<ul class="text-[#c89d71] space-y-2 font-[Ubuntu] whitespace-nowrap">
						<li
							v-for="associate in result.other_associates"
							:key="associate.id"
							class="cursor-pointer hover:underline"
						>
							<nuxt-link :href="`/attorneys/${associate.slug}`">
								{{ associate.name }}
							</nuxt-link>
						</li>
					</ul>
				</aside>

				<!-- Main Profile Section -->
				<div class="w-full flex flex-col font-[Ubuntu] text-[#949494] space-y-4">
					<div
						class="[&_*]:tracking-wide text-justify"
						v-html="result.person.bio"
					/>
					<div class="flex justify-between items-center pt-4">
						<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
							Publication
						</h2>
						<NuxtLink
							to="/publications"
							class="text-sm text-[#DAB38D] hover:underline"
						>
							See More &gt;
						</NuxtLink>
					</div>
					<div class="pb-8 flex-row">
						<Publications
							:default-author-name="result.person.name"
							:default-author-image="result.person.image_url"
							:publications="result.publications"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- Mobile -->
		<section class="md:hidden">
			<div class="max-w-7xl mx-auto flex flex-col md:flex-row ">
				<!-- Sidebar: List Partners -->
				<div class="p-4">
					<section class="md:hidden">
						<!-- Buttons -->
						<div class="flex justify-between mb-4">
							<button
								class="flex-1 mx-1 p-2  font-[Ubuntu] rounded-md"
								:class="{
									'text-[#DAB38D] ': !showPartners,
									'text-[#4B3D2A] border border-[#4B3D2A] bg-[#DAB38D]': showPartners,
								}"
								@click="togglePartners"
							>
								Partners
							</button>
							<button
								class="flex-1 mx-1 p-2 font-[Ubuntu] rounded-md"
								:class="{
									'text-[#DAB38D] bg-white': !showAssociates,
									'text-[#4B3D2A] border border-[#4B3D2A] bg-[#DAB38D]': showAssociates,
								}"
								@click="toggleAssociates"
							>
								Associates
							</button>
						</div>

						<!-- Partners Menu -->
						<div
							v-if="showPartners"
							class="bg-white p-2 w-full"
						>
							<div class="flex justify-end mb-2">
								<button
									class="text-gray-600 hover:text-gray-800"
									@click="closePartners"
								>
									✕
								</button>
							</div>
							<ul>
								<li
									v-for="partner in result.other_partners"
									:key="partner.id"
									class="py-2 text-lg font-[Ubuntu] text-[#DAB38D] last:border-b-0"
								>
									<nuxt-link :href="`/attorneys/${partner.slug}`">
										{{ partner.name }}
									</nuxt-link>
								</li>
							</ul>
						</div>

						<!-- Associates Menu -->
						<div
							v-if="showAssociates"
							class="bg-white  p-2 w-full"
						>
							<div class="flex justify-end mb-2">
								<button
									class="text-gray-600 hover:text-gray-800"
									@click="closeAssociates"
								>
									✕
								</button>
							</div>
							<ul>
								<li
									v-for="associate in result.other_associates"
									:key="associate.id"
									class="py-2 text-lg font-[Ubuntu] text-[#DAB38D] last:border-b-0"
								>
									<nuxt-link :href="`/attorneys/${associate.slug}`">
										{{ associate.name }}
									</nuxt-link>
								</li>
							</ul>
						</div>
					</section>
				</div>

				<!-- Main Profile Section -->
				<div class="flex flex-col items-center px-4 py-6 space-y-4">
					<!-- Gambar dengan ABOUT LSM -->
					<div class="relative w-full">
						<NuxtImg
							:src="result.person.image_url"
							alt=""
							class="w-full h-[450px] object-cover"
						/>
						<h2 class="absolute bottom-6 left-6 text-white text-2xl font-[Marcellus] font-light">
							{{ result.person.name }}
							<div class="flex flex-row sm:flex-row  mt-1 text-[#3a2b1c] text-sm pb-2">
								<nuxt-link
									:href="result.person.linkedin_url"
									class="w-8 h-8 mr-2 bg-[#4B3D2A] text-white hover:text-[#DAB38D] flex items-center justify-center rounded-full"
								>
									<Icon
										name="mdi:linkedin"
										size="18"
									/>
								</nuxt-link>

								<nuxt-link
									:href="`mailto:${result.person.email}`"
									class="w-8 h-8 mr-2 bg-[#4B3D2A] text-white hover:text-[#DAB38D] flex items-center justify-center rounded-full"
								>
									<Icon
										name="mdi:email-outline"
										size="18"
									/>
								</nuxt-link>
							</div>
						</h2>
					</div>
					<div class="grid grid-cols-2 gap-6 ">
						<!-- Panah -->
						<div class="w-[30px]">
							<img
								src="../../assets/Arrow 1.png"
								alt=""
								style="height: 34px; width: 16px;"
							>
						</div>

						<!-- Deskripsi -->
						<p class="text-[#D9B28C] text-1xl font-[Marcellus] -ml-8 eading-relaxed">
							{{ result.person.short_bio }}
						</p>
					</div>
					<div class="w-full flex flex-col font-[Ubuntu] text-[#949494] space-y-4">
						<!-- Text Content -->
						<div
							class="[&_*]:tracking-wide text-justify"
							v-html="result.person.bio"
						/>
						<div class="flex justify-center items-center pt-2">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Publication
							</h2>
						</div>
						<div class="mt-4 flex-row">
							<Publications
								:default-author-name="result.person.name"
								:default-author-image="result.person.image_url"
								:publications="result.publications"
							/>
							<div class="flex justify-end mb-8 mt-[-24px]">
								<NuxtLink
									to="/publications"
									class="text-sm text-[#DAB38D] hover:underline"
								>
									See More &gt;
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
