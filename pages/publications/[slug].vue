<script setup lang="ts">
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import LogoSVG from "/images/book.png";
import { Download } from "lucide-vue-next";

import Publications from "~/components/audience/Publications.vue";

const { slug } = useRoute().params;

const { data } = await useCustomFetch(`/rest/page-data/publications/${slug}`);

if (!data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Publikasi Tidak Ditemukan",
  });
}

const detail = data?.data?.detail;
const relatedContents = data?.data?.related_contents ?? [];
</script>

<template>
  <div>
    <!-- Mobile -->
    <section class="md:hidden">
      <div class="mb-4 flex w-full flex-col">
        <!-- <img
					v-if="detail?.image_url"
					:src="detail?.image_url"
					alt="Thumbnail"
					class="w-full h-72 object-cover mb-4"
				>
				<img
					v-else
					:src="LogoSVG"
					alt="Thumbnail"
					class="w-full h-72 object-cover mb-4"
				> -->
        <div class="flex flex-col gap-y-4 self-center p-4">
          <span class="text-center font-[Ubuntu] text-sm text-[#DAB38D]">{{
            detail?.category
          }}</span>
          <h3
            class="text-center font-[Marcellus] text-xl leading-snug text-[#4B3D2A]"
          >
            {{ detail?.title }}
          </h3>
          <div
            class="mt-4 flex items-center space-x-4 font-[Ubuntu] text-xs text-[#2e1e10]"
          >
            <div class="flex items-center space-x-1">
              <img
                v-if="detail?.author"
                :src="detail.author?.image_url"
                alt="Author"
                class="mr-1 h-8 w-8 rounded-full"
              />
              <span class="uppercase tracking-wider text-[#DAB38D]">{{
                detail.author?.name || "LSM Content Team"
              }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
              <span class="uppercase text-[#DAB38D]">{{
                detail?.published_at
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="ql-editor mt-4 p-4 text-justify text-gray-700"
          v-html="detail?.content"
        />

        <div class="flex justify-between px-4">
          <!-- <div class="w-[400px] flex gap-x-4 items-center">
						<span
							v-for="tag in detail.tags"
							:key="tag"
							class="text-[#DAB38D] font-[Ubuntu] text-sm"
						>
							#{{ tag }}
						</span>
					</div> -->
          <div class="w-full">
            <nuxt-link
              :to="detail?.publication_file_url"
              target="_blank"
              class="flex items-center justify-center rounded-lg bg-[#4B3D2A] py-4 font-[Marcellus] text-[#DAB38D]"
            >
              Download Publication
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <section class="md:hidden">
      <div class="p-4">
        <Publications />
      </div>
    </section>
    <!-- Desktop -->
    <section class="hidden w-full justify-center md:flex">
      <div
        class="mx-auto flex w-full max-w-7xl flex-row justify-center gap-8 p-4 px-2 sm:px-6 lg:px-8"
      >
        <!-- Main Content -->
        <div class="w-3/4">
          <!-- Featured Post -->
          <div class="mb-8 flex flex-col gap-y-4">
            <!-- <img
							v-if="detail?.image_url"
							:src="detail?.image_url"
							alt="Thumbnail"
							class="w-full h-80 object-cover mb-4"
						>
						<img
							v-else
							:src="LogoSVG"
							alt="Thumbnail"
							class="w-full h-80 object-cover mb-4"
						> -->
            <span class="self-center font-[Ubuntu] text-sm text-[#DAB38D]">{{
              detail?.category
            }}</span>
            <h3
              class="self-center font-[Marcellus] text-2xl leading-snug text-[#4B3D2A]"
            >
              {{ detail?.title }}
            </h3>
            <div
              class="mt-4 flex items-center space-x-4 self-center font-[Ubuntu] text-xs text-[#2e1e10]"
            >
              <div class="flex items-center space-x-1">
                <nuxt-link
                  v-if="detail?.author"
                  :to="`/attorneys/${detail.author?.slug}`"
                >
                  <img
                    :src="detail.author?.image_url"
                    alt="Author"
                    class="mr-1 h-8 w-8 rounded-full"
                  />
                </nuxt-link>
                <span class="uppercase tracking-wider text-[#DAB38D]">{{
                  detail.author?.name || "LSM Content Team"
                }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
                <span class="uppercase text-[#DAB38D]">{{
                  detail?.published_at
                }}</span>
              </div>
            </div>
            <div
              class="ql-editor mt-4 text-gray-700"
              v-html="detail?.content"
            />

            <div class="flex justify-between px-4">
              <div class="flex w-[400px] items-center gap-x-4">
                <span
                  v-for="tag in detail.tags"
                  :key="tag"
                  class="font-[Ubuntu] text-sm text-[#DAB38D]"
                >
                  #{{ tag }}
                </span>
              </div>
              <div class="">
                <nuxt-link
                  :to="detail?.publication_file_url"
                  target="_blank"
                  class="flex items-center justify-center gap-x-4 rounded-lg bg-[#4B3D2A] p-3 text-[#DAB38D]"
                >
                  <Download /> Download Publication
                </nuxt-link>
              </div>
            </div>
          </div>

          <!-- Grid of Posts -->
          <div class="mb-6 flex font-[Marcellus] text-2xl text-[#4B3D2A]">
            Related Articles
          </div>
          <div class="grid grid-cols-3 gap-4">
            <nuxt-link
              v-for="(content, index) in relatedContents"
              :key="index"
              class="mb-6"
              :to="`/publications/${content.slug}`"
            >
              <img
                v-if="content.image_url"
                :src="content.image_url"
                alt="Thumbnail"
                class="mb-4 h-40 w-full object-cover"
              />
              <img
                v-else
                :src="LogoSVG"
                alt="Thumbnail"
                class="mb-4 h-40 w-full object-cover"
              />
              <span class="font-[Ubuntu] text-sm text-[#DAB38D]">{{
                content.category
              }}</span>
              <h3 class="font-[Marcellus] text-xl leading-snug text-[#4B3D2A]">
                {{ content.title }}
              </h3>
              <div
                class="mt-4 flex items-center space-x-4 font-[Ubuntu] text-xs text-[#2e1e10]"
              >
                <div class="flex items-center space-x-1">
                  <img
                    v-if="content.author"
                    :src="content.author?.image_url"
                    alt="Author"
                    class="mr-1 h-8 w-8 rounded-full"
                  />
                  <span class="uppercase tracking-wider text-[#DAB38D]">{{
                    content.author?.name || "LSM Content Team"
                  }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
                  <span class="uppercase text-[#DAB38D]">{{
                    content.published_at
                  }}</span>
                </div>
              </div>
              <button
                class="mt-4 w-fit rounded bg-[#91AEAC] px-4 py-2 text-sm text-white hover:bg-[#9aaea1]"
              >
                Read More
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
