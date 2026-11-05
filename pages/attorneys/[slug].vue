<script setup lang="ts">
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { ref, computed } from "vue";

import Publications from "~/components/audience/Publications.vue";

const slug = useRoute().params.slug as string;

const { data } = await useCustomFetch(`/rest/page-data/staffs/${slug}`);

const result = data?.data;

if (!result) {
  throw createError({
    statusCode: 404,
    statusMessage: "Attorney profile not found",
  });
}

defineProps({
  image: String,
  name: String,
  email: String,
  description: String,
});

// Unified active tab state
const activeTab = ref<
  "partner" | "associate" | "founder" | "of-counsel" | null
>(null);

// Computed booleans for template compatibility
const showPartners = computed(() => activeTab.value === "partner");
const showAssociates = computed(() => activeTab.value === "associate");
const showFounders = computed(() => activeTab.value === "founder");
const showOfCounsels = computed(() => activeTab.value === "of-counsel");

// Toggle helpers
function togglePartners() {
  activeTab.value = activeTab.value === "partner" ? null : "partner";
}

function toggleAssociates() {
  activeTab.value = activeTab.value === "associate" ? null : "associate";
}

function toggleFounders() {
  activeTab.value = activeTab.value === "founder" ? null : "founder";
}

function toggleOfCounsels() {
  activeTab.value = activeTab.value === "of-counsel" ? null : "of-counsel";
}

// Close helpers (only close if that tab is currently active)
function closePartners() {
  if (activeTab.value === "partner") {
    activeTab.value = null;
  }
}

function closeAssociates() {
  if (activeTab.value === "associate") {
    activeTab.value = null;
  }
}

function closeFounders() {
  if (activeTab.value === "founder") {
    activeTab.value = null;
  }
}

function closeOfCounsels() {
  if (activeTab.value === "of-counsel") {
    activeTab.value = null;
  }
}
</script>

