<template>
	<section class="my-2">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<div
				v-for="(post, index) in posts"
				:key="index"
				class="flex flex-col"
			>
				<img
					:src="post.image"
					alt="Thumbnail"
					class="w-full h-[270px] object-cover mb-4"
				>
				<span class="text-sm text-[#DAB38D] font-[Ubuntu]">Lorem ipsum dolor</span>
				<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
					Lorem ipsum dolor sit amet, consectetur
				</h3>
				<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
					<div class="flex items-center space-x-1 ">
						<img
							src="../../assets/images/Dummy_DamianAgataYuvens.jpg"
							alt="Author"
							class="w-8 h-8 rounded-full mr-1"
						>
						<span class="uppercase tracking-wider text-[#DAB38D]">John Doe</span>
					</div>
					<div class="flex items-center space-x-1">
						<Icon
							name="mdi:calendar"
							size="20"
							class="text-[#DAB38D]"
						/>
						<span class="uppercase text-[#DAB38D]">Jan 18, 2019</span>
					</div>
				</div>
				<div class="md:hidden mt-2">
					<p>
						{{ truncateWords(post.description, 25) }}
					</p>
				</div>

				<button class="mt-4 px-4 py-2 bg-[#4B3D2A] text-[#DAB38D] hover:bg-[#665339] md:bg-[#91AEAC] md:text-white  md:hover:bg-[#9aaea1] rounded w-fit text-sm">
					Read More
				</button>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import PublicationThumbnail from "../../assets/PublicationThumbnail.png"

const posts = [
	{
		image: PublicationThumbnail,
		description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis bibendum dui consectetur morbi ultricies sed ipsum. Porttitor ultricies turpis dictum scelerisque phasellus. Etiam est sed quam mauris id sit lacus, ut. Aliquam duis id ipsum a facilisi in vestibulum hac ullamcorper. Sed at urna velit. Suspendisse fermentum nisi nulla, nec porta felis porta non. Curabitur volutpat est nec laoreet efficitur. Integer luctus gravida massa in pulvinar. Sed hendrerit, justo nec egestas porta, lorem orci rhoncus massa, nec bibendum risus turpis in nunc. Mauris vitae urna nec ligula.",
	},
	{
		image: PublicationThumbnail,
		description: "Another example description here with more than 150 words. ...",
	},
	{
		image: PublicationThumbnail,
		description: "Short description only.",
	},
]

function truncateWords(text: string, maxWords: number): string {
	const words = text.split(" ")
	return words.length > maxWords
		? words.slice(0, maxWords)
			.join(" ") + "..."
		: text
}
</script>
