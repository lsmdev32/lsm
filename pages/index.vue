<script setup lang="ts">
import { ref } from "vue"
import { NuxtLink } from "#components"
import ArrowIcon from "~/assets/images/arrow-icon.svg"
import DRThumbnail from "~/assets/images/dr-thumbnail.svg"
import CCThumbnail from "~/assets/images/cc-thumbnail.svg"
import IPThumbnail from "~/assets/images/ip-thumbnail.svg"
import useCustomFetch from "~/composables/useCustomFetch"
import Partners from "~/components/audience/Partners.vue"
import Publications from "~/components/audience/Publications.vue"
import Reviews from "~/components/audience/Reviews.vue"

const { data } = await useCustomFetch("/rest/page-data/home")
const contents = data?.data?.contents?.data ?? []
const attorneys = data?.data?.partners?.data ?? []
const latestContent = data?.data?.latest_content ?? []

const images = [
	"/images/bedge1.png",
	"/images/bedge2.png",
	"/images/bedge3.png",
	"/images/bedge4.png",
	"/images/bedge5.png",
	"/images/bedge6.png",
]

// Define available background images and corresponding text
const contentOptions = [
	{
		bgImage: DRThumbnail,
		text: "Dispute Resolution",
		paragraph:
			"Our Dispute Resolution practice group has extensive experience representing a wide range of clients including individuals, corporations, and government entities in complex litigation matters.",
	},
	{
		bgImage: CCThumbnail,
		text: "Corporate Commercial",
		paragraph:
			"We have provided assistance to and maintained relationships with a wide range of clients throughout Indonesia and abroad",
	},
	{
		bgImage: IPThumbnail,
		text: "Intellectual Property",
		paragraph:
			"Our Intellectual Property practice group advises on a wide range of intellectual property matters for diverse industries",
	},
]

// Reactive state to track current option
const currentOptionIndex = ref(0)

// Function to cycle through options
const cycleContent = () => {
	currentOptionIndex.value = (currentOptionIndex.value + 1) % contentOptions.length
}
const setOption = (index: number) => {
	currentOptionIndex.value = index
}
</script>