<template>
  <div>
    <!-- Desktop -->
    <section class="hidden md:block">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-10 px-2 py-12 sm:px-6 md:flex-row lg:px-8"
      >
        <!-- Sidebar: List Partners -->
        <div class="flex flex-col space-y-4">
          <aside class="space-y-4 pr-8 md:col-span-1">
            <h2 class="font-[Marcellus] text-3xl text-[#2e1e10]">Founders</h2>
            <ul
              class="space-y-2 whitespace-nowrap font-[Ubuntu] text-[#c89d71]"
            >
              <li
                v-for="founder in result.other_founders"
                :key="founder.id"
                class="cursor-pointer hover:underline"
              >
                <nuxt-link
                  :href="`/attorneys/${founder.slug}`"
                  class="line-clamp-2 w-[150px] truncate text-wrap"
                >
                  {{ founder.name }}
                </nuxt-link>
              </li>
            </ul>
          </aside>
          <aside class="space-y-4 pr-8 md:col-span-1">
            <h2 class="font-[Marcellus] text-3xl text-[#2e1e10]">Partners</h2>
            <ul
              class="space-y-2 whitespace-nowrap font-[Ubuntu] text-[#c89d71]"
            >
              <li
                v-for="partner in result.other_partners"
                :key="partner.id"
                class="cursor-pointer hover:underline"
              >
                <nuxt-link
                  :href="`/attorneys/${partner.slug}`"
                  class="line-clamp-2 w-[150px] truncate text-wrap"
                >
                  {{ partner.name }}
                </nuxt-link>
              </li>
            </ul>
          </aside>
        </div>

        <!-- Main Profile Section -->
        <div
          class="border-bottom-left-radius flex w-full flex-col items-center bg-[#dfb78d] md:flex-row md:rounded-bl-[152px] lg:rounded-bl-[128px]"
        >
          <!-- Circle Image -->
          <div
            class="relative shrink-0 overflow-hidden rounded-full md:h-[287px] md:w-[287px] md:rounded-l-full lg:h-[260px] lg:w-[260px]"
          >
            <NuxtImg
              :src="result.person.image_url"
              alt=""
              class="h-full w-full object-cover object-top"
            />
          </div>

          <!-- Text Content -->
          <div class="mt-6 text-center md:ml-10 md:text-left">
            <h1
              class="font-[Marcellus] text-4xl uppercase leading-tight text-[#3a2b1c]"
            >
              {{ result.person.name }}
            </h1>

            <p class="mt-4 max-w-xl font-[Ubuntu] leading-relaxed text-white">
              {{ result.person.short_bio }}
            </p>

            <!-- Contact Info -->
            <div
              class="my-4 flex flex-col items-center justify-center gap-2 pb-2 text-sm text-[#3a2b1c] sm:flex-row lg:justify-start"
            >
              <nuxt-link
                :href="result.person.linkedin_url"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B3D2A] text-[#DAB38D] hover:text-white"
              >
                <Icon name="mdi:linkedin" size="20" />
              </nuxt-link>
              <div
                class="mr-2 flex items-center gap-2 font-[Ubuntu] text-white"
              >
                <span class="first-letter:uppercase">{{
                  result.person.name
                }}</span>
              </div>
              <nuxt-link
                :href="`mailto:${result.person.email}`"
                class="flex h-10 w-10 items-center justify-center rounded-full bg-[#4B3D2A] text-[#DAB38D] hover:text-white"
              >
                <Icon name="mdi:email-outline" size="20" />
              </nuxt-link>
              <div
                class="mr-2 flex items-center gap-2 font-[Ubuntu] text-white"
              >
                <span class="first-letter:uppercase">{{
                  result.person.email
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mx-auto flex max-w-7xl flex-col gap-10 px-2 pb-12 sm:px-6 md:flex-row lg:px-8"
      >
        <!-- Sidebar: List Partners -->
        <div class="flex flex-col space-y-4">
          <aside class="space-y-4 pr-2 md:col-span-1">
            <h2 class="font-[Marcellus] text-3xl text-[#2e1e10]">
              Of Counsels
            </h2>
            <ul
              class="space-y-2 whitespace-nowrap font-[Ubuntu] text-[#c89d71]"
            >
              <li
                v-for="counsel in result.other_of_counsels"
                :key="counsel.id"
                class="cursor-pointer hover:underline"
              >
                <nuxt-link
                  :href="`/attorneys/${counsel.slug}`"
                  class="line-clamp-2 w-[150px] truncate text-wrap"
                >
                  {{ counsel.name }}
                </nuxt-link>
              </li>
            </ul>
          </aside>
          <aside class="space-y-4 pr-8 md:col-span-1">
            <h2 class="font-[Marcellus] text-3xl text-[#2e1e10]">Associate</h2>
            <ul
              class="space-y-2 whitespace-nowrap font-[Ubuntu] text-[#c89d71]"
            >
              <li
                v-for="associate in result.other_associates"
                :key="associate.id"
                class="cursor-pointer hover:underline"
              >
                <nuxt-link
                  :href="`/attorneys/${associate.slug}`"
                  class="line-clamp-2 w-[150px] truncate text-wrap"
                >
                  {{ associate.name }}
                </nuxt-link>
              </li>
            </ul>
          </aside>
        </div>

        <!-- Main Profile Section -->
        <div
          class="flex w-full flex-col space-y-4 font-[Ubuntu] text-[#949494]"
        >
          <div
            class="ql-editor text-justify [&_*]:tracking-wide"
            v-html="result.person.bio"
          />
          <!-- <div class="flex justify-between items-center pt-4">
						<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
							Publication
						</h2>
						<NuxtLink
							to="/publications"
							class="text-sm text-[#DAB38D] hover:underline"
						>
							See More &gt;
						</NuxtLink>
					</div> -->
          <div class="flex-row pb-8">
            <Publications
              :default-author-name="result.person.name"
              :default-author-image="result.person.image_url"
              :publications="result.publications"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Mobile -->
    <section class="md:hidden">
      <div class="mx-auto flex max-w-7xl flex-col md:flex-row">
        <!-- Sidebar: List Partners -->
        <div class="p-4">
          <section class="md:hidden">
            <!-- Buttons -->
            <div class="mb-4 flex justify-between">
              <button
                class="mx-1 flex-1 rounded-md p-2 font-[Ubuntu]"
                :class="{
                  'text-[#DAB38D]': !showFounders,
                  'border border-[#4B3D2A] bg-[#DAB38D] text-[#4B3D2A]':
                    showFounders,
                }"
                @click="toggleFounders"
              >
                Founders
              </button>
              <button
                class="mx-1 flex-1 rounded-md p-2 font-[Ubuntu]"
                :class="{
                  'text-[#DAB38D]': !showPartners,
                  'border border-[#4B3D2A] bg-[#DAB38D] text-[#4B3D2A]':
                    showPartners,
                }"
                @click="togglePartners"
              >
                Partners
              </button>
              <button
                class="mx-1 flex-1 rounded-md p-2 font-[Ubuntu]"
                :class="{
                  'bg-white text-[#DAB38D]': !showOfCounsels,
                  'border border-[#4B3D2A] bg-[#DAB38D] text-[#4B3D2A]':
                    showOfCounsels,
                }"
                @click="toggleOfCounsels"
              >
                Of Counsels
              </button>
              <button
                class="mx-1 flex-1 rounded-md p-2 font-[Ubuntu]"
                :class="{
                  'bg-white text-[#DAB38D]': !showAssociates,
                  'border border-[#4B3D2A] bg-[#DAB38D] text-[#4B3D2A]':
                    showAssociates,
                }"
                @click="toggleAssociates"
              >
                Associates
              </button>
            </div>

            <!-- Founders Menu -->
            <div v-if="showFounders" class="w-full bg-white p-2">
              <div class="mb-2 flex justify-end">
                <button
                  class="text-gray-600 hover:text-gray-800"
                  @click="closeFounders"
                >
                  ✕
                </button>
              </div>
              <ul>
                <li
                  v-for="founder in result.other_founders"
                  :key="founder.id"
                  class="py-2 font-[Ubuntu] text-lg text-[#DAB38D] last:border-b-0"
                >
                  <nuxt-link :href="`/attorneys/${founder.slug}`">
                    {{ founder.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <!-- Partners Menu -->
            <div v-if="showPartners" class="w-full bg-white p-2">
              <div class="mb-2 flex justify-end">
                <button
                  class="text-gray-600 hover:text-gray-800"
                  @click="closePartners"
                >
                  ✕
                </button>
              </div>
              <ul>
                <li
                  v-for="partner in result.other_partners"
                  :key="partner.id"
                  class="py-2 font-[Ubuntu] text-lg text-[#DAB38D] last:border-b-0"
                >
                  <nuxt-link :href="`/attorneys/${partner.slug}`">
                    {{ partner.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <!-- Of Counsel Menu -->
            <div v-if="showOfCounsels" class="w-full bg-white p-2">
              <div class="mb-2 flex justify-end">
                <button
                  class="text-gray-600 hover:text-gray-800"
                  @click="closeOfCounsels"
                >
                  ✕
                </button>
              </div>
              <ul>
                <li
                  v-for="ofCounsel in result.other_of_counsels"
                  :key="ofCounsel.id"
                  class="py-2 font-[Ubuntu] text-lg text-[#DAB38D] last:border-b-0"
                >
                  <nuxt-link :href="`/attorneys/${ofCounsel.slug}`">
                    {{ ofCounsel.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>

            <!-- Associates Menu -->
            <div v-if="showAssociates" class="w-full bg-white p-2">
              <div class="mb-2 flex justify-end">
                <button
                  class="text-gray-600 hover:text-gray-800"
                  @click="closeAssociates"
                >
                  ✕
                </button>
              </div>
              <ul>
                <li
                  v-for="associate in result.other_associates"
                  :key="associate.id"
                  class="py-2 font-[Ubuntu] text-lg text-[#DAB38D] last:border-b-0"
                >
                  <nuxt-link :href="`/attorneys/${associate.slug}`">
                    {{ associate.name }}
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <!-- Main Profile Section -->
        <div class="flex flex-col items-center space-y-4 px-4 py-6">
          <!-- Gambar dengan ABOUT LSM -->
          <div class="relative w-full">
            <NuxtImg
              :src="result.person.image_url"
              alt=""
              class="h-[450px] w-full object-cover"
            />
            <h2
              class="absolute bottom-6 left-6 font-[Marcellus] text-2xl font-light text-white"
            >
              {{ result.person.name }}
              <div
                class="mt-1 flex flex-row pb-2 text-sm text-[#3a2b1c] sm:flex-row"
              >
                <nuxt-link
                  :href="result.person.linkedin_url"
                  class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#4B3D2A] text-white hover:text-[#DAB38D]"
                >
                  <Icon name="mdi:linkedin" size="18" />
                </nuxt-link>

                <nuxt-link
                  :href="`mailto:${result.person.email}`"
                  class="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#4B3D2A] text-white hover:text-[#DAB38D]"
                >
                  <Icon name="mdi:email-outline" size="18" />
                </nuxt-link>
              </div>
            </h2>
          </div>
          <div class="grid grid-cols-2 gap-6">
            <!-- Panah -->
            <div class="w-[30px]">
              <img
                src="../../assets/Arrow 1.png"
                alt=""
                style="height: 34px; width: 16px"
              />
            </div>

            <!-- Deskripsi -->
            <p
              class="text-1xl eading-relaxed -ml-8 font-[Marcellus] text-[#D9B28C]"
            >
              {{ result.person.short_bio }}
            </p>
          </div>
          <div
            class="flex w-full flex-col space-y-4 font-[Ubuntu] text-[#949494]"
          >
            <!-- Text Content -->
            <div
              class="ql-editor text-justify [&_*]:tracking-wide"
              v-html="result.person.bio"
            />
            <!-- <div class="flex justify-center items-center pt-2">
							<h2 class="text-3xl font-[Marcellus] text-[#4B3D2A]">
								Publication
							</h2>
						</div> -->
            <!-- <div class="mt-4 flex-row">
							<Publications
								:default-author-name="result.person.name"
								:default-author-image="result.person.image_url"
								:publications="result.publications"
							/>
							<div class="flex justify-end mb-8 mt-[-24px]">
								<NuxtLink
									to="/publications"
									class="text-sm text-[#DAB38D] hover:underline"
								>
									See More &gt;
								</NuxtLink>
							</div>
						</div> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
