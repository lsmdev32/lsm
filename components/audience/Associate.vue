<template>
  <div>
    <!-- Desktop/Tablet View -->
    <nuxt-link :href="`/attorneys/${slug}`" class="cursor-pointer">
      <div class="hidden md:block">
        <!-- Card -->
        <div>
          <div class="group relative cursor-pointer overflow-hidden">
            <!-- <nuxt-img
							:src="image"
							alt="Profile photo"
							class="w-full h-[338px] object-cover object-center transition duration-300 group-hover:opacity-70 "
						/> -->

            <!-- Nama & role -->
            <div class="inset-0 mt-4 flex items-end justify-center">
              <div class="pb-6 text-center">
                <h3 class="font-[Marcellus] text-xl text-[#4B3D2A]">
                  {{ name }}
                </h3>
                <!-- <p class="text-sm text-[#dab38d] tracking-widest mt-1">
									ASSOCIATE
								</p> -->
              </div>
            </div>

            <!-- Hover icons -->
            <div
              class="absolute right-4 bottom-[120px] flex space-x-3 opacity-0 transition duration-300 group-hover:opacity-100"
            >
              <nuxt-link :href="linkedin">
                <button
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B3D2A] text-white"
                >
                  <Icon name="mdi:linkedin" size="20" />
                </button>
              </nuxt-link>
              <nuxt-link :href="`mailto:${email}`">
                <button
                  class="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B3D2A] text-white"
                >
                  <Icon name="mdi:email-outline" size="20" />
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile View -->
      <div class="flex flex-col space-y-3 md:hidden">
        <nuxt-link :href="`/attorneys/${slug}`" class="cursor-pointer">
          <div class="group relative cursor-pointer overflow-hidden">
            <!-- <nuxt-img
							:src="image"
							alt="Profile photo"
							class="w-full h-[182px] object-cover object-[50%_30%] transition duration-300 group-hover:opacity-70 "
						/> -->

            <!-- Nama & role -->
            <div class="inset-0 mt-4 flex items-end justify-center">
              <div class="pb-6 text-center">
                <h3 class="text-1xl font-[Marcellus] text-[#4B3D2A]">
                  {{ name }}
                </h3>
                <!-- <p class="text-sm text-[#dab38d] tracking-widest mt-1">
									ASSOCIATE
								</p> -->
              </div>
            </div>

            <!-- Hover icons -->
            <div
              class="absolute right-4 bottom-[100px] flex space-x-3 opacity-0 transition duration-300 group-hover:opacity-100"
            >
              <nuxt-link :href="linkedin">
                <button
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B3D2A] text-white"
                >
                  <Icon name="mdi:linkedin" size="16" />
                </button>
              </nuxt-link>
              <nuxt-link :href="`mailto:${email}`">
                <button
                  class="flex h-8 w-8 items-center justify-center rounded-full bg-[#4B3D2A] text-white"
                >
                  <Icon name="mdi:email-outline" size="16" />
                </button>
              </nuxt-link>
            </div>
          </div>
        </nuxt-link>
      </div>
    </nuxt-link>
  </div>
</template>

<script setup lang="ts">
interface Props {
  image: string;
  name: string;
  linkedin: string;
  email: string;
  slug: string;
}

defineProps<Props>();
</script>
