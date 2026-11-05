<script setup lang="ts">
import Button from "~/components/audience/button.vue";
import ThreePic from "~/components/audience/three-pic.vue";
</script>

<template>
  <div>
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
          <div class="mx-auto max-w-7xl md:mt-28 lg:mt-16">
            <img src="../assets/Arrow 1.png" height="60px" alt="" style="" />
          </div>
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
      <div
        class="z-0 grid grid-cols-1 gap-12 md:mt-[-70px] md:grid-cols-2 lg:mt-[-70px]"
      >
        <!-- Left column with Down arrow -->
        <div />
        <!-- Right column with content -->
        <div class="space-y-8">
          <!-- Image section -->
          <div class="h-64 w-full overflow-hidden md:h-72 lg:h-72">
            <img
              src="../assets/about-1.png"
              alt=""
              class="h-full w-full -scale-x-100 transform object-cover"
            />
          </div>
        </div>
      </div>
      <div
        class="z-0 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-2 sm:px-6 md:grid-cols-2 md:pt-16 lg:px-8"
      >
        <!-- Left column with Light gray text -->
        <div class="">
          <p
            class="font-[Marcellus] text-3xl leading-relaxed font-light text-gray-300"
          >
            We are committed to providing responsive attorneys, efficiently
            managed transactions and cases that meet the needs of our Clients
          </p>
        </div>

        <!-- Right column with content -->
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
      </div>
      <div class="container mx-auto max-w-7xl px-2 py-16 sm:px-6 lg:px-8">
        <ThreePic />
      </div>
      <div
        class="z-0 mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-12 px-2 sm:px-6 md:grid-cols-2 lg:px-8"
      >
        <!-- Left column with Light gray text -->
        <div
          class="d-flex justify-content-between align-items-center container"
          style=""
        >
          <img class="image-bottom" src="../assets/images/about-attorney.jpg" />
        </div>

        <!-- Right column with content -->
        <div class="flex flex-col justify-center space-y-8">
          <!-- Two paragraphs of text -->
          <div class="w-full">
            <div class="font-[Ubuntu] leading-relaxed text-gray-500">
              Lubis Santosa & Partners believes that Client’s trust is
              responsibility. We perform our responsibilities and earn our
              client’s trust through the application of knowledge, diligence and
              creative thinking. At Lubis Santosa & Maramis, we help businesses
              build, manage and profit.
            </div>
            <div class="mt-4 flex items-start justify-start">
              <NuxtLink
                type="button"
                class="mt-16 w-[40%] cursor-pointer justify-center rounded-[10px] bg-[#4B3D2A] px-3 py-5 text-center text-[14px] font-medium text-[#DAB38D] sm:py-4 md:py-5"
                to="/attorneys"
                >Our Attorneys</NuxtLink
              >
            </div>
          </div>
        </div>
      </div>

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
            to="https://firebasestorage.googleapis.com/v0/b/lsm-develop-a1e58.firebasestorage.app/o/global_static%2F20240718%20-%20LSM%20-%20Firm%20Profile%20Capability%20Statement.pdf?alt=media&token=0ab68c79-3d89-4194-a66c-cc8438eed494"
          >
            <span>Download Company Profile</span>
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="md:hidden">
      <div class="flex flex-col items-center space-y-4 px-4 py-6">
        <!-- Gambar dengan ABOUT LSM -->
        <div class="relative w-full">
          <img
            src="../assets/about-1.png"
            alt=""
            class="h-auto w-full object-cover"
          />
          <h2
            class="absolute bottom-6 left-6 font-[Marcellus] text-3xl font-light text-white"
          >
            ABOUT LSM
          </h2>
        </div>
        <div class="grid grid-cols-2 gap-6 md:grid-cols-2">
          <!-- Panah -->
          <div class="">
            <img
              src="../assets/Arrow 1.png"
              alt=""
              style="height: 34px; width: 16px"
            />
          </div>

          <!-- Deskripsi -->
          <p
            class="text-1xl eading-relaxed ml-[-100px] font-[Marcellus] text-[#D9B28C]"
          >
            We are committed to providing responsive attorneys, efficiently
            managed transactions and cases that meet the needs of our Clients
          </p>
        </div>
        <div>
          <!-- Body Text -->
          <p class="max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
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
          <p class="max-w-2xl text-sm leading-6 text-gray-500 md:text-base">
            We serve with heart by putting our clients’ interests as our main
            priority. Anticipating and providing what our clients’ needs are
            what we do.
          </p>
        </div>
        <div class="container mx-auto max-w-7xl py-8 lg:px-8">
          <ThreePic />
        </div>
      </div>
      <div>
        <div class="mt-8 grid-cols-1 gap-12">
          <!-- Left column with Light gray text -->
          <div class="relative h-auto w-full overflow-hidden bg-cover" style="">
            <img
              class="h-auto w-full object-cover"
              src="../assets/images/about-attorney.jpg"
            />
          </div>

          <!-- Right column with content -->
          <div class="mt-4 flex flex-col space-y-8">
            <!-- Two paragraphs of text -->
            <div
              class="flex max-w-2xl flex-col items-center space-y-4 px-4 py-4 text-sm leading-6 text-gray-500 md:text-base"
            >
              <div class="font-[Ubuntu]">
                Lubis Santosa & Partners believes that Client’s trust is
                responsibility. We perform our responsibilities and earn our
                client’s trust through the application of knowledge, diligence
                and creative thinking. At Lubis Santosa & Maramis, we help
                businesses build, manage and profit.
              </div>
            </div>
          </div>
          <div class="mt-4 flex flex-col items-center justify-center">
            <NuxtLink
              type="button"
              class="w-[40%] cursor-pointer justify-center rounded-[10px] bg-[#4B3D2A] px-3 py-5 text-center text-[14px] font-medium text-[#DAB38D] sm:py-4 md:py-5"
              to="/attorneys"
              >Our Attorneys</NuxtLink
            >
          </div>
        </div>
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
              to="https://firebasestorage.googleapis.com/v0/b/lsm-develop-a1e58.firebasestorage.app/o/global_static%2F20240718%20-%20LSM%20-%20Firm%20Profile%20Capability%20Statement.pdf?alt=media&token=0ab68c79-3d89-4194-a66c-cc8438eed494"
            >
              <span>Download Company Profile</span>
            </NuxtLink>
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
