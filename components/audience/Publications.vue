<template>
	<section class="my-2">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<div
				v-for="(publication, index) in publications"
				:key="index"
				class="flex flex-col"
			>
				<nuxt-img
					v-if="publication.image_url"
					:src="publication.image_url as string"
					alt="Thumbnail"
					class="w-full h-[270px] object-cover mb-4"
				/>
				<nuxt-img
					v-else
					:src="LogoSVG"
					alt="Thumbnail"
					class="w-full h-[270px] object-cover mb-4"
				/>
				<span class="text-sm text-[#DAB38D] font-[Ubuntu]">{{ publication.category }}</span>
				<h3 class="text-xl font-[Marcellus] text-[#4B3D2A] leading-snug">
					{{ publication.title }}
				</h3>
				<div class="flex items-center text-xs mt-4 space-x-4 text-[#2e1e10] font-[Ubuntu]">
					<div class="flex items-center space-x-1 ">
						<nuxt-img
							v-if="publication?.author?.photo_url || defaultAuthorImage"
							:src="publication?.author?.photo_url || defaultAuthorImage"
							alt="Author"
							class="w-8 h-8 rounded-full mr-1 object-cover object-top"
						/>
						<span class="uppercase tracking-wider text-[#DAB38D]">{{ publication?.author?.name || defaultAuthorName || 'LSM Content Team' }}</span>
					</div>
					<div class="flex items-center space-x-1">
						<Icon
							name="mdi:calendar"
							size="20"
							class="text-[#DAB38D]"
						/>
						<span class="uppercase text-[#DAB38D]">{{ publication.published_at }}</span>
					</div>
				</div>
				<div class="md:hidden mt-2" />

				<nuxt-link
					:href="`/${publication.type === 'blog' ? 'blogs' : 'publications'}/${publication.slug}`"
					class="mt-4 px-4 py-2 bg-[#4B3D2A] text-[#DAB38D] hover:bg-[#665339] md:bg-[#91AEAC] md:text-white  md:hover:bg-[#9aaea1] rounded w-fit text-sm"
				>
					Read More
				</nuxt-link>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import LogoSVG from "~/assets/images/logo.svg"

type Props = {
	publications?: Record<string, unknown>[]
	defaultAuthorName?: string
	defaultAuthorImage?: string
}

withDefaults(defineProps<Props>(), {
	publications: () => [],
})
</script>
