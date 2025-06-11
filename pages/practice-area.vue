<script setup lang="ts">
import { NuxtImg } from "#components"
import ArrowSm from "~/assets/images/arrow-sm-icon.svg"
import PracticeAreaDetails from "~/components/audience/PracticeAreaDetails.vue"
import Publications from "~/components/audience/Publications.vue"
import Partners from "~/components/audience/Partners.vue"

const { data } = await useCustomFetch("/rest/page-data/practice-areas")
const contents = data?.data?.news_and_publications?.data ?? []
const attorneys = data?.data?.our_attorneys?.data ?? []

const limitedPublications = contents.slice(0, 3)

console.log(contents)
console.log(attorneys)
</script>

<template>
	<div class="z-10">
		<!-- Mobile -->
		<section class="md:hidden ">
			<div class="flex flex-col items-start justify-center px-6 py-6 z-0">
				<div class="flex flex-col bg-[url('/images/img-practice-area.svg')] bg-no-repeat bg-cover justify-end items-start w-full h-[556px] p-4">
					<h1 class="text-4xl font-[marcellus] text-white">
						Practice Area
					</h1>
				</div>
			</div>
		</section>
		<section class="md:hidden py-3">
			<div class="flex flex-row px-6 py-6 gap-44 z-0 w-full">
				<div class="flex-1/3">
					<NuxtImg
						class="w-4 h-6 mt-4"
						:src="ArrowSm"
					/>
				</div>
				<div class="flex flex-col items-start justify-stretch z-0 w-2/3">
					<div class="flex-1">
						<p class="text-xl font-[Ubuntu] font-light text-left text-[#4B3D2A]">
							Lawyers at LSM are experts in their fields and are
							dedicated to providing the best legal services to our
							clients. We have a wide range of practice areas, and we
							work closely with our clients to understand their needs
							and provide tailored solutions.
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="md:hidden items-center justify-center w-full">
			<div class="w-full mx-auto sm:px-6 lg:px-8">
				<PracticeAreaDetails />
			</div>
		</section>
		<section class="md:hidden items-center justify-center w-full">
			<div class="w-full mx-auto sm:px-6 lg:px-8">
				<h1 class="text-3xl font-[Marcellus] text-center py-4">
					Publications
				</h1>
			</div>
			<div class="items-center justify-center px-6 py-6 z-0">
				<Publications :publications="contents" />
			</div>
		</section>
		<section class="md:hidden items-center justify-center w-full">
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
		<section class="hidden md:block">
			<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 md:pt-16 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with title and arrow -->
				<div class="relative">
					<h2
						class="text-5xl font-light font-[Marcellus]"
						style="color: #DAB38D;"
					>
						Practice Area
					</h2>
					<div class="max-w-7xl mx-auto md:mt-28 lg:mt-16 ">
						<img
							src="../assets/Arrow 1.png"
							height="60px"
							alt=""
							style=""
						>
					</div>
				</div>
				<!-- Right column with content -->
				<div class="space-y-8 ">
					<!-- Top description -->
					<div class="mb-8">
						<p class="text-gray-500 leading-relaxed font-[Ubuntu] font-light">
							Lawyers at LSM are experts in their fields and are dedicated to providing the best legal services to our clients. We have a wide range of practice areas, and we work closely with our clients to understand their needs and provide tailored solutions.
						</p>
					</div>
				</div>
			</div>
			<div class="z-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:mt-[-70px] lg:mt-[-70px]">
				<!-- Left column with Down arrow -->
				<div />
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Image section -->
					<div class="w-full h-64 md:h-72 lg:h-72 overflow-hidden">
						<img
							src="../assets/about-1.png"
							alt=""
							class="w-full h-full object-cover transform -scale-x-100"
						>
					</div>
				</div>
			</div>
		</section>
		<section class="hidden md:flex w-full h-120 z-0 mt-4">
			<PracticeAreaDetails />
		</section>
		<div class="hidden md:flex max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-[Marcellus] text-left py-4">
				Publications
			</h1>
		</div>
		<section class="hidden md:flex w-full justify-center items-center h-120 z-0 mt-4">
			<div class="flex max-w-7xl items-center justify-center gap-8 mx-auto">
				<Publications :publications="limitedPublications" />
			</div>
		</section>
		<div class="hidden md:flex max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-4">
			<h1 class="text-3xl font-[Marcellus] text-left py-4">
				Our Attorneys
			</h1>
		</div>
		<section class="hidden md:flex items-center justify-center w-full h-120 z-0 mt-4">
			<div class="flex max-w-7xl items-center justify-center gap-8 mx-auto">
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
	</div>
</template>
