<script setup lang="ts">
import ArrowIcon from "~/assets/images/arrow-icon.svg"
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
		<section class="md:min-w-full md:hidden">
			<div class="banner-small pl-[30px] z-0">
				<div>
					<h2 class="text-2xl text-white">
						Dispute Resolution
					</h2>
				</div>
			</div>
		</section>
		<section class="md:min-w-full md:hidden">
			<div class="banner-small sm:w-auto pl-[30px] z-0">
				<div>
					<h2 class="text-2xl text-white">
						Corporate Commercial
					</h2>
				</div>
			</div>
		</section>
		<section class="md:min-w-full md:hidden">
			<div class="banner-small sm:h-[445px] sm:w-auto pl-[30px] z-0">
				<div>
					<h2 class="text-2xl text-white">
						Intelectual Property
					</h2>
				</div>
			</div>
		</section>

		<section class="sm:justify-center md:hidden md:min-w-full">
			<h1 class="text-3xl font-[philosopher] text-center pt-[15px] pb-[30px]">
				News and Publication
			</h1>
		</section>

		<!-- News and Publication Section here! -->
		<section class="sm:justify-center md:hidden md:min-w-full">
			<h1 class="text-3xl font-[philosopher] text-center pt-[15px] pb-[30px]">
				Our Attorneys
			</h1>
		</section>
		<!-- Our Attorneys Section -->

		<!-- Website -->
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
		<section class="visible sm:max-[hidden] md:min-w-full">
			<div class="flex h-[480px] w-full">
				<!-- Panel 1 -->
				<div class="relative bg-[url('~/assets/images/banner1.svg')] bg-no-repeat bg-center flex-1 justify-items-stretch hover:cursor-pointer hover:flex-[2] hover:bg-[url('~/assets/images/banner1.svg'),rgba(218,179,141,0.5)] transition-all duration-300 group overflow-hidden">
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p>
					</div>
				</div>

				<!-- Panel 2 -->
				<div class="relative bg-[url('~/assets/images/banner1.svg')] bg-no-repeat bg-center flex-1 justify-items-stretch hover:cursor-pointer hover:flex-[2] transition-all duration-300 group overflow-hidden">
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p>
					</div>
				</div>

				<!-- Panel 3 -->
				<div class="relative bg-[url('~/assets/images/banner1.svg')] bg-no-repeat bg-center flex-1 justify-items-stretch hover:cursor-pointer hover:flex-[2] transition-all duration-300 group overflow-hidden">
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
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
						</p>
					</div>
				</div>
			</div>
		</section>
		<section class="hidden md:block md:min-w-full">
			<div class="flex h-[480px] w-full relative bg-[url('~/assets/images/banner1.svg')] bg-no-repeat bg-center flex-1 justify-items-stretch hover:cursor-pointer hover:flex-[2] hover:bg-[url('~/assets/images/banner1.svg'),rgba(218,179,141,0.5)] transition-all duration-300 group overflow-hidden">
				<div class="absolute inset-0 flex items-center justify-start bg-[rgba(106,129,127,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
					<!-- Heading -->
					<div class="flex flex-col items-start justify-center pl-8 pr-8 font-[Marcellus] transition-all duration-300 group-hover:block max-w-md">
						<h2 class="text-4xl text-white">
							News Title: Lorem ipsum dolor sit amet,<br> consectetur adipiscing elit.
						</h2>
						<!-- Animated on hover (pops from the bottom) -->
						<div class="mt-4 translate-y-8 opacity-0 scale-95 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100">
							<p class="text-xl text-left text-white">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
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
