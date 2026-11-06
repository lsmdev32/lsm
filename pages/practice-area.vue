<script setup lang="ts">
import PracticeAreaDetails from "~/components/audience/practice-area-details.vue";
</script>

<template>
  <div class="w-full">
    <section class="px-4 py-6 lg:hidden">
      <div
        class="relative flex h-[55svh] max-h-[34rem] min-h-72 w-full items-end overflow-hidden p-4 sm:p-8"
      >
        <img
          src="/images/practice-area-1-sm.jpg"
          alt="Lawyers working together"
          class="absolute inset-0 size-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-black/20" />
        <h1 class="relative font-[Marcellus] text-4xl text-white sm:text-5xl">
          Practice Area
        </h1>
      </div>
    </section>

    <section class="px-4 py-4 sm:px-8 lg:hidden">
      <p
        class="mx-auto max-w-3xl text-justify font-[Ubuntu] text-base leading-relaxed font-light text-[#4B3D2A] sm:text-lg"
      >
        Lawyers at LSM are experts in their fields and are dedicated to
        providing the best legal services to our clients. We have a wide range
        of practice areas, and we work closely with our clients to understand
        their needs and provide tailored solutions.
      </p>
    </section>

    <section class="w-full lg:hidden">
      <PracticeAreaDetails />
    </section>

    <section class="hidden lg:block">
      <div
        class="mx-auto grid max-w-7xl grid-cols-2 gap-12 px-8 pt-16 xl:px-12"
      >
        <h1 class="font-[Marcellus] text-5xl font-light text-[#DAB38D]">
          Practice Area
        </h1>
        <p class="font-[Ubuntu] leading-relaxed font-light text-gray-500">
          Lawyers at LSM are experts in their fields and are dedicated to
          providing the best legal services to our clients. We have a wide range
          of practice areas, and we work closely with our clients to understand
          their needs and provide tailored solutions.
        </p>
      </div>

      <div class="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-12 px-8 xl:px-12">
        <div />
        <img
          src="/images/practice-area-1.jpg"
          alt="Lawyers working together"
          class="h-64 w-full -scale-x-100 object-cover object-left-top xl:h-72"
        />
      </div>
    </section>

    <section class="mt-4 hidden w-full lg:block">
      <PracticeAreaDetails />
    </section>
  </div>
</template>
