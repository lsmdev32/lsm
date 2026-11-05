<script setup lang="ts">
import { NuxtLink } from "#components";
import ThreePic from "~/components/audience/ThreePic.vue";

const images = [
  "/images/bedge1.png",
  "/images/bedge2.png",
  "/images/bedge3.png",
  "/images/bedge4.png",
  "/images/bedge5.png",
  "/images/bedge6.png",
  "/images/bedge7.png",
  "/images/bedge8.png",
];
</script>

<template lang="html">
  <div>
    <!-- Mobile -->
    <section class="md:hidden md:min-w-full">
      <div class="banner">
        <div
          class="flex h-full flex-col items-start justify-between py-[30px] pl-[30px] text-left md:pl-12"
        >
          <div>
            <h1 class="text-6xl text-white">
              Lubis,<br />
              Santosa <br />& Partners
            </h1>
          </div>
          <div>
            <h2 class="text-2xl text-white">
              Local Wisdom,<br />Legal Insight
            </h2>
          </div>
        </div>
      </div>
    </section>

    <!-- Desktop -->
    <section class="hidden items-center justify-center md:flex md:min-w-full">
      <div
        class="flex h-[50vh] w-full items-end justify-start bg-[url('/images/gambar-utama.jpg')] bg-cover bg-center bg-no-repeat py-[30px] pl-[30px] text-left md:pl-12"
      >
        <div
          class="flex flex-col items-start justify-start py-[60px] pl-[30px] text-left md:pl-12"
        >
          <div>
            <h1 class="font-[philosopher] text-8xl text-white">
              Local Wisdom,<br />Legal Insight
            </h1>
          </div>
        </div>
      </div>
    </section>
    <!-- Bedge here! -->
    <section
      class="hidden items-center justify-center py-6 md:flex md:min-w-full"
    >
      <div
        class="flex max-w-7xl flex-wrap items-center justify-center gap-4 px-2"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="size-28 shrink-0 lg:size-32"
        >
          <img
            :src="image"
            :alt="`Badge ${index + 1}`"
            class="h-full w-full object-contain"
          />
        </div>
      </div>
    </section>
    <section class="hidden md:block">
      <div
        class="z-0 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-2 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8"
      >
        <!-- Left column with title and arrow -->
        <div class="relative">
          <h2
            class="font-[Marcellus] text-5xl font-light"
            style="color: #dab38d"
          >
            ABOUT
            <br />
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
        <div class="space-y-8">
          <!-- Top description -->
          <div class="mb-8">
            <p class="font-[Ubuntu] leading-relaxed font-light text-gray-500">
              Founded in 1986, our law firm has built a legacy of excellence as
              a pioneer in groundbreaking litigation cases. Renowned for our
              innovative approach and creative legal strategies, we have
              consistently delivered exceptional results in complex and
              high-stakes disputes.
            </p>
          </div>
        </div>
      </div>
      <div class="z-0 grid grid-cols-1 gap-12 md:grid-cols-2">
        <!-- Left column with Down arrow -->
        <div />
        <!-- Right column with content -->
        <div class="space-y-8">
          <!-- Image section -->
          <div class="h-64 w-full overflow-hidden md:h-72 lg:h-72">
            <img
              src="/images/about-lsm.jpg"
              alt=""
              class="h-full w-full -scale-x-100 transform object-cover"
            />
          </div>
        </div>
      </div>
      <div
        class="z-0 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-2 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8"
      >
        <!-- Left column with content -->
        <div class="space-y-8">
          <!-- Two paragraphs of text -->
          <div class="space-y-8">
            <p class="font-[Ubuntu] leading-relaxed text-gray-500">
              Our comprehensive legal services encompass a wide spectrum of
              areas, including civil, commercial, administrative,
              constitutional, and criminal litigation. We are dedicated to
              managing each type of case with expertise and diligence, ensuring
              that our clients receive the highest level of representation.
              Whether we are navigating complex commercial disputes or defending
              constitutional rights, our attorneys are unwavering in their
              commitment to achieving successful outcomes that are tailored to
              the unique needs of each client. Additionally, we are passionate
              about handling public interest cases and advocating for public
              policy, striving for impactful legal outcomes that contribute to
              societal progress. Guided by unwavering integrity, we uphold the
              highest ethical standards in every case we take on.
            </p>
            <p class="font-[Ubuntu] leading-relaxed text-gray-500">
              We serve with heart by putting our clients’ interests as our main
              priority. Anticipating and providing what our clients’ needs are
              what we do.
            </p>
          </div>
        </div>
        <!-- Right column with Light gray text -->
        <div class="">
          <p
            class="font-[Marcellus] text-3xl leading-relaxed font-light text-gray-300"
          >
            We are committed to providing responsive attorneys, efficiently
            managed transactions and cases that meet the needs of our Clients
          </p>
        </div>
      </div>
      <div class="container mx-auto max-w-7xl px-2 py-16 sm:px-6 lg:px-8">
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

      <div
        class="last-section z-0 grid grid-cols-1 gap-12 px-2 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8"
      >
        <!-- Left column with Text -->
        <div class="relative">
          <div class="last-section-text font-[Marcellus]" style="">
            Download Company Profile of
            <br />
            Lubis, Santosa & Partners here
          </div>
        </div>
        <!-- Right column with content -->
        <div class="space-y-8">
          <!-- Button -->
          <NuxtLink
            type="button"
            class="custom-button-about d-flex font-[Ubuntu]"
            to="https://firebasestorage.googleapis.com/v0/b/lsm-develop-a1e58.firebasestorage.app/o/global_static%2FLSM%20-%20Firm%20Profile%20Capability%20Statement.pdf?alt=media&token=657a761e-5459-4834-98f1-802d223e95aa"
          >
            <span>Download Company Profile</span>
          </NuxtLink>
        </div>
      </div>
    </section>
    <!-- Mobile -->
    <section class="md:hidden">
      <div class="flex flex-col items-center space-y-4 px-4 py-6">
        <!-- Gambar dengan ABOUT LSM -->
        <div class="relative w-full">
          <img
            src="/images/about-lsm.jpg"
            alt=""
            class="h-auto w-full object-cover"
          />
          <h2
            class="absolute bottom-6 left-6 font-[Marcellus] text-3xl font-light text-white"
          >
            ABOUT LSM
          </h2>
        </div>
        <div>
          <!-- Body Text -->
          <p
            class="text-md max-w-2xl text-justify leading-6 text-gray-500 md:text-base"
          >
            Founded in 1986, our law firm has built a legacy of excellence as a
            pioneer in groundbreaking litigation cases. Renowned for our
            innovative approach and creative legal strategies, we have
            consistently delivered exceptional results in complex and
            high-stakes disputes.
          </p>
          <br />
          <p
            class="text-md max-w-2xl text-justify leading-6 text-gray-500 md:text-base"
          >
            Our comprehensive legal services encompass a wide spectrum of areas,
            including civil, commercial, administrative, constitutional, and
            criminal litigation. We are dedicated to managing each type of case
            with expertise and diligence, ensuring that our clients receive the
            highest level of representation. Whether we are navigating complex
            commercial disputes or defending constitutional rights, our
            attorneys are unwavering in their commitment to achieving successful
            outcomes that are tailored to the unique needs of each client.
            Additionally, we are passionate about handling public interest cases
            and advocating for public policy, striving for impactful legal
            outcomes that contribute to societal progress. Guided by unwavering
            integrity, we uphold the highest ethical standards in every case we
            take on.
          </p>
          <br />
          <p
            class="text-md max-w-2xl text-justify leading-6 text-gray-500 md:text-base"
          >
            We serve with heart by putting our clients’ interests as our main
            priority. Anticipating and providing what our clients’ needs are
            what we do.
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
          <p
            class="eading-relaxed text-justify font-[Marcellus] text-lg text-[#D9B28C]"
          >
            We are committed to providing responsive attorneys, efficiently
            managed transactions and cases that meet the needs of our Clients
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
          <div class="last-section z-0 grid grid-cols-1">
            <!-- Left column with Text -->
            <div class="relative">
              <div class="last-section-text font-[Marcellus]" style="">
                Download Company Profile of
                <br />
                Lubis, Santosa & Partners here
              </div>
            </div>
            <!-- Right column with content -->
            <div class="mt-10 space-y-8">
              <!-- Button -->
              <NuxtLink
                type="button"
                class="custom-button-about d-flex font-[Ubuntu]"
                to="https://firebasestorage.googleapis.com/v0/b/lsm-develop-a1e58.firebasestorage.app/o/global_static%2FLSM%20-%20Firm%20Profile%20Capability%20Statement.pdf?alt=media&token=657a761e-5459-4834-98f1-802d223e95aa"
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
  background: url("/images/gambar-utama.jpg") no-repeat right center;
  background-size: cover;
  height: 50vh;
  display: flex;
  align-items: center;
  font-family: "Philosopher", sans-serif;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 15px; /* Added margin-bottom */
  z-index: 0;
}
.banner-small {
  background: url("~/assets/images/banner1.svg") no-repeat center center;
  background-size: cover;
  height: 89px;
  display: flex;
  align-items: center;
  font-family: "Philosopher", sans-serif;
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
  background-color: #91aeac;
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
