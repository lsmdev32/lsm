<template>
  <div class="relative w-full overflow-hidden bg-[#91AEAC]">
    <!-- Main carousel container -->
    <div class="relative h-80 overflow-hidden">
      <div
        class="flex h-full transition-transform duration-500 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="flex w-full flex-shrink-0 items-center justify-center p-8"
        >
          <div class="mx-auto max-w-7xl px-4 text-center">
            <div class="mx-auto max-w-4xl">
              <!-- Star Rating -->
              <div class="mb-6 flex justify-center">
                <div class="flex space-x-1">
                  <svg
                    v-for="star in 5"
                    :key="star"
                    class="h-6 w-6"
                    :class="
                      star <= review.rating
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
              </div>

              <!-- Review Text -->
              <blockquote
                class="mb-6 font-[Marcellus] text-lg italic leading-relaxed text-white"
              >
                "{{ review.text }}"
              </blockquote>

              <!-- Author Info -->
              <div class="text-center">
                <div class="font-[Marcellus] text-lg font-semibold text-white">
                  {{ review.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Bars -->
    <div class="w-full bg-[#91AEAC]">
      <div class="mx-auto flex max-w-7xl justify-center space-x-2 px-4 py-4">
        <button
          v-for="(review, index) in reviews"
          :key="index"
          class="h-1 rounded-full transition-all duration-200"
          :class="
            currentSlide === index
              ? 'w-8 bg-white'
              : 'w-4 bg-[#BFE7E4] hover:bg-[rgba(148,148,148,0.5)]'
          "
          @click="goToSlide(index)"
        />
      </div>
    </div>

    <!-- Navigation Arrows Container -->
    <div class="pointer-events-none absolute inset-0 mx-auto max-w-7xl px-4">
      <button
        class="group pointer-events-auto absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-[#BFE7E4] p-3 shadow-md transition-all duration-200 hover:shadow-lg"
        @click="prevSlide"
      >
        <svg
          class="h-5 w-5 text-[#949494] transition-colors duration-200 group-hover:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        class="group pointer-events-auto absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-[#BFE7E4] p-3 shadow-md transition-all duration-200 hover:shadow-lg"
        @click="nextSlide"
      >
        <svg
          class="h-5 w-5 text-[#949494] transition-colors duration-200 group-hover:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// Props for customization
const props = defineProps({
  reviews: {
    type: Array,
    default: () => [
      {
        name: "bayu imantoro",
        text: "Para partners yang senior dalam bidang hukum, ramah, dan senang berbagi dengan mahasiswa. Thanks Prof Todung Lubis, Ibu Lelyana Santosa, dan Bang Teguh Maramis yang juga akrab menjadi komentator di televisi khususnya bagi kami pecinta sepakbola.",
        rating: 5,
      },
      {
        name: "Ardha Billy",
        text: "Big five lawyer in jakarta",
        rating: 5,
      },
      {
        name: "Nanda Tanjung",
        text: "Kantor Hukum terpercaya dan profesional",
        rating: 5,
      },
    ],
  },
  autoSlideInterval: {
    type: Number,
    default: 5000, // 5 seconds
  },
});

const currentSlide = ref(0);
let intervalId = null;

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % props.reviews.length;
};

const prevSlide = () => {
  currentSlide.value =
    currentSlide.value === 0
      ? props.reviews.length - 1
      : currentSlide.value - 1;
};

const goToSlide = (index) => {
  currentSlide.value = index;
};

const startAutoSlide = () => {
  intervalId = setInterval(nextSlide, props.autoSlideInterval);
};

const stopAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

onMounted(() => {
  startAutoSlide();
});

onUnmounted(() => {
  stopAutoSlide();
});

// Pause auto-slide on hover
const handleMouseEnter = () => {
  stopAutoSlide();
};

const handleMouseLeave = () => {
  startAutoSlide();
};
</script>
