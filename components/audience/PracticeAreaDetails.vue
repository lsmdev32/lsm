<script setup lang="ts">
import { ref } from "vue"

const categories = [
	{
		title: "Dispute Resolution",
		paragraph: "We provide comprehensive legal services in dispute resolution, ensuring our clients' rights are protected.",
		items: [
			{ title: "Administrative Dispute", description: "Handling administrative disputes with precision.", image: "https://via.placeholder.com/400x200?text=Administrative+Dispute" },
			{ title: "Constitutional Dispute", description: "Advising on constitutional legal conflicts.", image: "https://via.placeholder.com/400x200?text=Constitutional+Dispute" },
			{ title: "Industrial Relation Dispute", description: "Managing employer-employee conflicts legally.", image: "https://via.placeholder.com/400x200?text=Industrial+Dispute" },
			{ title: "Criminal Defense", description: "Legal defense in criminal proceedings.", image: "https://via.placeholder.com/400x200?text=Criminal+Defense" },
			{ title: "Commercial Litigation", description: "Representing commercial disputes in court.", image: "https://via.placeholder.com/400x200?text=Commercial+Litigation" },
			{ title: "Bankruptcy and Suspension of Payment Dispute", description: "Managing business insolvency processes.", image: "https://via.placeholder.com/400x200?text=Bankruptcy" },
			{ title: "Arbitration", description: "Resolving disputes outside of court.", image: "https://via.placeholder.com/400x200?text=Arbitration" },
			{ title: "Mass Media (Dispute-Related Aspects)", description: "Media disputes and legal response.", image: "https://via.placeholder.com/400x200?text=Media+Disputes" },
			{ title: "Election", description: "Legal support for electoral issues.", image: "https://via.placeholder.com/400x200?text=Election" },
			{ title: "Environment", description: "Environmental law-related cases.", image: "https://via.placeholder.com/400x200?text=Environment" },
			{ title: "Corruption Crime", description: "Defense and guidance in corruption allegations.", image: "https://via.placeholder.com/400x200?text=Corruption" },
		],
	},
	{
		title: "Corporate Commercial",
		paragraph: "We offer expert legal services in corporate and commercial law, ensuring compliance and strategic advantage.",
		items: [
			{ title: "Corporate Commercial", description: "Advising on company laws and transactions.", image: "https://via.placeholder.com/400x200?text=Corporate" },
			{ title: "Energy", description: "Legal assistance in the energy sector.", image: "https://via.placeholder.com/400x200?text=Energy" },
			{ title: "Education", description: "Educational institution legal compliance.", image: "https://via.placeholder.com/400x200?text=Education" },
		],
	},
	{
		title: "Intellectual Property",
		paragraph: "We specialize in protecting intellectual property rights, ensuring innovation and creativity are safeguarded.",
		items: [{ title: "Mass Media (IP-Related Aspects)", description: "Protecting intellectual property in" }],
	},
]

const activeCategory = ref(0)
const activeSubItem = ref(null)
</script>

