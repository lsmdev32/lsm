<script setup lang="ts">
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import LogoSVG from "~/assets/images/logo.svg";
import Publications from "~/components/audience/Publications.vue";

const { slug } = useRoute().params;

const { data } = await useCustomFetch(`/api/page-data/blogs/${slug}`);

if (!data) {
  throw createError({
    statusCode: 404,
    statusMessage: "Blog Tidak Ditemukan",
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
        <NuxtImg
          v-if="detail?.image_url"
          :src="detail?.image_url"
          alt="Thumbnail"
          class="mb-4 h-72 w-full object-cover"
        />
        <NuxtImg
          v-else
          :src="LogoSVG"
          alt="Thumbnail"
          class="mb-4 h-72 w-full object-cover"
        />
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
              <span class="tracking-wider text-[#DAB38D] uppercase">{{
                detail.author?.name || "LSM Content Team"
              }}</span>
            </div>
            <div class="flex items-center space-x-1">
              <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
              <span class="text-[#DAB38D] uppercase">{{
                detail?.published_at
              }}</span>
            </div>
          </div>
        </div>
        <div
          class="ql-editor mt-4 max-w-[912px] p-4 text-justify text-wrap text-gray-700 [&_p]:max-w-full [&_p]:text-wrap [&_p]:break-all"
          v-html="detail?.content"
        />

        <div class="flex justify-between px-4">
          <div class="flex w-[400px] flex-wrap items-center gap-x-4">
            <span
              v-for="tag in detail.tags"
              :key="tag"
              class="font-[Ubuntu] text-sm text-[#DAB38D]"
            >
              #{{ tag }}
            </span>
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
            <NuxtImg
              v-if="detail?.image_url"
              :src="detail?.image_url"
              alt="Thumbnail"
              class="mb-4 h-80 w-full object-cover"
            />
            <NuxtImg
              v-else
              :src="LogoSVG"
              alt="Thumbnail"
              class="mb-4 h-80 w-full object-cover"
            />
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
                <span class="tracking-wider text-[#DAB38D] uppercase">{{
                  detail.author?.name || "LSM Content Team"
                }}</span>
              </div>
              <div class="flex items-center space-x-1">
                <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
                <span class="text-[#DAB38D] uppercase">{{
                  detail?.published_at
                }}</span>
              </div>
            </div>
            <div
              class="ql-editor mt-4 text-gray-700"
              v-html="detail?.content"
            />

            <div class="flex justify-between px-4">
              <div class="flex w-[400px] flex-wrap items-center gap-x-4">
                <span
                  v-for="tag in detail.tags"
                  :key="tag"
                  class="font-[Ubuntu] text-sm text-[#DAB38D]"
                >
                  #{{ tag }}
                </span>
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
              :to="`/blogs/${content.slug}`"
            >
              <NuxtImg
                v-if="content.image_url"
                :src="content.image_url"
                alt="Thumbnail"
                class="mb-4 h-40 w-full object-cover"
              />
              <NuxtImg
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
                  <span class="tracking-wider text-[#DAB38D] uppercase">{{
                    content.author?.name || "LSM Content Team"
                  }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
                  <span class="text-[#DAB38D] uppercase">{{
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
