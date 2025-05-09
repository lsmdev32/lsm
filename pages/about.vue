<script setup lang="ts">
import Button from "~/components/audience/Button.vue"
import ThreePic from "~/components/audience/ThreePic.vue"
</script>

<template>
	<div>
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
					<div class="max-w-7xl mx-auto md:mt-28 lg:mt-16 ">
						<img
							src="../assets/Arrow 1.png"
							height="60px"
							alt=""
							style=""
						>
					</div>
				</div>
				<!-- Right column with content -->
				<div class="space-y-8 ">
					<!-- Top description -->
					<div class="mb-8">
						<p class="text-gray-500 leading-relaxed font-[Ubuntu] font-light">
							Founded in 1986, our law firm has built a legacy of excellence as a pioneer in groundbreaking litigation cases. Renowned for our innovative approach and creative legal strategies, we have consistently delivered exceptional results in complex and high-stakes disputes
						</p>
					</div>
				</div>
			</div>
			<div class="z-0 grid grid-cols-1 md:grid-cols-2 gap-12 md:mt-[-70px] lg:mt-[-70px]">
				<!-- Left column with Down arrow -->
				<div />
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Image section -->
					<div class="w-full h-64 md:h-72 lg:h-72 overflow-hidden">
						<img
							src="../assets/about-1.png"
							alt=""
							class="w-full h-full object-cover transform -scale-x-100"
						>
					</div>
				</div>
			</div>
			<div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 md:pt-16 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with Light gray text -->
				<div class="">
					<p class="text-3xl font-light text-gray-300 leading-relaxed font-[Marcellus]">
						We are committed to providing responsive attorneys, efficiently managed transactions and cases that meet the needs of our Clients
					</p>
				</div>

				<!-- Right column with content -->
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
			</div>
			<div class="container max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-16 ">
				<ThreePic />
			</div>
			<div class="mt-8 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8  z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with Light gray text -->
				<div
					class="container d-flex justify-content-between align-items-center"
					style=""
				>
					<img
						class="image-bottom"
						src="../assets/about-2.png"
					>
				</div>

				<!-- Right column with content -->
				<div class="space-y-8 flex flex-col justify-center">
					<!-- Two paragraphs of text -->
					<div class="w-full ">
						<div class="text-gray-500 leading-relaxed font-[Ubuntu]">
							Lubis Santosa & Maramis believes that Client’s trust is responsibility. We perform our responsibilities and earn our client’s trust through the application of knowledge, diligence and creative thinking. At Lubis Santosa & Maramis, we help businesses build, manage and profit.
						</div>
						<Button
							class="mt-8 cursor-pointer"
							text-button="Our Attorneys"
						/>
					</div>
				</div>
			</div>

			<div class="last-section  px-2 sm:px-6 lg:px-8 md:pt-16 z-0 grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Left column with Text -->
				<div class="relative">
					<div
						class="font-[Marcellus] last-section-text "
						style=""
					>
						Download Company Profile of
						<br>
						Lubis, Santosa & Maramis here
					</div>
				</div>
				<!-- Right column with content -->
				<div class="space-y-8">
					<!-- Button -->
					<button
						type="button"
						class="custom-button-about d-flex font-[Ubuntu]"
					>
						<span>Download Company Profile</span>
					</button>
				</div>
			</div>
		</section>
		<section class="md:hidden">
			<div class="flex flex-col items-center px-4 py-6 space-y-4">
				<!-- Gambar dengan ABOUT LSM -->
				<div class="relative w-full">
					<img
						src="../assets/about-1.png"
						alt=""
						class="w-full h-auto object-cover"
					>
					<h2 class="absolute bottom-6 left-6 text-white text-3xl font-[Marcellus] font-light">
						ABOUT LSM
					</h2>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-2 gap-6">
					<!-- Panah -->
					<div class="">
						<img
							src="../assets/Arrow 1.png"
							alt=""
							style="height: 34px; width: 16px;"
						>
					</div>

					<!-- Deskripsi -->
					<p class="text-[#D9B28C] text-1xl font-[Marcellus] ml-[-100px] eading-relaxed">
						We are committed to providing responsive attorneys, efficiently managed transactions and cases that meet the needs of our Clients
					</p>
				</div>
				<div>
					<!-- Body Text -->
					<p class="text-sm md:text-base text-gray-500 leading-6 max-w-2xl ">
						Our comprehensive legal services encompass a wide spectrum of areas, including civil, commercial, administrative, constitutional, and criminal litigation. We are dedicated to managing each type of case with expertise and diligence, ensuring that our clients receive the highest level of representation. Whether we are navigating complex commercial disputes or defending constitutional rights, our attorneys are unwavering in their commitment to achieving successful outcomes that are tailored to the unique needs of each client. Additionally, we are passionate about handling public interest cases and advocating for public policy, striving for impactful legal outcomes that contribute to societal progress. Guided by unwavering integrity, we uphold the highest ethical standards in every case we take on.
					</p>
					<br>
					<p class="text-sm md:text-base text-gray-500 leading-6 max-w-2xl ">
						We serve with heart by putting our clients’ interests as our main priority. Anticipating and providing what our clients’ needs are what we do.
					</p>
				</div>
				<div class="container max-w-7xl mx-auto lg:px-8 py-8 ">
					<ThreePic />
				</div>
			</div>
			<div>
				<div class="mt-8 grid-cols-1 gap-12">
					<!-- Left column with Light gray text -->
					<div
						class="w-full h-auto relative bg-cover overflow-hidden"
						style=""
					>
						<img
							class="w-full h-auto object-cover"
							src="../assets/about-2.png"
						>
					</div>

					<!-- Right column with content -->
					<div class="space-y-8 mt-4 flex flex-col">
						<!-- Two paragraphs of text -->
						<div class="flex flex-col items-center px-4 py-4 space-y-4 text-sm md:text-base text-gray-500 leading-6 max-w-2xl">
							<div class="font-[Ubuntu]">
								Lubis Santosa & Maramis believes that Client’s trust is responsibility. We perform our responsibilities and earn our client’s trust through the application of knowledge, diligence and creative thinking. At Lubis Santosa & Maramis, we help businesses build, manage and profit.
							</div>
						</div>
					</div>
					<div class="flex flex-col items-center justify-center">
						<Button
							class=" cursor-pointer place-items-center "
							text-button="Our Attorneys"
						/>
					</div>
				</div>
				<div class="last-section  z-0 grid grid-cols-1 ">
					<!-- Left column with Text -->
					<div class="relative">
						<div
							class="font-[Marcellus] last-section-text "
							style=""
						>
							Download Company Profile of
							<br>
							Lubis, Santosa & Maramis here
						</div>
					</div>
					<!-- Right column with content -->
					<div class="space-y-8">
						<!-- Button -->
						<button
							type="button"
							class="custom-button-about d-flex font-[Ubuntu]"
						>
							<span>Download Company Profile</span>
						</button>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
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
