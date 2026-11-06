<template>
  <div class="z-0 mx-auto mb-4 w-full py-4">
    <!-- Mobile -->
    <section class="md:hidden">
      <!-- Main Categories -->
      <div class="mt-4 flex flex-wrap gap-y-10 pr-4 pl-4">
        <div
          v-for="(item, idx) in mainCategories"
          :key="idx"
          class="font-ubuntu shrink-0 basis-1/2 cursor-pointer text-base whitespace-normal text-[#DAB38D] transition-colors hover:text-[#4B3D2A]"
          @click="activeItem = item"
        >
          {{ item.title }}
        </div>
      </div>

      <!-- Specialized Sectors Title -->
      <div class="mt-8 border-b px-4 pb-2">
        <h2 class="font-marcellus text-2xl text-[#4B3D2A]">
          Specialized Sectors
        </h2>
      </div>

      <!-- Specialized Categories -->
      <div class="mt-4 flex flex-wrap gap-y-8 pr-2 pl-4">
        <div
          v-for="(item, idx) in specializedSectors"
          :key="idx"
          class="font-ubuntu shrink-0 basis-1/2 cursor-pointer text-[#DAB38D] transition-colors hover:text-[#4B3D2A]"
          @click="activeItem = item"
        >
          {{ item.title }}
        </div>
      </div>
    </section>

    <!-- Mobile Content Display -->
    <section class="md:hidden">
      <div v-if="activeItem" class="mt-6 w-full transition-all duration-300">
        <div
          :style="{ backgroundImage: `url(${getBackgroundImage(activeItem)})` }"
          class="relative mb-4 flex h-36 w-full items-center justify-start bg-cover bg-center px-4"
        >
          <div class="absolute inset-0 bg-black/40" />
          <h2
            class="font-marcellus relative z-10 text-4xl font-light text-white"
          >
            {{ activeItem.title }}
          </h2>
        </div>
        <div class="mt-6 p-4 transition-all duration-300">
          <div class="flex flex-col gap-4">
            <div class="flex-1">
              <p
                v-for="(line, index) in activeItem.description"
                :key="index"
                class="text-md font-ubuntu mb-4 text-justify text-[#949494]"
              >
                {{ line }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Desktop -->
    <section
      class="mx-auto hidden h-auto max-w-7xl items-start justify-center px-2 py-4 sm:px-6 md:flex lg:px-8"
    >
      <div class="mx-auto w-full px-4">
        <!-- Main Services Section -->
        <div class="mb-16">
          <div class="flex flex-row gap-20">
            <!-- First Half -->
            <div
              class="font-marcellus flex flex-1 flex-col gap-12 text-[#DAB38D]"
            >
              <div
                v-for="(item, index) in getMainSubItems(0)"
                :key="index"
                class="cursor-pointer text-xl transition-colors"
                :class="{
                  'text-[#4B3D2A]': activeItem?.title === item.title,
                  'text-[#DAB38D]': activeItem?.title !== item.title,
                }"
                @click="activeItem = item"
              >
                {{ item.title }}
              </div>
            </div>

            <!-- Second Half -->
            <div
              class="font-marcellus flex flex-1 flex-col gap-12 text-[#DAB38D]"
            >
              <div
                v-for="(item, index) in getMainSubItems(1)"
                :key="index"
                class="cursor-pointer text-xl transition-colors"
                :class="{
                  'text-[#4B3D2A]': activeItem?.title === item.title,
                  'text-[#DAB38D]': activeItem?.title !== item.title,
                }"
                @click="activeItem = item"
              >
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>

        <!-- Specialized Sectors Section -->
        <div class="mb-16">
          <!-- Section Title -->
          <div class="mb-4">
            <h2 class="font-marcellus text-3xl text-[#4B3D2A]">
              Specialized Sectors
            </h2>
          </div>
          <div
            class="container mx-auto h-[2px] w-full max-w-7xl justify-center bg-[#949494]"
          />
          <div class="flex flex-row gap-20 pt-4">
            <!-- First Half -->
            <div
              class="font-marcellus flex flex-1 flex-col gap-12 text-[#DAB38D]"
            >
              <div
                v-for="(item, index) in getSpecializedSubItems(0)"
                :key="index"
                class="cursor-pointer text-xl transition-colors"
                :class="{
                  'text-[#4B3D2A]': activeItem?.title === item.title,
                  'text-[#DAB38D]': activeItem?.title !== item.title,
                }"
                @click="activeItem = item"
              >
                {{ item.title }}
              </div>
            </div>

            <!-- Second Half -->
            <div
              class="font-marcellus flex flex-1 flex-col gap-12 text-[#DAB38D]"
            >
              <div
                v-for="(item, index) in getSpecializedSubItems(1)"
                :key="index"
                class="cursor-pointer text-xl transition-colors"
                :class="{
                  'text-[#4B3D2A]': activeItem?.title === item.title,
                  'text-[#DAB38D]': activeItem?.title !== item.title,
                }"
                @click="activeItem = item"
              >
                {{ item.title }}
              </div>
            </div>
          </div>
        </div>

        <!-- Desktop Content Display -->
        <section class="z-0 mt-6 h-auto w-full">
          <div
            v-if="activeItem"
            class="mt-6 w-full transition-all duration-300"
          >
            <div
              :style="{
                backgroundImage: `url(${getBackgroundImage(activeItem)})`,
              }"
              class="relative mb-4 flex h-72 w-full items-end justify-start bg-cover bg-center px-4 pb-8"
            >
              <div class="absolute inset-0 bg-black/40" />
              <h2 class="font-marcellus relative z-10 text-4xl text-white">
                {{ activeItem.title }}
              </h2>
            </div>
            <div class="mt-6 p-4 transition-all duration-300">
              <div class="flex flex-row gap-12">
                <div class="flex-1">
                  <p
                    v-for="(line, index) in activeItem.description.slice(0, -1)"
                    :key="index"
                    class="font-ubuntu mb-4 text-justify text-[#949494]"
                  >
                    {{ line }}
                  </p>
                </div>
                <div class="flex-1">
                  <p class="font-ubuntu mb-4 text-justify text-[#949494]">
                    {{
                      activeItem.description[activeItem.description.length - 1]
                    }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// First section Main Category
const mainCategories = [
  {
    title: "Administrative Dispute",
    description: [
      "The dynamic of administrative power in Indonesia for the past decade has been concerning. Despite having more laws than ever, more and more procedures in the law are being ignored by the government, thus causing disputes, especially with business actors.",
      "Engaging with a versatile, creative, and experienced team is the sole means to navigate the jungle of administrative disputes in Indonesia.",
      "Whatever the challenge or opportunity arises, we are with the client every step of the way.",
    ],
  },
  {
    title: "Constitutional Dispute",
    description: [
      "Contradictory laws and regulations are a common situation in Indonesia. Consequently, questions about which law prevails and how to read the law are commonly asked by our clients due to the uncertain nature of Indonesia's laws and regulations.",
      "Having a team with a deep understanding of the structure and culture of laws and regulations in Indonesia is highly desirable to have distinctive advantages.",
    ],
  },
  {
    title: "Industrial Relation Dispute",
    description: [
      "Recent years have welcomed a substantive change in laws and regulations related to industrial relations. If not handled properly, these changes could be a source of dispute.",
      "Our team, who are well-versed in these changes and have successfully handled numerous industrial relations disputes, will be a suitable representation of the client.",
    ],
  },
  {
    title: "Criminal Defense",
    description: [
      "Criminal investigations drain a lot of resources and adversely impact anyone involved. Each case requires a tailored approach to contain the impact, be it preventive or reactive.",
      "Our experienced attorneys provide robust defense strategies for clients facing or initiating criminal proceedings, prioritizing their rights and interests.",
    ],
  },
  {
    title: "Commercial Litigation",
    description: [
      "The landscape of commercial litigation in Indonesia is becoming increasingly complex. The district court is no longer the prime option to settle the dispute. Arbitration, commercial court, administrative court, and even criminal proceedings are now approaches that shall be taken into account.",
      "Having lawyers who can cover every possible aspect of the spectrum is the way to go, not only to mitigate but also to handle the dispute.",
    ],
  },
  {
    title: "Bankruptcy and Suspension of Payment Dispute",
    description: [
      "The legal proceedings surrounding bankruptcy and suspension of payment in Indonesia present significant challenges due to their complexity and the potential for protracted disputes. Additionally, the potential for creditor disputes, asset protection issues, and regulatory compliance can further complicate the process.",
      "A team of experts is invaluable in facilitating efficient resolutions, protecting clients' interests, and helping mitigate risks of prolonged litigation, ultimately safeguarding businesses and preserving value in the industry. ",
    ],
  },
  {
    title: "Arbitration",
    description: [
      "Arbitration in Indonesia is unique as it is heavily interconnected with the court. For one, the arbitration award is subject to scrutiny by the district court, and further, the procedures can be affected and even forced to be amended by the Supreme Court through the instrument of laws and regulations.",
      "Understanding this intricate relation is a requirement to provide an effective legal representation. And our team, having honed our senses in numerous cases, is the best companion to go through the arbitration proceedings.",
    ],
  },
];

// Second section - Specialized Sectors
const specializedSectors = [
  {
    title: "Mass Media",
    description: [
      "The mass media industry in Indonesia faces several legal challenges, including freedom of the press, defamation, copyright infringement, and compliance with digital and broadcasting regulations. With the rise of social media and online platforms, new legal concerns have emerged, such as misinformation, cyberbullying, and content moderation disputes.",
      "Engaging with our firm, which has a rich background in mass media, can provide significant benefits in navigating complex legal landscapes while upholding ethical journalism and avoiding reputational risks.",
    ],
  },
  {
    title: "Energy",
    description: [
      "Indonesia's energy transition, aimed at shifting from fossil fuels to renewable energy sources, presents significant legal challenges due to the country's complex regulatory framework, land use issues, and the need for substantial foreign and domestic investment.",
      "By offering innovative legal solutions, our firm can support the energy industry in achieving a smoother and more efficient transition, fostering growth while aligning with Indonesia's sustainability goals.",
    ],
  },
  {
    title: "Education",
    description: [
      "The rapid integration of digital learning platforms has introduced complexities in the education sector, such as data protection, cybersecurity, and compliance with licensing regulations for online education. Moreover, balancing the interests of public and private stakeholders often leads to legal disputes, particularly regarding management, funding, and accreditation.",
      "Our team is more than qualified to offer tailored legal solutions aiming to achieve operational excellence and contribute to improving the quality and accessibility of education in Indonesia.",
    ],
  },
  {
    title: "Corruption Crime",
    description: [
      "Corruption provisions in Indonesia are all-encompassing, even reaching to policymaking and advice. These broad legal definitions often blur the line between criminal intent and good-faith governance and business. Coupled with intense media scrutiny, complex investigative procedures, and potential biases, any parties involved often find themselves at a disadvantage.",
      "Our team can dissect the nuances of anti-corruption laws, highlight the absence of criminal intent, and demonstrate the legitimacy of policy or business decisions. Our skilled members can also manage reputational risks by effectively addressing public narratives and ensuring fair treatment under the law.",
    ],
  },
  {
    title: "Election",
    description: [
      "Legal challenges during general elections in Indonesia often arise from disputes over electoral processes, such as candidate eligibility, vote-count irregularities, campaign violations, or allegations of fraud. Each issue shall be handled within each stage with specialized approach.",
      "Having a team of experts in election process is crucial for political parties or candidates involved in such disputes, as it ensures a robust legal strategy, accurate representation in court, and adherence to procedural requirements.",
      "On the other hand, our reputation will enhance credibility, minimize reputational risks, and allow parties to focus on the political agenda while we handle the intricate litigation process.",
    ],
  },
  {
    title: "Environment",
    description: [
      "Environmental issues are extremely complex as it brings together inadequate regulations, local and international attention, overlapping legal remedies, and of course the SLAPP.",
      "An experienced team like ours with a deep understanding of Indonesia's environmental laws, regulatory frameworks, and judicial precedents is required to navigate these issues effectively. We can provide expert guidance, ensure compliance, and develop robust defense strategies to address environmental disputes and regulatory actions.",
    ],
  },
  {
    title: "Corporate Commercial",
    description: [
      "In an ever-evolving business environment like Indonesia, sound legal advice is essential to safeguard and advance corporate interests. Our firm specializes in providing insightful and practical counsel on a broad spectrum of corporate matters, ensuring our clients stay compliant and prepared for challenges.",
      "Our team of lawyers guides clients through regulatory frameworks, internal governance, and day-to-day corporate law matters with clarity and precision.",
    ],
  },
];

interface PracticeArea {
  title: string;
  description: string[];
}

const activeItem = ref<PracticeArea | null>(null);

onMounted(() => {
  activeItem.value =
    mainCategories.find((item) => item.title === "Administrative Dispute") ||
    mainCategories[0];
  console.log("Initial Active Item:", activeItem.value.title);
});

const getMainSubItems = (columnIndex: number) => {
  const items = mainCategories;
  const half = Math.ceil(items.length / 2);

  return columnIndex === 0 ? items.slice(0, half) : items.slice(half);
};

const getSpecializedSubItems = (columnIndex: number) => {
  const items = specializedSectors;
  const half = Math.ceil(items.length / 2);

  return columnIndex === 0 ? items.slice(0, half) : items.slice(half);
};

const mainImages = [
  "/images/administrative-dispute.jpg",
  "/images/constitutional-2.jpg",
  "/images/industrial-dispute.jpg",
  "/images/criminal-defense.jpg",
  "/images/commercial-litigation.jpg",
  "/images/bankruptcy.jpg",
  "/images/arbitration.jpg",
];

const specializedImages = [
  "/images/mass-media.jpg",
  "/images/energy.jpg",
  "/images/education.jpg",
  "/images/corruption.jpg",
  "/images/election.jpg",
  "/images/environment.jpg",
  "/images/corporate.jpg",
];

const getItemSource = (item: { title: string; description: string[] }) => {
  if (mainCategories.some((category) => category.title === item.title)) {
    return "main";
  }

  if (specializedSectors.some((category) => category.title === item.title)) {
    return "specialized";
  }

  return "main";
};

const getBackgroundImage = (item: { title: string; description: string[] }) => {
  const source = getItemSource(item);

  const index =
    source === "main"
      ? mainCategories.findIndex((category) => category.title === item.title)
      : specializedSectors.findIndex(
          (category) => category.title === item.title
        );

  const images = source === "main" ? mainImages : specializedImages;
  const image = images[index] || images[0];
  console.log(`Source: ${source}, Index: ${index}, Image: ${image}`);

  return image;
};
</script>