<template>
	<div class="md:hidden w-full mx-auto mb-4 py-4 z-0">
		<!-- Main Category Selector -->
		<div class="flex overflow-x-auto gap-6 px-4 py-4 border-b font-[Marcellus] text-[#DAB38D]">
			<span
				v-for="(category, index) in categories"
				:key="index"
				:class="[
					'text-2xl cursor-pointer whitespace-nowrap',
					activeCategory === index ? 'text-[#4B3D2A]' : 'text-[#DAB38D]',
				]"
				@click="activeCategory = index; activeSubItem = null"
			>
				{{ category.title }}
			</span>
		</div>

		<!-- Sub-items -->
		<div
			v-if="activeCategory !== null"
			class="mt-4 px-4  flex flex-wrap gap-y-8"
		>
			<div
				v-for="(item, idx) in categories[activeCategory].items"
				:key="idx"
				class="basis-1/2 shrink-0 cursor-pointer text-[#DAB38D] font-[Ubuntu] hover:text-[#4B3D2A] transition-colors"
				@click="activeSubItem = item"
			>
				{{ item.title }}
			</div>
		</div>

		<!-- Sub-item Detail Default -->
		<div
			v-if="activeCategory === (0) && !activeSubItem"
			class="mt-6 w-full transition-all duration-300"
		>
			<div class="flex items-center justify-start bg-[url('~/assets/images/dr-m-thumbnail.svg')] bg-cover w-full h-36 mb-4 px-4">
				<h2 class="text-4xl text-white font-[Marcellus] font-light">
					{{ categories[activeCategory]?.title }}
				</h2>
			</div>
			<div class="mt-6 p-4 transition-all duration-300">
				<p class="text-[#949494] font-[Ubuntu]">
					{{ categories[activeCategory]?.paragraph }}
				</p>
			</div>
		</div>
		<div
			v-if="activeCategory === (1) && !activeSubItem"
			class="mt-6 w-full transition-all duration-300"
		>
			<div class="flex items-center justify-start bg-[url('~/assets/images/cc-m-thumbnail.svg')] bg-cover w-full h-36 mb-4 px-4">
				<h2 class="text-4xl text-white font-[Marcellus] font-light">
					{{ categories[activeCategory]?.title }}
				</h2>
			</div>
			<div class="mt-6 p-4 transition-all duration-300">
				<p class="text-[#949494] font-[Ubuntu]">
					{{ categories[activeCategory]?.paragraph }}
				</p>
			</div>
		</div>
		<div
			v-if="activeCategory === (2) && !activeSubItem"
			class="mt-6 w-full transition-all duration-300"
		>
			<div class="flex items-center justify-start bg-[url('~/assets/images/ip-m-thumbnail.svg')] bg-cover w-full h-36 mb-4 px-4">
				<h2 class="text-4xl text-white font-[Marcellus] font-light">
					{{ categories[activeCategory]?.title }}
				</h2>
			</div>
			<div class="mt-6 p-4 transition-all duration-300">
				<p class="text-[#949494] font-[Ubuntu]">
					{{ categories[activeCategory]?.paragraph }}
				</p>
			</div>
		</div>
		<!-- Sub-item Details -->
		<div
			v-if="activeSubItem && activeCategory === (0)"
			class="mt-6 w-full transition-all duration-300"
		>
			<div class="flex items-center justify-start bg-[url('~/assets/images/dr-m-thumbnail.svg')] bg-cover w-full h-36 mb-4 px-4">
				<h2 class="text-4xl text-white font-[Marcellus] font-light">
					{{ activeSubItem.title }}
				</h2>
			</div>
			<div
				v-if="activeSubItem"
				class="mt-6 p-4 transition-all duration-300"
			>
				<p class="text-[#949494] font-[Ubuntu]">
					{{ activeSubItem.description }}
				</p>
			</div>
		</div>
		<div
			v-if="activeSubItem && activeCategory === (1)"
			class="mt-6 w-full transition-all duration-300"
		>
			<div class="flex items-center justify-start bg-[url('~/assets/images/cc-m-thumbnail.svg')] bg-cover w-full h-36 mb-4 px-4">
				<h2 class="text-4xl text-white font-[Marcellus] font-light">
					{{ activeSubItem.title }}
				</h2>
			</div>
			<div
				v-if="activeSubItem"
				class="mt-6 p-4 transition-all duration-300"
			>
				<p class="text-[#949494] font-[Ubuntu]">
					{{ activeSubItem.description }}
				</p>
			</div>
		</div>
		<div
			v-if="activeSubItem && activeCategory === (2)"
			class="mt-6 w-full transition-all duration-300"
		>
			<div class="flex items-center justify-start bg-[url('~/assets/images/ip-m-thumbnail.svg')] bg-cover w-full h-36 mb-4 px-4">
				<h2 class="text-4xl text-white font-[Marcellus] font-light">
					{{ activeSubItem.title }}
				</h2>
			</div>
			<div
				v-if="activeSubItem"
				class="mt-6 p-4 transition-all duration-300"
			>
				<p class="text-[#949494] font-[Ubuntu]">
					{{ activeSubItem.description }}
				</p>
			</div>
		</div>
	</div>
</template>
