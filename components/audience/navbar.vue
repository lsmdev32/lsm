<script setup lang="ts">
import LogoSVG from "~/assets/images/logo-lsm-main.svg";
import HamburgerMenu from "~/components/audience/hamburger-menu.vue";
</script>

<template>
  <nav
    class="fixed z-50 flex h-[80px] w-full items-center justify-between bg-white shadow-sm"
  >
    <div class="mx-auto w-full max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="mx-auto w-full max-w-7xl">
        <div class="flex h-16 items-center justify-between">
          <div class="flex-shrink-0 lg:pr-4">
            <NuxtLink to="/" class="flex items-center hover:cursor-pointer">
              <img
                :src="LogoSVG"
                class="lsm-logo-nav h-[36px] w-auto lg:h-[44px] lg:w-[auto]"
              />
            </NuxtLink>
          </div>
          <div
            class="hidden space-x-4 text-[#4B3D2A] sm:justify-center sm:text-center lg:flex"
          >
            <!-- <NuxtLink
							to="/about"
							style="font-size:medium;"
							class="pr-4 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							About LSM
						</NuxtLink> -->
            <NuxtLink
              to="/practice-area"
              style="font-size: medium"
              class="pr-4 hover:cursor-pointer hover:text-[#DAB38D]"
            >
              Practice Area
            </NuxtLink>
            <NuxtLink
              to="/attorneys"
              style="font-size: medium"
              class="pr-4 hover:cursor-pointer hover:text-[#DAB38D]"
            >
              Attorneys
            </NuxtLink>
            <NuxtLink
              to="/publications"
              style="font-size: medium"
              class="pr-4 hover:cursor-pointer hover:text-[#DAB38D]"
            >
              Publication
            </NuxtLink>
            <NuxtLink
              to="/blogs"
              style="font-size: medium"
              class="pr-4 hover:cursor-pointer hover:text-[#DAB38D]"
            >
              Updates
            </NuxtLink>
            <NuxtLink
              to="/contact-us"
              style="font-size: medium"
              class="pr-4 hover:cursor-pointer hover:text-[#DAB38D]"
            >
              Contact Us
            </NuxtLink>
            <NuxtLink
              href="/career"
              style="font-size: medium"
              class="pr-8 hover:cursor-pointer hover:text-[#DAB38D]"
            >
              Career
            </NuxtLink>
            <!-- Login button Hidden -->
            <!-- <NuxtLink
							href="/login"
							style="font-size:medium;"
							class="pr-8 hover:text-[#DAB38D] hover:cursor-pointer"
						>
							login
						</NuxtLink> -->
          </div>
          <div class="items-center hover:cursor-pointer md:hidden">
            <HamburgerMenu />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.NuxtLink {
  color: #4b3d2a;
}
</style>