<template lang="html">
	<div>
		<!-- Mobile -->
		<section class="md:min-w-full md:hidden">
			<div class="banner">
				<div class="flex flex-col items-start justify-start text-left pl-[30px] py-[30px] md:pl-12 ">
					<div>
						<h1 class="text-6xl text-white">
							Lubis,<br> Santosa <br>& Mitra
						</h1>
					</div>
					<div class="pt-[160px]">
						<h2 class="text-2xl text-white">
							Local Wisdom,<br>Legal Insight
						</h2>
					</div>
				</div>
			</div>
		</section>
		<section class="md:min-w-full md:hidden font-[philosopher] ">
			<a
				:href="`/practice-area?category=${0}`"
				class="block"
			>
				<div class="flex items-center justify-start bg-[url('~/assets/images/dr-m-thumbnail.svg')] bg-cover h-[89px] pl-[30px] mx-[15px] mb-[15px] z-0">
					<div>
						<h2 class="text-2xl text-white">
							Dispute Resolution
						</h2>
					</div>
				</div>
			</a>
		</section>
		<section class="md:min-w-full md:hidden font-[philosopher] ">
			<a
				:href="`/practice-area?category=${1}`"
				class="block"
			>
				<div class="flex items-center justify-start bg-[url('~/assets/images/cc-m-thumbnail.svg')] bg-cover h-[89px] pl-[30px] mx-[15px] mb-[15px] z-0">
					<div>
						<h2 class="text-2xl text-white">
							Corporate Commercial
						</h2>
					</div>
				</div>
			</a>
		</section>
		<section class="md:min-w-full md:hidden font-[philosopher] ">
			<a
				:href="`/practice-area?category=${2}`"
				class="block"
			>
				<div class="flex items-center justify-start bg-[url('~/assets/images/ip-m-thumbnail.svg')] bg-cover h-[89px] pl-[30px] mx-[15px] mb-[24px]  z-0">
					<div>
						<h2 class="text-2xl text-white">
							Intelectual Property
						</h2>
					</div>
				</div>
			</a>
		</section>

		<!-- Blog and Publication Section here! -->
		<section class="sm:justify-center md:hidden md:min-w-full">
			<div class="w-full mx-auto sm:px-6 lg:px-8">
				<h1 class="text-3xl font-[Marcellus] text-center py-4">
					Publications
				</h1>
			</div>
			<div class="items-center justify-center px-6 py-6 z-0">
				<Publications :publications="contents" />
			</div>
		</section>

		<!-- Our Attorneys Section -->
		<section class="sm:justify-center md:hidden md:min-w-full">
			<div class="w-full mx-auto sm:px-6 lg:px-8">
				<h1 class="text-3xl font-[Marcellus] text-center py-4">
					Our Attorneys
				</h1>
			</div>
			<div class="items-center justify-center px-6 py-6 z-0">
				<Partners
					v-for="(partner, index) in attorneys"
					:key="index"
					class="capitalize"
					:image="partner.image_url"
					:name="partner.name"
					:linkedin="partner.linkedin_url"
					:email="partner.email"
					:slug="partner.slug"
				/>
			</div>
		</section>

		<!-- Desktop -->
		<section class="hidden md:block md:min-w-full">
			<div class="flex bg-[url('~/assets/images/banner1.svg')] bg-no-repeat bg-center bg-cover items-end justify-start text-left w-full h-[575px] pl-[30px] py-[30px] md:pl-12">
				<div class="flex flex-col items-start justify-start text-left pl-[30px] py-[60px] md:pl-12 ">
					<div>
						<h1 class="text-8xl font-[philosopher] text-white">
							Local Wisdom,<br>Legal Insight
						</h1>
					</div>
				</div>
			</div>
		</section>
		<!-- Bedge here! -->
		<section class="hidden md:flex justify-center items-center md:min-w-full">
			<div class="flex h-64 max-w-7xl items-center justify-center gap-x-4">
				<div
					v-for="(image, index) in images"
					:key="index"
					class="flex flex-row items-center justify-center "
				>
					<img
						:src="image"
						:alt="`Badge ${index + 1}`"
						class="h-37 w-44 object-center"
					>
				</div>
			</div>
		</section>

		<section class="hidden md:block sm:max-[hidden] md:min-w-full">
			<div class="flex h-[480px] w-full">
				<!-- Panel 1 -->
				<div class="relative bg-[url('~/assets/images/bg-whoarewe.svg')] bg-cover bg-no-repeat bg-center flex-1 justify-items-stretch hover:cursor-pointer hover:flex-[2] hover:bg-[url('~/assets/images/banner1.svg'),rgba(218,179,141,0.5)] transition-all duration-300 group overflow-hidden">
					<nuxt-link href="/about">
						<div class="absolute inset-0 bg-[rgba(75,61,42,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<!-- Heading -->
						<div class="absolute inset-0 flex items-end justify-start pl-8 pr-8 pb-8 font-[Marcellus] transition-all duration-300 group-hover:translate-y-[-12rem] ">
							<h2 class="text-5xl text-white ">
								Who <br> Are We
							</h2>
						</div>
						<div class="absolute inset-0 flex items-end justify-end pl-8 pr-8 pb-8 transition-all duration-300 group-hover:translate-y-[-12rem]">
							<NuxtImg
								class="w-[50px] h-[50px] transition-transform duration-300 group-hover:rotate-90"
								:src="ArrowIcon"
							/>
						</div>
						<!-- Animated on hover (pops from the bottom) -->
						<div class="absolute inset-x-0 bottom-0 flex items-end justify-start translate-y-8 opacity-0 scale-95 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pl-8 pr-8 pb-8">
							<p class="text-xl text-justify text-white">
								<!-- cahnge the text -->
								Lubis Santosa & Partners (formerly Lubis Santosa & Maramis), is one of the leading law firms in Indonesia. It was established in 1986 and has grown to become one of Indonesia's law firms with comprehensive range of practice.
							</p>
						</div>
					</nuxt-link>
				</div>

				<!-- Panel 2 -->
				<div class="relative bg-[url('~/assets/images/bg-practicearea.svg')] bg-cover bg-no-repeat bg-center flex-1 justify-items-stretch hover:cursor-pointer hover:flex-[2] transition-all duration-300 group overflow-hidden">
					<nuxt-link href="/practice-area">
						<div class="absolute inset-0 bg-[rgba(75,61,42,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<!-- Heading -->
						<div class="absolute inset-0 flex items-end justify-start pl-8 pr-8 pb-8 font-[Marcellus] transition-all duration-300 group-hover:translate-y-[-12rem] ">
							<h2 class="text-5xl text-white ">
								Practice <br> Area
							</h2>
						</div>
						<div class="absolute inset-0 flex items-end justify-end pl-8 pr-8 pb-8 transition-all duration-300 group-hover:translate-y-[-12rem]">
							<NuxtImg
								class="w-[50px] h-[50px] transition-transform duration-300 group-hover:rotate-90"
								:src="ArrowIcon"
							/>
						</div>
						<!-- Animated on hover (pops from the bottom) -->
						<div class="absolute inset-x-0 bottom-0 flex items-end justify-start translate-y-8 opacity-0 scale-95 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 pl-8 pr-8 pb-8">
							<p class="text-xl text-justify text-white">
								<!-- cahnge the text -->
								Lawyers at LSM are experts in their fields and are dedicated to providing the best legal services to our clients. We have a wide range of practice areas, and we work closely with our clients to understand their needs and provide tailored solutions.
							</p>
						</div>
					</nuxt-link>
				</div>

				<!-- Panel 3 -->
				<div class="relative bg-[url('~/assets/images/about-attorney.jpg')] bg-cover bg-no-repeat bg-center flex-1 justify-items-stretch hover:cursor-pointer hover:flex-[2] transition-all duration-300 group overflow-hidden">
					<nuxt-link href="/attorneys">
						<div class="absolute inset-0 bg-[rgba(75,61,42,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<!-- Heading -->
						<div class="absolute inset-0 flex items-end justify-start pl-8 pr-8 pb-8 font-[Marcellus] transition-all duration-300 group-hover:translate-y-[-12rem] ">
							<h2 class="text-5xl text-white ">
								Our <br> Attorneys
							</h2>
						</div>
						<div class="absolute inset-0 flex items-end justify-end pl-8 pr-8 pb-8 transition-all duration-300 group-hover:translate-y-[-12rem]">
							<NuxtImg
								class="w-[50px] h-[50px] transition-transform duration-300 group-hover:rotate-90"
								:src="ArrowIcon"
							/>
						</div>
						<!-- Animated on hover (pops from the bottom) -->
						<div class="absolute inset-x-0 bottom-0 flex items-end justify-start translate-y-8 opacity-0 scale-95 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 pl-8 pr-8 pb-8">
							<p class="text-xl text-justify text-white">
								<!-- cahnge the text -->
								We are dedicated to providing top-quality legal representation for our clients. Our attorneys are highly skilled and experienced in their respective areas of practice, and are committed to achieving the best possible outcomes for our clients.
							</p>
						</div>
					</nuxt-link>
				</div>
			</div>
		</section>

		<!-- Latest Content Section -->
		<section class="hidden md:block md:min-w-full">
			<div
				class="flex flex-nowrap h-[480px] w-full relative bg-no-repeat bg-center bg-cover items-center justify-center transition-all duration-300 group overflow-hidden"
				:style="{
					backgroundImage: latestContent?.image_url
						? `url(${latestContent.image_url})`
						: `url('/images/logo-lsm-main.svg')`,
				}"
			>
				<div class="flex items-center justify-start w-full h-full bg-[rgba(145,174,172,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 py-16 px-12">
					<!-- Heading -->
					<div class="flex flex-col items-center justify-center px-8 font-[Marcellus] transition-all duration-300 max-w-full">
						<h2 class="text-5xl text-white text-left">
							{{ latestContent?.title }}
						</h2>
						<div class="mt-4 flex flex-row items-center justify-start w-full translate-y-8 opacity-0 scale-95 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100">
							<div class="flex justify-center text-center text-sm text-[#DAB38D]">
								<NuxtLink
									type="button"
									class="mt-4 bg-white rounded-md px-10 py-4 hover:cursor-pointer"
									:href="`/blogs/${latestContent?.slug}`"
								>
									Read
								</NuxtLink>
							</div>
							<div class="ml-4 mt-4 flex items-center">
								<NuxtLink
									to="/blogs"
									class="text-sm text-white hover:cursor-pointer"
								>
									View All >>
								</NuxtLink>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="hidden md:block md:min-w-full">
			<div class="flex h-[442px] w-full">
				<!-- First Div: Clickable Background Image -->
				<div
					role="button"
					tabindex="0"
					class="flex flex-1 bg-no-repeat bg-center bg-cover cursor-pointer transition-all duration-500"
					:style="{ backgroundImage: `url(${contentOptions[currentOptionIndex]?.bgImage})` }"
					@click="cycleContent"
				/>
				<!-- Second Div: Text and Clickable Option -->
				<div class="flex flex-1 flex-col">
					<!-- First Child: Text Display -->
					<div class="basis-2/3 bg-[#4A3C32] flex flex-col  items-start justify-center px-20 transition-all duration-500">
						<p class="text-[#DAB38D] text-md font-semibold text-left font-[ubuntu] py-4">
							{{ contentOptions[currentOptionIndex]?.text }}
						</p>
						<p class="text-white text-3xl font-normal font-[Marcellus] text-left">
							{{ contentOptions[currentOptionIndex]?.paragraph }}
						</p>
					</div>
					<!-- Second Child: Clickable Text Option -->
					<div class="basis-1/3 bg-[#6A817F] font-[Marcellus] flex flex-row items-center justify-start px-20">
						<span
							role="button"
							tabindex="0"
							class="px-2 text-white text-3xl font-light opacity-50 cursor-pointer hover:opacity-100 transition-colors duration-200"
							:class="{ 'font-bold opacity-100': currentOptionIndex === 0 }"
							@click="setOption(0)"
							@keyup.enter="setOption(0)"
							@keyup.space="setOption(0)"
						>
							DR
						</span>
						<span
							role="button"
							tabindex="0"
							class="px-2 text-white text-3xl font-light opacity-50 cursor-pointer hover:opacity-100 transition-colors duration-200"
							:class="{ 'font-bold opacity-100': currentOptionIndex === 1 }"
							@click="setOption(1)"
							@keyup.enter="setOption(1)"
							@keyup.space="setOption(1)"
						>
							CC
						</span>
						<span
							role="button"
							tabindex="0"
							class="px-2 text-white text-3xl font-light opacity-50 cursor-pointer hover:opacity-100 transition-colors duration-200"
							:class="{ 'font-bold opacity-100': currentOptionIndex === 2 }"
							@click="setOption(2)"
							@keyup.enter="setOption(2)"
							@keyup.space="setOption(2)"
						>
							IP
						</span>
					</div>
				</div>
			</div>
		</section>
		<section class="hidden md:block sm:max-[hidden] max-w-7xl items-center justify-center mx-auto">
			<div class="flex flex-col h-172 w-full">
				<div class="flex flex-row items-center justify-between">
					<h1 class="text-3xl font-[Marcellus] text-left py-4">
						Partners
					</h1>
					<NuxtLink
						to="/attorneys"
						class="text-sm font-[Ubuntu] text-[#DAB38D] hover:cursor-pointer"
					>
						View All >
					</NuxtLink>
				</div>
			</div>
			<div class="flex items-center justify-center gap-8">
				<Partners
					v-for="(partner) in data?.data?.partners.data.slice(0, 4)"
					:key="partner.id"
					:image="partner.image_url"
					:name="partner.name"
					:linkedin="partner.linkedin_url"
					:email="partner.email"
					class="capitalize"
					:slug="partner.slug"
				/>
			</div>
		</section>
		<section class="hidden md:block sm:max-[hidden] md:min-w-full">
			<Reviews />
		</section>
		<!-- <section class="hidden md:block sm:max-[hidden] md:min-w-full">
			<div class="flex h-[265px] w-full items-center justify-center">
				Clients here!
			</div>
		</section> -->
	</div>
</template>

<style>
.banner {
	background: url('~/assets/images/banner1.svg') no-repeat center center;
	background-size: cover;
	height: 445px;
	display: flex;
	align-items: center;
	font-family: 'Philosopher', sans-serif;
	margin-right: 15px;
	margin-left: 15px;
	margin-bottom: 15px; /* Added margin-bottom */
	z-index: 0;
}
.banner-small {
	background: url('~/assets/images/banner1.svg') no-repeat center center;
	background-size: cover;
	height: 89px;
	display: flex;
	align-items: center;
	font-family: 'Philosopher', sans-serif;
	justify-content: left;
	margin-right: 15px;
	margin-left: 15px;
	margin-bottom: 15px;
	z-index: 0;
}
</style>
