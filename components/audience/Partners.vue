<template>
	<div>
		<!-- Desktop/Tablet View -->
		<div class="hidden md:block">
			<!-- Card -->
			<div>
				<div class="relative cursor-pointer group overflow-hidden">
					<img
						:src="image"
						alt="Profile photo"
						class="w-[375px] h-[433px] object-cover object-center transition duration-300 group-hover:opacity-70"
					>

					<!-- Nama & role -->
					<div class="mt-4 inset-0 flex items-end justify-center">
						<div class="text-center pb-6">
							<h3 class="text-xl font-[Marcellus] text-[#4B3D2A]">
								{{ name }}
							</h3>
							<p class="text-sm text-[#dab38d] tracking-widest mt-1">
								PARTNERS
							</p>
						</div>
					</div>

					<!-- Hover icons -->
					<div class="absolute bottom-[120px] right-10 flex space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
						<button class="w-10 h-10 bg-[#4B3D2A] text-white flex items-center justify-center rounded-full">
							<Icon
								name="mdi:linkedin"
								size="20"
							/>
						</button>
						<button class="w-10 h-10 bg-[#4B3D2A] text-white flex items-center justify-center rounded-full">
							<Icon
								name="mdi:email-outline"
								size="20"
							/>
						</button>
					</div>
				</div>
			</div>
		</div>

		<!-- Mobile View -->
		<div class="md:hidden flex flex-col space-y-3 ">
			<div class="relative cursor-pointer group overflow-hidden">
				<img
					:src="image"
					alt="Profile photo"
					class="w-full h-[338px] object-cover object-center transition duration-300 group-hover:opacity-70"
				>

				<!-- Nama & role -->
				<div class="mt-4 inset-0 flex items-end justify-center">
					<div class="text-center pb-6">
						<h3 class="text-1xl font-[Marcellus] text-[#4B3D2A]">
							{{ name }}
						</h3>
						<p class="text-sm text-[#dab38d] tracking-widest mt-1">
							PARTNERS
						</p>
					</div>
				</div>

				<!-- Hover icons -->
				<div class="absolute bottom-[120px] right-4 flex space-x-3 opacity-0 group-hover:opacity-100 transition duration-300">
					<button class="w-10 h-10 bg-[#4B3D2A] text-white flex items-center justify-center rounded-full">
						<Icon
							name="mdi:linkedin"
							size="20"
						/>
					</button>
					<button class="w-10 h-10 bg-[#4B3D2A] text-white flex items-center justify-center rounded-full">
						<Icon
							name="mdi:email-outline"
							size="20"
						/>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps({
	image: String,
	name: String,
})
</script>
