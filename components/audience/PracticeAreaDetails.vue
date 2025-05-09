<script setup lang="ts">
import { ref } from "vue"

const categories = [
	{
		title: "Dispute Resolution",
		paragraph: "We provide comprehensive legal services in dispute resolution, ensuring our clients' rights are protected.",
		items: [
			{ title: "Administrative Dispute", description: [
				"The dynamic of administrative power in Indonesia for the past decade has been concerning. Despite having more laws than ever, more and more procedures in the law are being ignored by the government, thus causing disputes, especially with business actors..",
				"Engaging with a versatile, creative, and experienced team is the sole means to navigate the jungle of administrative disputes in Indonesia.",
				"Whatever the challenge or opportunity arises, we are with the client every step of the way.",
			] },
			{ title: "Constitutional Dispute", description: [
				"Contradictory laws and regulations are a common situation in Indonesia. Consequently, questions about which law prevails and how to read the law are commonly asked by our clients due to the uncertain nature of Indonesia's laws and regulations.",
				"Having a team with a deep understanding of the structure and culture of laws and regulations in Indonesia is highly desirable to have distinctive advantages.",
			] },
			{ title: "Industrial Relation Dispute", description: [
				"Recent years have welcomed a substantive change in laws and regulations related to industrial relations. If not handled properly, these changes could be a source of dispute.",
				"Our team, who are well-versed in these changes and have successfully handled numerous industrial relations disputes, will be a suitable representation of the client.",
			] },
			{ title: "Criminal Defense", description: [
				"Criminal investigations drain a lot of resources and adversely impact anyone involved. Each case requires a tailored approach to contain the impact, be it preventive or reactive.",
				"Our experienced attorneys provide robust defense strategies for clients facing or initiating criminal proceedings, prioritizing their rights and interests.",
			] },
			{ title: "Commercial Litigation", description: [
				"The landscape of commercial litigation in Indonesia is becoming increasingly complex. The district court is no longer the prime option to settle the dispute. Arbitration, commercial court, administrative court, and even criminal proceedings are now approaches that shall be taken into account.",
				"Having lawyers who can cover every possible aspect of the spectrum is the way to go, not only to mitigate but also to handle the dispute.",
			] },
			{ title: "Bankruptcy and Suspension of Payment Dispute", description: [
				"The legal proceedings surrounding bankruptcy and suspension of payment in Indonesia present significant challenges due to their complexity and the potential for protracted disputes. Additionally, the potential for creditor disputes, asset protection issues, and regulatory compliance can further complicate the process.",
				"A team of experts is invaluable in facilitating efficient resolutions, protecting clients’ interests, and helping mitigate risks of prolonged litigation, ultimately safeguarding businesses and preserving value in the industry.",
			] },
			{ title: "Arbitration", description: [
				"Arbitration in Indonesia is unique as it is heavily interconnected with the court. For one, the arbitration award is subject to scrutiny by the district court, and further, the procedures can be affected and even forced to be amended by the Supreme Court through the instrument of laws and regulations.",
				"Understanding this intricate relation is a requirement to provide an effective legal representation. And our team, having honed our senses in numerous cases, is the best companion to go through the arbitration proceedings. ",
			] },
			{ title: "Election", description: [
				"Legal challenges during general elections in Indonesia often arise from disputes over electoral processes, such as candidate eligibility, vote-count irregularities, campaign violations, or allegations of fraud. Each issue shall be handled within each stage with specialized approach.",
				"Having a team of experts in election process is crucial for political parties or candidates involved in such disputes, as it ensures a robust legal strategy, accurate representation in court, and adherence to procedural requirements.",
				"On the other hand, our reputation will enhance credibility, minimize reputational risks, and allow parties to focus on the political agenda while we handle the intricate litigation process.",
			] },
			{ title: "Environment", description: [
				"Environmental issues are extremely complex as it brings together inadequate regulations, local and international attention, overlapping legal remedies, and of course the SLAPP.",
				"An experienced team like ours with a deep understanding of Indonesia’s environmental laws, regulatory frameworks, and judicial precedents is required to navigate these issues effectively. We can provide expert guidance, ensure compliance, and develop robust defense strategies to address environmental disputes and regulatory actions.",
			] },
			{ title: "Corruption Crime", description: [
				"Corruption provisions in Indonesia are all-encompassing, even reaching to policymaking and advice. These broad legal definitions often blur the line between criminal intent and good-faith governance and business. Coupled with intense media scrutiny, complex investigative procedures, and potential biases, any parties involved often find themselves at a disadvantage.",
				"Our team can dissect the nuances of anti-corruption laws, highlight the absence of criminal intent, and demonstrate the legitimacy of policy or business decisions. Our skilled members can also manage reputational risks by effectively addressing public narratives and ensuring fair treatment under the law.",
			] },
		],
	},
	{
		title: "Corporate Commercial",
		paragraph: "We offer expert legal services in corporate and commercial law, ensuring compliance and strategic advantage.",
		items: [
			{ title: "Corporate Commercial", description: [
				"In an ever-evolving business environment like Indonesia, sound legal advice is essential to safeguard and advance corporate interests. Our firm specializes in providing insightful and practical counsel on a broad spectrum of corporate matters, ensuring our clients stay compliant and prepared for challenges.",
				"Our team of lawyers guides clients through regulatory frameworks, internal governance, and day-to-day corporate law matters with clarity and precision.",
			] },
			{ title: "Energy", description: [
				"Indonesia’s energy transition, aimed at shifting from fossil fuels to renewable energy sources, presents significant legal challenges due to the country’s complex regulatory framework, land use issues, and the need for substantial foreign and domestic investment.",
				"By offering innovative legal solutions, our firm can support the energy industry in achieving a smoother and more efficient transition, fostering growth while aligning with Indonesia’s sustainability goals.",
			] },
			{ title: "Education", description: [
				"The rapid integration of digital learning platforms has introduced complexities in the education sector, such as data protection, cybersecurity, and compliance with licensing regulations for online education. Moreover, balancing the interests of public and private stakeholders often leads to legal disputes, particularly regarding management, funding, and accreditation.",
				"Our team is more than qualified to offer tailored legal solutions aiming to achieve operational excellence and contribute to improving the quality and accessibility of education in Indonesia.",
			] },
		],
	},
	{
		title: "Intellectual Property",
		paragraph: [
			"The firm's Intellectual Property practice has been consistently nominated as one of the leading intellectual property practice group in Indonesia. In the Asia Pacific Legal 500 (2006/2007 edition), Lubis Santosa & Maramis has been ranked in the second tier for its intellectual property practice.",
			"Our Intellectual Property practice group advises on a wide range of intellectual property matters for diverse industries, which include pharmaceuticals, chemical, engineering, computers, entertainment and others. We provide services for all types of IP works covering contentious and non-contentious IP matters as well as IP related transactions.",
		],
		items: [
			{ title: "Mass Media", description: [
				"The mass media industry in Indonesia faces several legal challenges, including freedom of the press, defamation, copyright infringement, and compliance with digital and broadcasting regulations. With the rise of social media and online platforms, new legal concerns have emerged, such as misinformation, cyberbullying, and content moderation disputes.",
				"Engaging with our firm, which has a rich background in mass media, can provide significant benefits in navigating complex legal landscapes while upholding ethical journalism and avoiding reputational risks.",
			] },
		],
	},
]

