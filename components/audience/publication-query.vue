<script setup lang="ts">
import { cn } from "~/lib/utils";

interface PublicationCategory {
  id: string;
  name: string;
}

interface Props {
  archives?: number[];
  categories?: PublicationCategory[];
}

defineProps<Props>();

const keywordFilter = defineModel<string>("keyword");
const categoryFilter = defineModel<string>("category");
const yearFilter = defineModel<number>("year");
const route = useRoute();

const showCategories = ref(false);
const showArchives = ref(false);
const blink = ref(false);

function toggleCategories() {
  showCategories.value = !showCategories.value;
  showArchives.value = false;
}

function toggleArchives() {
  showArchives.value = !showArchives.value;
  showCategories.value = false;
}

function closeCategories() {
  showCategories.value = false;
}

function closeArchives() {
  showArchives.value = false;
}

function resetFilters() {
  if (route.path.startsWith("/blogs")) {
    location.href = "/blogs";

    return;
  }

  if (route.path.startsWith("/publications")) {
    location.href = "/publications";
  }
}
</script>

<template>
  <div class="p-4">
    <section class="md:hidden">
      <!-- Search Bar -->
      <div class="mb-4">
        <UiInput
          v-model="keywordFilter"
          type="text"
          placeholder="Search..."
          class="w-full rounded-md border border-gray-300 bg-[#F5F5F5] p-2 text-[#C5C5C5]"
        />
      </div>
      <div class="mb-4 flex items-center justify-center">
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
      <!-- Buttons -->
      <!-- <div class="flex justify-between mb-4">
				<button
					class="flex-1 mx-1 p-2 font-[Ubuntu] rounded-md"
					:class="{
						'text-[#DAB38D]': !showCategories,
						'text-[#4B3D2A] border border-[#4B3D2A] bg-[#DAB38D]': showCategories,
					}"
					@click="toggleCategories"
				>
					Categories
				</button>
				<button
					class="flex-1 mx-1 p-2 font-[Ubuntu] rounded-md"
					:class="{
						'text-[#DAB38D]': !showArchives,
						'text-[#4B3D2A] border border-[#4B3D2A] bg-[#DAB38D]': showArchives,
					}"
					@click="toggleArchives"
				>
					Archives
				</button>
			</div> -->

      <!-- Categories Menu -->
      <div v-if="showCategories" class="w-full bg-white p-2">
        <div class="mb-2 flex justify-end">
          <button
            class="text-gray-600 hover:text-gray-800"
            @click="closeCategories"
          >
            ✕
          </button>
        </div>
        <ul>
          <li
            v-for="category in categories"
            :key="category.id as string"
            :class="
              cn(
                `cursor-pointer py-2 font-[Ubuntu] text-lg text-[#DAB38D] last:border-b-0`,
                {
                  underline: category.id === categoryFilter,
                }
              )
            "
            @click="categoryFilter = category.id as string"
          >
            {{ category.name }}
          </li>
        </ul>
      </div>

      <!-- Archives Menu -->
      <div v-if="showArchives" class="w-full bg-white p-2">
        <div class="mb-2 flex justify-end">
          <button
            class="text-gray-600 hover:text-gray-800"
            @click="closeArchives"
          >
            ✕
          </button>
        </div>
        <ul>
          <li
            v-for="archive in archives"
            :key="archive"
            :class="
              cn(
                `cursor-pointer py-2 font-[Ubuntu] text-lg text-[#DAB38D] last:border-b-0`,
                {
                  underline: archive === yearFilter,
                }
              )
            "
            @click="yearFilter = archive"
          >
            {{ archive }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
