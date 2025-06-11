<template>
	<div>
		<!-- Desktop/Tablet View -->
		<div class="hidden md:block">
			<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
				<a
					:href="`/practice-area?category=${0}`"
					class="block"
				>
					<div
						class="w-full h-[374px] relative cursor-pointer bg-[url('~/assets/homepage-1.svg')] hover:bg-[url('~/assets/hover-homepage-1.svg')] bg-cover transition-all duration-300 group overflow-hidden"
					>
						<div class="inline-block cursor-pointer group">
							<span class="absolute bottom-[10%] left-10 text-white text-5xl font-normal font-marcellus block transition-opacity duration-300 group-hover:opacity-0">DR</span>
							<span class="absolute bottom-[10%] left-10 text-white text-5xl font-normal font-marcellus flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">Dispute Resolution</span>
						</div>
					</div>
				</a>
				<a
					:href="`/practice-area?category=${1}`"
					class="block"
				>
					<div
						class="w-full h-[374px] relative cursor-pointer bg-[url('~/assets/homepage-2.svg')] hover:bg-[url('~/assets/hover-homepage-2.svg')] bg-cover transition-all duration-300 group overflow-hidden"
					>
						<div class="inline-block cursor-pointer group">
							<span class="absolute bottom-[10%] left-10 text-white text-5xl font-normal font-marcellus block transition-opacity duration-300 group-hover:opacity-0">CC</span>
							<span class="absolute bottom-[10%] left-10 text-white text-5xl font-normal font-marcellus flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">Corparate Commercial</span>
						</div>
					</div>
				</a>
				<a
					:href="`/practice-area?category=${2}`"
					class="block"
				>
					<div
						class="w-full h-[374px] relative cursor-pointer bg-[url('~/assets/homepage-3.svg')] hover:bg-[url('~/assets/hover-homepage-3.svg')] bg-cover transition-all duration-300 group overflow-hidden"
					>
						<div class="inline-block cursor-pointer group">
							<span class="absolute bottom-[10%] left-10 text-white text-5xl font-normal font-marcellus block transition-opacity duration-300 group-hover:opacity-0">IP</span>
							<span class="absolute bottom-[10%] left-10 text-white text-5xl font-normal font-marcellus flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">Intelectual Property</span>
						</div>
					</div>
				</a>
			</div>
		</div>

		<!-- Mobile View -->
		<div class="md:hidden flex flex-col space-y-3 ">
			<a
				:href="`/practice-area?category=${0}`"
				class="block"
			>
				<div
					class="w-full h-[89px] relative cursor-pointer bg-[url('~/assets/mobile-about-1.svg')] bg-cover "
				>
					<div class="absolute top-1/2 left-[3%] transform -translate-y-1/2 text-white text-2xl font-marcellus">
						Dispute Resolution
					</div>
				</div>
			</a>
			<a
				:href="`/practice-area?category=${1}`"
				class="block"
			>
				<div
					class="w-full h-[89px] relative cursor-pointer bg-[url('~/assets/mobile-about-2.svg')] bg-cover"
				>
					<div class="absolute top-1/2 left-[3%] transform -translate-y-1/2 text-white text-2xl font-marcellus">
						Corporate Commercial
					</div>
				</div>
			</a>
			<a
				:href="`/practice-area?category=${2}`"
				class="block"
			>
				<div
					class="w-full h-[89px] relative cursor-pointer bg-[url('~/assets/mobile-about-3.svg')] bg-cover"
				>
					<div class="absolute top-1/2 left-[3%] transform -translate-y-1/2 text-white text-2xl font-marcellus">
						Intellectual Property
					</div>
				</div>
			</a>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from "vue-router"

const router = useRouter()

const goToPractice = (id) => {
	router.push(`/practice?exp=${id}`)
}
</script>

  <style scoped>
  /* Font import - consider moving this to a global CSS file if used across components */
  .font-marcellus {
    font-family: 'Marcellus', serif;
  }
  </style>
