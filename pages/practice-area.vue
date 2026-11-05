<script setup lang="ts">
import { NuxtImg } from "#components";
// import ArrowSm from "~/assets/images/arrow-sm-icon.svg"
import PracticeAreaDetails from "~/components/audience/PracticeAreaDetails.vue";
</script>

<template>
  <div class="z-10">
    <!-- Mobile -->
    <section class="md:hidden">
      <div class="z-0 flex flex-col items-start justify-center px-4 py-6">
        <div
          class="flex h-[556px] w-full flex-col items-start justify-end bg-[url('/images/practice-area-1-sm.jpg')] bg-cover bg-center bg-no-repeat p-4"
        >
          <h1 class="font-[marcellus] text-4xl text-white">Practice Area</h1>
        </div>
      </div>
    </section>
    <section class="py-3 md:hidden">
      <div class="z-0 flex w-full flex-row gap-44 px-4 py-6">
        <!-- <div class="flex-1/3">
					<NuxtImg
						class="w-4 h-6 mt-4"
						:src="ArrowSm"
					/>
				</div> -->
        <div class="z-0 flex flex-col items-start justify-stretch">
          <div class="flex-1">
            <p
              class="text-justify font-[Ubuntu] text-xl font-light text-[#4B3D2A]"
            >
              Lawyers at LSM are experts in their fields and are dedicated to
              providing the best legal services to our clients. We have a wide
              range of practice areas, and we work closely with our clients to
              understand their needs and provide tailored solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
    <section class="w-full items-center justify-center md:hidden">
      <div class="mx-auto w-full sm:px-6 lg:px-8">
        <PracticeAreaDetails />
      </div>
    </section>
    <!-- <section class="md:hidden items-center justify-center w-full">
			<div class="w-full mx-auto sm:px-6 lg:px-8">
				<h1 class="text-3xl font-[Marcellus] text-center py-4">
					Publications
				</h1>
			</div>
			<div class="items-center justify-center px-6 py-6 z-0">
				<Publications :publications="contents" />
			</div>
		</section> -->
    <!-- <section class="md:hidden items-center justify-center w-full">
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
		</section> -->
    <!-- Desktop -->
    <section class="hidden md:block">
      <div
        class="z-0 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-2 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8"
      >
        <!-- Left column with title and arrow -->
        <div class="relative">
          <h2
            class="font-[Marcellus] text-5xl font-light"
            style="color: #dab38d"
          >
            Practice Area
          </h2>
          <!-- <div class="max-w-7xl mx-auto md:mt-28 lg:mt-16 ">
						<img
							src="../assets/Arrow 1.png"
							height="60px"
							alt=""
							style=""
						>
					</div> -->
        </div>
        <!-- Right column with content -->
        <div class="space-y-8">
          <!-- Top description -->
          <div class="mb-8">
            <p class="font-[Ubuntu] leading-relaxed font-light text-gray-500">
              Lawyers at LSM are experts in their fields and are dedicated to
              providing the best legal services to our clients. We have a wide
              range of practice areas, and we work closely with our clients to
              understand their needs and provide tailored solutions.
            </p>
          </div>
        </div>
      </div>
      <div class="z-0 grid grid-cols-1 gap-12 md:grid-cols-2">
        <!-- Left column with Down arrow -->
        <div />
        <!-- Right column with content -->
        <div class="space-y-8">
          <!-- Image section -->
          <div class="h-64 w-full overflow-hidden md:h-72 lg:h-72">
            <img
              src="/images/practice-area-1.jpg"
              alt=""
              class="h-full w-full -scale-x-100 transform object-cover object-left-top"
            />
          </div>
        </div>
      </div>
    </section>
    <section class="z-0 mt-4 hidden h-120 w-full md:flex">
      <PracticeAreaDetails />
    </section>
    <!-- <div class="hidden md:flex max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
			<h1 class="text-3xl font-[Marcellus] text-left py-4">
				Publications
			</h1>
		</div>
		<section class="hidden md:flex w-full justify-center items-center h-120 z-0 mt-4">
			<div class="flex max-w-7xl items-center justify-center gap-8 mx-auto">
				<Publications :publications="limitedPublications" />
			</div>
		</section> -->
    <!-- <div class="hidden md:flex max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-4">
			<h1 class="text-3xl font-[Marcellus] text-left py-4">
				Our Attorneys
			</h1>
		</div> -->
    <!-- <section class="hidden md:flex items-center justify-center w-full h-120 z-0 mt-4">
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
		</section> -->
  </div>
</template>
