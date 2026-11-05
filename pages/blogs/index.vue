<script setup lang="ts">
import { useDebounce } from "@vueuse/core";
import { useRouteQuery } from "@vueuse/router";

import dayjs from "#build/dayjs.imports.mjs";
import LogoSVG from "~/assets/images/logo.svg";
import PublicationQuery from "~/components/audience/PublicationQuery.vue";
import Publications from "~/components/audience/Publications.vue";
import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants";
import { cn } from "~/lib/utils";

const categories = await useCustomFetch("/api/page-data/categories");

const keywordFilter = useRouteQuery<string>("keyword", undefined);
const categoryFilter = useRouteQuery<string>("category", undefined);
const pageFilter = ref(1);
const yearFilter = useRouteQuery<number>("year", undefined);

const debouncedKeyword = useDebounce(keywordFilter, DEBOUNCE_DEFAULT_TIME);

const contents = ref<Record<string, any>[]>([]);
const firstContent = computed(() => contents.value.at(0));
const isLoading = ref(false);
const blink = ref(false);

onMounted(() => {
  isLoading.value = true;
  $fetch("/api/page-data/content-list", {
    params: {
      type: "blog",
      search: keywordFilter.value ?? undefined,
      category: categoryFilter.value?.length ? categoryFilter.value : undefined,
      page: pageFilter.value,
      year: yearFilter.value ?? undefined,
    },
  })
    .then((res) => {
      contents.value = res.data.contents;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

function handleFetchNextPage() {
  $fetch("/api/page-data/content-list", {
    params: {
      type: "blog",
      search: keywordFilter.value,
      category: categoryFilter.value,
      page: (pageFilter.value || 1) + 1,
      year: yearFilter.value,
    },
  }).then((res) => {
    contents.value.push(...res.data.contents);
  });
}

const archives = computed(() => {
  const startYear = 2006;

  const currentYear = dayjs().year();

  const years = [];

  for (let y = startYear; y <= currentYear; y++) {
    years.push(y);
  }

  return years.reverse();
});

watch(
  [debouncedKeyword, categoryFilter, yearFilter],
  ([keyword, category, year]) => {
    pageFilter.value = 1;

    isLoading.value = true;
    $fetch("/api/page-data/content-list", {
      params: {
        type: "blog",
        search: keyword,
        category,
        page: 1,
        year,
      },
    })
      .then((res) => {
        contents.value = res.data.contents;
      })
      .finally(() => {
        isLoading.value = false;
      });
  }
);

function loadMore() {
  if (isLoading.value) {
    return;
  }

  isLoading.value = true;
  handleFetchNextPage();
  isLoading.value = false;
}

function resetFilters() {
  window.location.href = "/blogs";
}
</script>

<template>
  <div>
    <!-- Mobile -->
    <section class="md:hidden">
      <PublicationQuery
        v-model:keyword="keywordFilter"
        v-model:category="categoryFilter"
        v-model:year="yearFilter"
        :archives="archives"
        :categories="categories.data.data.categories as any"
      />
    </section>
    <section class="md:hidden">
      <div class="p-4">
        <Publications :publications="contents" />
      </div>
    </section>
    <!-- Desktop -->
    <section class="hidden w-full justify-center md:flex">
      <div
        class="mx-auto flex w-full max-w-7xl flex-row gap-8 p-4 px-2 sm:px-6 lg:px-8"
      >
        <!-- Sidebar -->
        <div class="w-1/4">
          <div class="mb-8 flex flex-col">
            <div class="mb-8 flex">
              <h2 class="font-[Marcellus] text-3xl text-[#4B3D2A]">Search</h2>
            </div>
            <div class="flex w-full flex-col gap-y-4">
              <UiInput
                v-model="keywordFilter"
                type="text"
                placeholder="Search..."
                class="w-full rounded-md border border-gray-300 bg-[#F5F5F5] p-2"
              />
              <button
                class="mx-1 rounded-md p-2 font-[Ubuntu]"
                :class="{
                  'text-gray-300': !blink,
                  'border border-[#4B3D2A] bg-[#DAB38D] text-[#4B3D2A]': blink,
                }"
                @click="resetFilters"
              >
                Reset Filters
              </button>
            </div>
          </div>
          <!-- Kategoti been Hidden -->
          <!-- <div class="flex flex-col mb-8">
						<div class="flex mb-8">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Kategori
							</h2>
						</div>
						<button
							v-for="category in categories.data?.data?.categories"
							:key="category.id"
							to="#"
							class="text-[#DAB38D] font-[Ubuntu] text-lg mb-2 hover:underline text-left max-w-[300px] truncate"
							@click="categoryFilter = category.id"
						>
							{{ category.name }}
						</button>
					</div> -->
          <!-- <div class="flex flex-col mb-8">
						<div class="flex mb-8">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Arsip
							</h2>
						</div>
						<div class="flex flex-wrap max-w-[150px]">
							<div
								v-for="archive in archives"
								:key="archive"
								to="#"
								:class="cn(`text-[#DAB38D] font-[Ubuntu] text-lg text-left w-fit cursor-pointer px-1 py-0.5`, {
									'hover:underline': yearFilter !== archive,
									'underline font-bold': yearFilter === archive,
								})"
								@click="yearFilter = archive"
							>
								{{ archive }}
							</div>
						</div>
					</div> -->
        </div>

        <!-- Main Content -->
        <div class="w-3/4">
          <!-- Featured Post -->
          <!-- <nuxt-link
						v-if="firstContent"
						class="mb-10"
						:to="`/blogs/${firstContent?.slug}`"
					>
						<NuxtImg
							v-if="firstContent?.image_url"
							:src="firstContent?.image_url"
							class="w-full h-64 object-cover object-center mb-4"
						/>
						<NuxtImg
							v-else
							:src="LogoSVG"
							alt="Thumbnail"
							class="w-full h-64 object-cover object-center mb-4"
						/>
						<span class="text-sm text-[#DAB38D] font-[Ubuntu]">{{ firstContent?.category }}</span>
						<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
							{{ firstContent?.title }}
						</h3>
						<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
							<div class="flex items-center space-x-1 ">
								<img
									v-if="firstContent?.author?.photo_url"
									:src="firstContent.author?.photo_url"
									alt="Author"
									class="w-8 h-8 rounded-full mr-1"
								>
								<span class="uppercase tracking-wider text-[#DAB38D]">{{ firstContent?.author?.name || 'LSM Content Team' }}</span>
							</div>
							<div class="flex items-center space-x-1">
								<Icon
									name="mdi:calendar"
									size="20"
									class="text-[#DAB38D]"
								/>
								<span class="uppercase text-[#DAB38D]">{{ firstContent?.published_at }}</span>
							</div>
						</div>
						<p class="mt-4 text-gray-700 line-clamp-2">
							{{ firstContent?.description }}
						</p>
						<button class="mt-4 px-4 py-2 bg-[#91AEAC] text-white hover:bg-[#9aaea1] rounded w-fit text-sm">
							Read More
						</button>
					</nuxt-link> -->

          <!-- Grid of Posts -->
          <div class="mt-10 grid grid-cols-1 gap-4">
            <nuxt-link
              v-for="(post, index) in contents"
              :key="index"
              class="mb-6"
              :to="`/blogs/${post.slug}`"
            >
              <!-- <NuxtImg
								v-if="post?.image_url"
								:src="post?.image_url"
								class="w-full h-64 object-cover object-center mb-4"
							/>
							<NuxtImg
								v-else
								:src="LogoSVG"
								alt="Thumbnail"
								class="w-full h-64 object-cover object-center mb-4"
							/> -->
              <span class="font-[Ubuntu] text-sm text-[#DAB38D]">{{
                post?.category
              }}</span>
              <h3 class="font-[Marcellus] text-xl leading-snug text-[#4B3D2A]">
                {{ post?.title }}
              </h3>
              <div
                class="mt-4 flex items-center space-x-4 font-[Ubuntu] text-xs text-[#2e1e10]"
              >
                <div class="flex items-center space-x-1">
                  <img
                    v-if="post?.author?.photo_url"
                    :src="post?.author?.photo_url"
                    alt="Author"
                    class="mr-1 h-8 w-8 rounded-full"
                  />
                  <span class="tracking-wider text-[#DAB38D] uppercase">{{
                    post?.author?.name || "LSM Content Team"
                  }}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon name="mdi:calendar" size="20" class="text-[#DAB38D]" />
                  <span class="text-[#DAB38D] uppercase">{{
                    post?.published_at
                  }}</span>
                </div>
              </div>
              <p class="mt-4 line-clamp-2 text-gray-700">
                {{ post?.description }}
              </p>
              <button
                class="mt-4 w-fit rounded bg-[#91AEAC] px-4 py-2 text-sm text-white hover:bg-[#9aaea1]"
              >
                Read More
              </button>
            </nuxt-link>
          </div>
          <div class="mt-10 flex w-full justify-center">
            <button
              v-if="!isLoading && firstContent"
              class="rounded-md bg-[#4B3D2A] px-4 py-2 font-[Ubuntu] text-[#DAB38D] hover:cursor-pointer"
              @click="loadMore"
            >
              Load More
            </button>
            <div v-if="!firstContent && !isLoading">
              <span class="font-[Ubuntu] text-lg text-gray-400">
                No blogs found.
              </span>
            </div>
            <div v-if="isLoading" class="w-full">
              <UiSkeleton class="h-[315px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
