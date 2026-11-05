<template>
  <section class="my-2">
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(publication, index) in publications"
        :key="index"
        class="flex flex-col"
      >
        <!-- <img
					v-if="publication.image_url"
					:src="publication.image_url as string"
					alt="Thumbnail"
					class="w-full h-[270px] object-cover mb-4"
				>
				<img
					v-else
					:src="LogoSVG"
					alt="Thumbnail"
					class="w-full h-[270px] object-cover mb-4"
				> -->
        <span class="font-[Ubuntu] text-sm text-[#DAB38D]">{{
          publication.category
        }}</span>
        <h3
          class="line-clamp-2 font-[Marcellus] text-xl leading-snug text-[#4B3D2A]"
        >
          {{ publication.title }}
        </h3>
        <div
          class="mt-4 flex items-center space-x-4 font-[Ubuntu] text-xs text-[#2e1e10]"
        >
          <div class="flex items-center space-x-1">
            <nuxt-img
              v-if="publication?.author?.photo_url || defaultAuthorImage"
              :src="publication?.author?.photo_url || defaultAuthorImage"
              alt="Author"
              class="mr-1 h-8 w-8 rounded-full object-cover object-top"
            />
            <span class="uppercase tracking-wider text-[#DAB38D]">{{
              publication?.author?.name ||
              defaultAuthorName ||
              "LSM Content Team"
            }}</span>
          </div>
          <div class="flex items-center space-x-1">
            <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
            <span class="uppercase text-[#DAB38D]">{{
              publication.published_at
            }}</span>
          </div>
        </div>
        <div class="mt-2 md:hidden" />

        <nuxt-link
          :href="`/${publication.type === 'blog' ? 'blogs' : 'publications'}/${publication.slug}`"
          class="mt-4 w-fit rounded bg-[#4B3D2A] px-4 py-2 text-sm text-[#DAB38D] hover:bg-[#665339] md:bg-[#91AEAC] md:text-white md:hover:bg-[#9aaea1]"
        >
          Read More
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import LogoSVG from "/images/book.png";
// import LogoSVG from "~/assets/images/logo.svg"

interface Props {
  publications?: Record<string, unknown>[];
  defaultAuthorName?: string;
  defaultAuthorImage?: string;
}

withDefaults(defineProps<Props>(), {
  publications: () => [],
});
</script>
