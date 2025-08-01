<script setup lang="ts">
import { NuxtLink } from "#components"

const images = [
	"/images/bedge1.png",
	"/images/bedge2.png",
	"/images/bedge3.png",
	"/images/bedge4.png",
	"/images/bedge5.png",
	"/images/bedge6.png",
]
</script>

<template lang="html">
	<div>
		<!-- Mobile -->
		<section class="md:min-w-full md:hidden">
			<div class="banner">
				<div class="flex flex-col items-start justify-start text-left pl-[30px] py-[30px] md:pl-12 ">
					<div>
						<h1 class="text-6xl text-white ">
							Lubis,<br> Santosa <br>& Partners
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

		<!-- Desktop -->
		<section class="hidden md:flex justify-center items-center md:min-w-full">
			<div class="flex bg-[url('images/gambar-utama.jpg')] bg-no-repeat bg-center bg-cover items-end justify-start text-left w-full h-[575px] pl-[30px] py-[30px] md:pl-12">
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
		<section class="hidden md:flex justify-center items-center md:min-w-full">
			<div class="flex h-64 max-w-7xl items-center justify-center gap-x-4">
				<div
					v-for="(image, index) in images"
					:key="index"
					class="flex flex-row items-center justify-center "
				>
					<img
						:src="image"
						:alt="`Badge ${index + 1}`"
						class="h-37 w-44 object-center"
					>
				</div>
			</div>
		</section>
		<section class="hidden md:block">
			<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 md:pt-16 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with title and arrow -->
				<div class="relative">
					<h2
						class="text-5xl font-light font-[Marcellus]"
						style="color: #DAB38D;"
					>
						ABOUT
						<br>
						LSM
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
				<div class="space-y-8 ">
					<!-- Top description -->
					<div class="mb-8">
						<p class="text-gray-500 leading-relaxed font-[Ubuntu] font-light">
							Founded in 1986, our law firm has built a legacy of excellence as a pioneer in groundbreaking litigation cases. Renowned for our innovative approach and creative legal strategies, we have consistently delivered exceptional results in complex and high-stakes disputes.
						</p>
					</div>
				</div>
			</div>
			<div class="z-0 grid grid-cols-1 md:grid-cols-2 gap-12 ">
				<!-- Left column with Down arrow -->
				<div />
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Image section -->
					<div class="w-full h-64 md:h-72 lg:h-72 overflow-hidden">
						<img
							src="/images/about-lsm.jpg"
							alt=""
							class="w-full h-full object-cover transform -scale-x-100"
						>
					</div>
				</div>
			</div>
			<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 md:pt-16 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with content -->
				<div class="space-y-8">
					<!-- Two paragraphs of text -->
					<div class="space-y-8 ">
						<p class="text-gray-500 leading-relaxed font-[Ubuntu]">
							Our comprehensive legal services encompass a wide spectrum of areas, including civil, commercial, administrative, constitutional, and criminal litigation. We are dedicated to managing each type of case with expertise and diligence, ensuring that our clients receive the highest level of representation. Whether we are navigating complex commercial disputes or defending constitutional rights, our attorneys are unwavering in their commitment to achieving successful outcomes that are tailored to the unique needs of each client. Additionally, we are passionate about handling public interest cases and advocating for public policy, striving for impactful legal outcomes that contribute to societal progress. Guided by unwavering integrity, we uphold the highest ethical standards in every case we take on.
						</p>
						<p class="text-gray-500 leading-relaxed font-[Ubuntu]">
							We serve with heart by putting our clients’ interests as our main priority. Anticipating and providing what our clients’ needs are what we do.
						</p>
					</div>
				</div>
				<!-- Right column with Light gray text -->
				<div class="">
					<p class="text-3xl font-light text-gray-300 leading-relaxed font-[Marcellus]">
						We are committed to providing responsive attorneys, efficiently managed transactions and cases that meet the needs of our Clients
					</p>
				</div>
			</div>
			<div class="container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16 ">
				<ThreePic />
			</div>
			<!-- <div class="mt-8 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8  z-0 grid grid-cols-1 md:grid-cols-2 gap-12"> -->
			<!-- Left column with Light gray text -->
			<!-- <div
					class="container d-flex justify-content-between align-items-center"
					style=""
				>
					<img
						class="image-bottom"
						src="../assets/images/about-attorney.jpg"
					>
				</div> -->

			<!-- Right column with content -->
			<!-- <div class="space-y-8 flex flex-col justify-center"> -->
			<!-- Two paragraphs of text -->
			<!-- <div class="w-full ">
						<div class="text-gray-500 leading-relaxed font-[Ubuntu]">
							Lubis Santosa & Partners believes that Client’s trust is responsibility. We perform our responsibilities and earn our client’s trust through the application of knowledge, diligence and creative thinking. At Lubis Santosa & Maramis, we help businesses build, manage and profit.
						</div>
						<div class="flex items-start justify-start mt-4">
							<NuxtLink
								type="button"
								class="w-[40%] bg-[#4B3D2A] text-[#DAB38D] px-3 py-5 rounded-[10px] text-[14px] font-medium text-center cursor-pointer justify-center md:py-5 sm:py-4 mt-16"
								to="/attorneys"
							>Our Attorneys</NuxtLink>
						</div>
					</div>
				</div>
			</div> -->

			<div class="last-section  px-2 sm:px-6 lg:px-8 md:pt-16 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with Text -->
				<div class="relative">
					<div
						class="font-[Marcellus] last-section-text "
						style=""
					>
						Download Company Profile of
						<br>
						Lubis, Santosa & Partners here
					</div>
				</div>
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Button -->
					<NuxtLink
						type="button"
						class="custom-button-about d-flex font-[Ubuntu]"
						to="https://firebasestorage.googleapis.com/v0/b/lsm-develop-a1e58.firebasestorage.app/o/global_static%2F20240718%20-%20LSM%20-%20Firm%20Profile%20Capability%20Statement.pdf?alt=media&token=0ab68c79-3d89-4194-a66c-cc8438eed494"
					>
						<span>Download Company Profile</span>
					</NuxtLink>
				</div>
			</div>
		</section>
		<!-- Mobile -->
		<section class="md:hidden">
			<div class="flex flex-col items-center px-4 py-6 space-y-4">
				<!-- Gambar dengan ABOUT LSM -->
				<div class="relative w-full">
					<img
						src="/images/about-lsm.jpg"
						alt=""
						class="w-full h-auto object-cover"
					>
					<h2 class="absolute bottom-6 left-6 text-white text-3xl font-[Marcellus] font-light">
						ABOUT LSM
					</h2>
				</div>
				<div>
					<!-- Body Text -->
					<p class="text-md md:text-base text-justify text-gray-500 leading-6 max-w-2xl ">
						Founded in 1986, our law firm has built a legacy of excellence as a pioneer in groundbreaking litigation cases. Renowned for our innovative approach and creative legal strategies, we have consistently delivered exceptional results in complex and high-stakes disputes.	
					</p>
					<br>
					<p class="text-md md:text-base text-justify text-gray-500 leading-6 max-w-2xl ">
						Our comprehensive legal services encompass a wide spectrum of areas, including civil, commercial, administrative, constitutional, and criminal litigation. We are dedicated to managing each type of case with expertise and diligence, ensuring that our clients receive the highest level of representation. Whether we are navigating complex commercial disputes or defending constitutional rights, our attorneys are unwavering in their commitment to achieving successful outcomes that are tailored to the unique needs of each client. Additionally, we are passionate about handling public interest cases and advocating for public policy, striving for impactful legal outcomes that contribute to societal progress. Guided by unwavering integrity, we uphold the highest ethical standards in every case we take on.
					</p>
					<br>
					<p class="text-md md:text-base text-justify text-gray-500 leading-6 max-w-2xl ">
						We serve with heart by putting our clients’ interests as our main priority. Anticipating and providing what our clients’ needs are what we do.
					</p>
				</div>
				<div class="flex gap-6">
					<!-- Panah -->
					<!-- <div class="">
						<img
							src="../assets/Arrow 1.png"
							alt=""
							style="height: 34px; width: 16px;"
						>
					</div> -->

					<!-- Deskripsi -->
					<p class="text-[#D9B28C] text-lg text-justify font-[Marcellus] eading-relaxed">
						We are committed to providing responsive attorneys, efficiently managed transactions and cases that meet the needs of our Clients
					</p>
				</div>
			</div>
			<div>
				<div class="mt-8 grid-cols-1 gap-12">
					<!-- Left column with Light gray text -->
					<!-- <div
						class="w-full h-auto relative bg-cover overflow-hidden"
						style=""
					>
						<img
							class="w-full h-auto object-cover"
							src="../assets/images/about-attorney.jpg"
						>
					</div> -->

					<!-- Right column with content -->
					<!-- <div class="space-y-8 mt-4 flex flex-col"> -->
					<!-- Two paragraphs of text -->
					<!-- <div class="flex flex-col items-center px-4 py-4 space-y-4 text-md md:text-base text-gray-500 leading-6 max-w-2xl">
							<div class="font-[Ubuntu]">
								Lubis Santosa & Partners believes that Client’s trust is responsibility. We perform our responsibilities and earn our client’s trust through the application of knowledge, diligence and creative thinking. At Lubis Santosa & Maramis, we help businesses build, manage and profit.
							</div>
						</div>
					</div>
					<div class="flex flex-col items-center justify-center mt-4">
						<NuxtLink
							type="button"
							class="w-[40%] bg-[#4B3D2A] text-[#DAB38D] px-3 py-5 rounded-[10px] text-[14px] font-medium text-center cursor-pointer justify-center md:py-5 sm:py-4"
							to="/attorneys"
						>Our Attorneys</NuxtLink>
					</div>
				</div> -->
					<div class="last-section  z-0 grid grid-cols-1 ">
						<!-- Left column with Text -->
						<div class="relative">
							<div
								class="font-[Marcellus] last-section-text "
								style=""
							>
								Download Company Profile of
								<br>
								Lubis, Santosa & Partners here
							</div>
						</div>
						<!-- Right column with content -->
						<div class="space-y-8 mt-10">
							<!-- Button -->
							<NuxtLink
								type="button"
								class="custom-button-about d-flex font-[Ubuntu]"
								to="https://firebasestorage.googleapis.com/v0/b/lsm-develop-a1e58.firebasestorage.app/o/global_static%2F20240718%20-%20LSM%20-%20Firm%20Profile%20Capability%20Statement.pdf?alt=media&token=0ab68c79-3d89-4194-a66c-cc8438eed494"
							>
								<span>Download Company Profile</span>
							</NuxtLink>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style>
.banner {
	background: url('/images/gambar-utama.jpg') no-repeat right center;
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

.last-section {
  margin-top: 50px;
  padding: 70px 10%;
  display: flex;
  background-color: #91AEAC;
  color: white;
  justify-content: space-between;
  align-items: center;
}

.last-section-text {
  font-size: 32px;
  margin-right: 40px;
  line-height: 110%;
}

.custom-button-about {
  background-color: white;
  padding: 20px 25px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #dab38d;
}

@media (max-width: 768px) {
  .custom-button-about {
    margin-top: 30px;
  }
  .last-section-text {
    width: 100%;
    text-align: center;
    font-size: 24px;
  }
  .last-section-text {
    margin: 0;
  }
  .last-section {
    padding: 40px 5%;
    flex-direction: column;
  }
}
</style>