const activeCategory = ref(0)
const activeSubItem = ref(0)
</script>

<template>
	<div class="md:hidden w-full mx-auto mb-4 py-4 z-0">
		<!-- Mobile -->
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
		<section>
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
					<p
						v-for="(line, index) in categories[activeCategory]?.paragraph"
						:key="index"
						class="text-[#949494] font-[Ubuntu] text-justify mb-4"
					>
						{{ line }}
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
					<p
						v-for="(line, index) in activeSubItem.description"
						:key="index"
						class="text-[#949494] font-[Ubuntu] text-justify mb-4"
					>
						{{ line }}
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
					<p
						v-for="(line, index) in activeSubItem.description"
						:key="index"
						class="text-[#949494] font-[Ubuntu] text-justify mb-4"
					>
						{{ line }}
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
					<p
						v-for="(line, index) in activeSubItem.description"
						:key="index"
						class="text-[#949494] font-[Ubuntu] text-justify mb-4"
					>
						{{ line }}
					</p>
				</div>
			</div>
		</section>
		<!-- Desktop -->
		<div class="w-full mx-auto mb-4 py-4 z-0">
			<!-- Main Category Selector -->
			<div class="flex flex-row px-4 py-6 gap-4 z-0 w-full">
				<!-- Left Column: Categories -->
				<div class="flex-1/3 flex flex-col gap-2 text-[#DAB38D] font-[Marcellus]">
					<div
						v-for="(category, index) in categories"
						:key="index"
						class="text-xl cursor-pointer hover:text-[#4B3D2A] transition-colors"
						@click="activeCategory = index; activeSubItem = null"
					>
						{{ category.title }}
					</div>
				</div>

				<!-- Right Column: Sub-items and Details -->
				<div class="flex-2/3 flex flex-col">
					<!-- Sub-items -->
					<div
						v-if="activeCategory !== null"
						class="mt-4 px-4 flex flex-col gap-2"
					>
						<div
							v-for="(item, idx) in categories[activeCategory].items"
							:key="idx"
							class="text-lg text-[#DAB38D] font-[Ubuntu] hover:text-[#4B3D2A] transition-colors cursor-pointer"
							@click="activeSubItem = item; scrollToDetails()"
						>
							{{ item.title }}
						</div>
					</div>

					<!-- Sub-item Detail Default -->
					<section
						ref="detailsSection"
						class="mt-6"
					>
						<div
							v-if="activeCategory === 0 && !activeSubItem"
							class="w-full transition-all duration-300 bg-[url('~/assets/images/dotted-pattern.jpg')] bg-cover bg-center p-6"
						>
							<h2 class="text-3xl text-white font-[Marcellus] font-light mb-4">
								Corporate and Investment
							</h2>
							<div class="text-[#DAB38D] font-[Ubuntu]">
								<p class="mb-2">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum duis consectetur morbi.
								</p>
								<p class="mb-2">
									Partitor ultricies purus dictum scelerisque pharetra. Elit est sed quam mauris id sit lacuis. Aliquam duis ipsum a facilisi vestibulum hac.
								</p>
								<p class="mb-2">
									Ullamcorper ultricies tristique id auctor. Hendrerit sit tortor mi nunc risus ut ornare mattis sed. Nunc vitae elit id faucibus.
								</p>
							</div>
						</div>
						<!-- Sub-item Details -->
						<div
							v-if="activeSubItem && activeCategory === 0"
							class="w-full transition-all duration-300 bg-[url('~/assets/images/dotted-pattern.jpg')] bg-cover bg-center p-6"
						>
							<h2 class="text-3xl text-white font-[Marcellus] font-light mb-4">
								{{ activeSubItem.title }}
							</h2>
							<div class="text-[#DAB38D] font-[Ubuntu]">
								<p
									v-for="(line, index) in activeSubItem.description"
									:key="index"
									class="mb-2"
								>
									{{ line }}
								</p>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	</div>
</template>
