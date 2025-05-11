<script setup lang="ts">
import { NuxtImg } from "#components"
import ArrowSm from "~/assets/images/arrow-sm-icon.svg"
import PracticeAreaDetails from "~/components/audience/PracticeAreaDetails.vue"
</script>

<template>
	<div class="z-10">
		<!-- Mobile -->
		<section class="md:hidden ">
			<div class="flex flex-col items-start justify-center px-4 py-6 z-0">
				<div class="flex flex-col bg-[url('/images/img-practice-area.svg')] bg-no-repeat bg-cover justify-end items-start w-full h-[556px] p-4">
					<h1 class="text-4xl font-[marcellus] text-white">
						Practice Area
					</h1>
				</div>
			</div>
		</section>
		<section class="md:hidden py-3">
			<div class="flex flex-row px-4 py-6 gap-44 z-0 w-full">
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
		<section class="md:hidden">
			<PracticeAreaDetails />
		</section>
		<section class="md:hidden items-center justify-center w-full">
			<div class="items-center justify-center">
				Publications And News Here!
			</div>
		</section>
		<!-- Desktop -->
		<section class="hidden md:flex w-full h-120 justify-center z-0 py-8">
			<div class="flex flex-row items-stretch justify-between max-w-7xl py-4">
				<div class="basis-1/2 flex flex-col max-w-xl h-auto">
					<div class="flex">
						<p class="text-5xl font-[marcellus] text-[#DAB38D]">
							Practice Area
						</p>
					</div>
				</div>
				<div class="basis-1/2 flex flex-col">
					<div class="flex pr-8 max-w-4xl mr-auto text-left">
						<h1 class="text-lg font-[marcellus] text-[#949494]">
							Lawyers at LSM are experts in their fields and are dedicated to providing the best legal services to our clients. We have a wide range of practice areas, and we work closely with our clients to understand their needs and provide tailored solutions.
						</h1>
					</div>
				</div>
			</div>
		</section>
		<section class="hidden md:flex w-full h-120 z-0 pb-8">
			<div class="flex flex-row justify-between w-full">
				<div class="basis-1/2 max-w-4xl flex flex-col h-auto pl-32">
					<div class="flex">
						<NuxtImg
							class="w-auto h-[60px]"
							:src="ArrowSm"
						/>
					</div>
				</div>
				<div class="basis-1/2 flex flex-col">
					<div class="flex min-w-full items-center">
						<img
							src="../assets/about-1.png"
							alt=""
							class="min-w-full h-80 object-cover"
						>
						<!-- <NuxtImg
          class="w-auto h-[60px] mt-4"
          :src="ImgPA"
        /> -->
					</div>
				</div>
			</div>
		</section>
		<section class="hidden md:flex w-full h-120 z-0">
			<PracticeAreaDetails />
		</section>
	</div>
</template>
