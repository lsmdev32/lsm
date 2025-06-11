<script setup lang="ts">
import LogLSM from "~/assets/images/logo-lsm-main.svg"
import HumbergerMenu from "~/components/audience/HumbergMenu.vue"
</script>

<template>
	<nav class="flex fixed justify-between w-full items-center bg-white h-[80px] shadow-sm z-50">
		<div class="w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
			<div class="w-full max-w-7xl mx-auto">
				<div class="flex justify-between items-center h-16">
					<div class="flex-shrink-0 lg:pr-4">
						<NuxtLink
							to="/"
							class="flex items-center hover:cursor-pointer"
						>
							<NuxtImg
								class="lsm-logo-nav h-[36px] w-auto lg:h-[44px] lg:w-[auto]"
								to="/"
								:src="LogLSM"
							/>
						</NuxtLink>
					</div>
					<div class="hidden sm:justify-center sm:text-center text-[#4B3D2A] lg:flex space-x-4">
						<NuxtLink
							to="/about"
							style="font-size:medium;"
							class="pr-4 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							About LSM
						</NuxtLink>
						<NuxtLink
							to="/practice-area"
							style="font-size:medium;"
							class="pr-4 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							Practice Area
						</NuxtLink>
						<NuxtLink
							to="/attorneys"
							style="font-size:medium;"
							class="pr-4 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							Attorneys
						</NuxtLink>
						<NuxtLink
							to="/publications"
							style="font-size:medium;"
							class="pr-4 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							Publication
						</NuxtLink>
						<NuxtLink
							to="/blogs"
							style="font-size:medium;"
							class="pr-4 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							Blog
						</NuxtLink>
						<NuxtLink
							to="/contact-us"
							style="font-size:medium;"
							class="pr-4 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							Contact Us
						</NuxtLink>
						<NuxtLink
							href="/career"
							style="font-size:medium;"
							class="pr-8 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							Career
						</NuxtLink>
					</div>
					<div class="md:hidden items-center hover:cursor-pointer">
						<HumbergerMenu />
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<style scoped>
	.NuxtLink {
		color: #4B3D2A;
	}
</style>
