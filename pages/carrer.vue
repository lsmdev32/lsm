<script setup lang="ts">
import { NuxtImg } from "#components"
import CheckIc from "~/assets/images/check-icon.svg"
</script>

<template>
	<div>
		<!-- Mobile -->
		<section class="md:min-w-full md:hidden">
			<div class="flex flex-col items-start justify-center px-4 py-6 z-0">
				<div class="flex-1">
					<h1 class="text-4xl font-[marcellus] text-[#4B3D2A]">
						Carrer
					</h1>
					<p class="mt-6 text-xl font-[Ubuntu] font-light text-left text-[#4B3D2A]">
						LUBIS, SANTOSA & MARAMIS (LSM) is a leading Indonesia law firm with strong dispute
						resolution and corporate & commercial practices, providing assistance to a wide range of
						clients throughout Indonesia and abroad including individuals, corporations, major governmental
						and private financial institutions and large, medium and small businesses.
					</p>
					<h1 class="mt-6 text-4xl font-[marcellus] text-[#DAB38D]">
						Lawyers
					</h1>
					<p class="mt-6 text-xl font-[Ubuntu] font-light text-left text-[#4B3D2A]">
						LSM is looking for outstanding lawyers to join our Dispute Resolution (DR) and
						Corporate & Commercial (CC) Practice. The applications must have:
						<br>
						<br>
						Requirements:
					</p>
					<div class="flex flex-col mt-6 text-lg font-[Ubuntu] font-light text-left text-[#4B3D2A] list-disk list-inside">
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>a Law Degree (Sarjana Hukum), with impressive academic record.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>an advocates license.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>commitment to provide best services to clients.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>an excellent English speaking and writing skills.</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="md:min-w-full md:hidden">
			<div class="flex flex-col px-4 py-4 z-0">
				<div class="flex-1 w-full">
					<input
						type="text"
						placeholder="Name*"
						class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
					>
				</div>
				<div class="flex-1 w-full">
					<input
						type="text"
						placeholder="Email*"
						class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
					>
				</div>
				<div class="flex-1 w-full">
					<input
						type="text"
						placeholder="Subject*"
						class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
					>
				</div>
				<div class="flex-1 w-full items-start">
					<textarea
						class="w-full py-3 px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
						placeholder="Please describe your interest in joining LSM*"
						:rows="4"
						required
					/>
				</div>
			</div>
			<div class="flex flex-1 font-[Ubuntu] font-light text-white items-center justify-start px-4 pb-20 z-0">
				<button
					type="button"
					class="mt-4 bg-[#4B3D2A] rounded-md px-10 py-4 hover:cursor-pointer"
				>
					Submit
				</button>
			</div>
		</section>
		<!-- Desktop -->
		<section class="hidden md:flex flex-row md:min-w-full justify-center items-start px-16 py-16 gap-6">
			<div class="flex flex-col px-4 py-6 z-0 w-1/2">
				<div class="flex-1">
					<h1 class="text-4xl font-[marcellus] text-[#4B3D2A]">
						Carrer
					</h1>
					<p class="mt-6 text-xl font-[Ubuntu] font-light text-left text-[#4B3D2A]">
						LUBIS, SANTOSA & MARAMIS (LSM) is a leading Indonesia law firm with strong dispute
						resolution and corporate & commercial practices, providing assistance to a wide range of
						clients throughout Indonesia and abroad including individuals, corporations, major governmental
						and private financial institutions and large, medium and small businesses.
					</p>
				</div>
				<div class="flex flex-row w-full gap-6 mt-6">
					<div class="flex-1 w-1/2">
						<input
							type="text"
							placeholder="Name*"
							class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
						>
					</div>
					<div class="flex-1 w-1/2">
						<input
							type="text"
							placeholder="Email*"
							class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
						>
					</div>
				</div>
				<div class="flex-1 w-full">
					<input
						type="text"
						placeholder="Subject*"
						class="w-full h-[55px] px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
					>
				</div>
				<div class="flex-1 w-full items-start">
					<textarea
						class="w-full py-3 px-8 mt-6 text-lg bg-[#F5F5F5] font-[Ubuntu] font-light text-[#4B3D2A] border-0 border-[#4B3D2A] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DAB38D]"
						placeholder="Please describe your interest in joining LSM*"
						:rows="4"
						required
					/>
				</div>
			</div>
			<div class="flex flex-col px-4 py-6 z-0 w-1/2">
				<div class="flex-1">
					<h1 class=" text-4xl font-[marcellus] text-[#DAB38D]">
						Lawyers
					</h1>
					<p class="mt-6 text-xl font-[Ubuntu] font-light text-left text-[#4B3D2A]">
						LSM is looking for outstanding lawyers to join our Dispute Resolution (DR) and
						Corporate & Commercial (CC) Practice. The applications must have:
						<br>
						<br>
						Requirements:
					</p>
					<div class="flex flex-col mt-6 text-lg font-[Ubuntu] font-light text-left text-[#4B3D2A] list-disk list-inside">
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>a Law Degree (Sarjana Hukum), with impressive academic record.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>an advocates license.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>commitment to provide best services to clients.</div>
						</div>
						<div class="flex flex-row items-center">
							<NuxtImg
								:src="CheckIc"
								alt="point"
								width="20"
								height="20"
								class="mr-2"
							/>
							<div>an excellent English speaking and writing skills.</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
