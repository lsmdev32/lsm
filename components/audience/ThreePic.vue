<template>
  <div>
    <!-- Desktop/Tablet View -->
    <div class="hidden md:block">
      <div class="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <a :href="`/practice-area?category=${0}`" class="block">
          <div
            class="group relative h-[374px] w-full cursor-pointer overflow-hidden bg-[url('~/assets/homepage-1.svg')] bg-cover transition-all duration-300 hover:bg-[url('~/assets/hover-homepage-1.svg')]"
          >
            <div class="group inline-block cursor-pointer">
              <span
                class="font-marcellus absolute bottom-[10%] left-10 block text-5xl font-normal text-white transition-opacity duration-300 group-hover:opacity-0"
                >DR</span
              >
              <span
                class="font-marcellus absolute bottom-[10%] left-10 flex items-center justify-center text-5xl font-normal text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >Dispute Resolution</span
              >
            </div>
          </div>
        </a>
        <a :href="`/practice-area?category=${1}`" class="block">
          <div
            class="group relative h-[374px] w-full cursor-pointer overflow-hidden bg-[url('~/assets/homepage-2.svg')] bg-cover transition-all duration-300 hover:bg-[url('~/assets/hover-homepage-2.svg')]"
          >
            <div class="group inline-block cursor-pointer">
              <span
                class="font-marcellus absolute bottom-[10%] left-10 block text-5xl font-normal text-white transition-opacity duration-300 group-hover:opacity-0"
                >CC</span
              >
              <span
                class="font-marcellus absolute bottom-[10%] left-10 flex items-center justify-center text-5xl font-normal text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >Corparate Commercial</span
              >
            </div>
          </div>
        </a>
        <a :href="`/practice-area?category=${2}`" class="block">
          <div
            class="group relative h-[374px] w-full cursor-pointer overflow-hidden bg-[url('~/assets/homepage-3.svg')] bg-cover transition-all duration-300 hover:bg-[url('~/assets/hover-homepage-3.svg')]"
          >
            <div class="group inline-block cursor-pointer">
              <span
                class="font-marcellus absolute bottom-[10%] left-10 block text-5xl font-normal text-white transition-opacity duration-300 group-hover:opacity-0"
                >IP</span
              >
              <span
                class="font-marcellus absolute bottom-[10%] left-10 flex items-center justify-center text-5xl font-normal text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >Intelectual Property</span
              >
            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- Mobile View -->
    <div class="flex flex-col space-y-3 md:hidden">
      <a :href="`/practice-area?category=${0}`" class="block">
        <div
          class="relative h-[89px] w-full cursor-pointer bg-[url('~/assets/mobile-about-1.svg')] bg-cover"
        >
          <div
            class="font-marcellus absolute top-1/2 left-[3%] -translate-y-1/2 transform text-2xl text-white"
          >
            Dispute Resolution
          </div>
        </div>
      </a>
      <a :href="`/practice-area?category=${1}`" class="block">
        <div
          class="relative h-[89px] w-full cursor-pointer bg-[url('~/assets/mobile-about-2.svg')] bg-cover"
        >
          <div
            class="font-marcellus absolute top-1/2 left-[3%] -translate-y-1/2 transform text-2xl text-white"
          >
            Corporate Commercial
          </div>
        </div>
      </a>
      <a :href="`/practice-area?category=${2}`" class="block">
        <div
          class="relative h-[89px] w-full cursor-pointer bg-[url('~/assets/mobile-about-3.svg')] bg-cover"
        >
          <div
            class="font-marcellus absolute top-1/2 left-[3%] -translate-y-1/2 transform text-2xl text-white"
          >
            Intellectual Property
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToPractice = (id) => {
  router.push(`/practice?exp=${id}`);
};
</script>

<style scoped>
/* Font import - consider moving this to a global CSS file if used across components */
.font-marcellus {
  font-family: "Marcellus", serif;
}
</style>
