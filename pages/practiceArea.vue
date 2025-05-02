<script lang="ts">
import { NuxtImg } from "#components"
import ArrowSm from "~/assets/images/arrow-sm-icon.svg"
</script>

<template>
	<div class="z-10">
		<!-- Mobile -->
		<section class="md:hidden ">
			<div class="flex flex-col items-start justify-center px-4 py-6 z-0">
				<div class="flex flex-col bg-[url('~/assets/images/banner1.svg')] justify-end items-start w-full h-[556px] p-4">
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
						class="w-6 h-12 mt-4"
						:src="ArrowSm"
						alt="Arrow"
					/>
				</div>
				<div class="flex flex-col justify-stretch z-0 w-2/3">
					<div class="flex-1">
						<p class="mt-6 text-xl font-[Ubuntu] font-light text-left text-[#4B3D2A]">
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
	</div>
</template>
