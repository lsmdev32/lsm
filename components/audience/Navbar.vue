<script setup lang="ts">
import HumbergerMenu from "~/components/audience/HumbergMenu.vue"
</script>

<template>
	<nav class="bg-white h-[100px] flex items-center justify-start">
		<div class="w-full px-2 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<div class="flex-shrink-0 pt-10 px-4">
					<NuxtImg
						class="lsm-logo-nav h-[44px] w-auto "
						src="https://ik.imagekit.io/in10rksrb/Group_U0FdwZWJX.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663914596318"
					/>
				</div>
				<div class="hidden sm:justify-center sm:text-center text-[#4B3D2A] md:flex space-x-8 pt-10">
					<NuxtLink
						to="#"
						style="font-size:medium;"
						class="pr-4 hover:text-[#DAB38D]"
					>
						About LSM
					</NuxtLink>
					<NuxtLink
						to="#"
						style="font-size:medium;"
						class="pr-4 hover:text-[#DAB38D]"
					>
						Practice Area
					</NuxtLink>
					<NuxtLink
						to="#"
						style="font-size:medium;"
						class="pr-4 hover:text-[#DAB38D]"
					>
						Attorneys
					</NuxtLink>
					<NuxtLink
						to="#"
						style="font-size:medium;"
						class="pr-4 hover:text-[#DAB38D]"
					>
						Publication
					</NuxtLink>
					<NuxtLink
						to="#"
						style="font-size:medium;"
						class="pr-4 hover:text-[#DAB38D]"
					>
						Blog
					</NuxtLink>
					<NuxtLink
						to="#"
						style="font-size:medium;"
						class="pr-4 hover:text-[#DAB38D]"
					>
						Contact Us
					</NuxtLink>
					<NuxtLink
						href="#"
						style="font-size:medium;"
						class="pr-8 hover:text-[#DAB38D]"
					>
						Career
					</NuxtLink>
				</div>
				<div class="md:hidden items-center">
					<HumbergerMenu />
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
