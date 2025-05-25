<script setup lang="ts">
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"

type Props = {
	pageTitle: string
	transformCrumbs?: Record<number, (segment: string) => string | undefined>
}
const props = withDefaults(defineProps<Props>(), {
	transformCrumbs() {
		return {}
	},
})

const router = useRouter()

const pathSegments = router.currentRoute.value.path
	.split("/")
	.filter(segment => segment)

const breadcrumbs = computed(() => pathSegments.map((segment, idx) => {
	const newSegment = props.transformCrumbs[idx]?.(segment) ?? segment
	return ({
		text: newSegment
			.replaceAll(/-/g, " ")
			.toLowerCase(),

		path: "/" + pathSegments
			.slice(0, idx + 1)
			.join("/"),
	})
}))
</script>

<template>
	<div class="w-full flex flex-col justify">
		<Breadcrumb>
			<BreadcrumbList>
				<template
					v-for="(item, index) in breadcrumbs"
					:key="index"
				>
					<BreadcrumbItem>
						<BreadcrumbLink
							class="capitalize truncate max-w-[200px]"
							:href="item.path"
						>
							{{ item.text }}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator v-show="index !== breadcrumbs.length - 1" />
				</template>
			</BreadcrumbList>
		</Breadcrumb>
		<p class="capitalize text-2xl font-bold text-gray-500 dark:text-gray-400 mb-2">
			{{ pageTitle }}
		</p>

		<ClientOnly>
			<div class="w-full h-full">
				<slot />
			</div>
		</ClientOnly>
	</div>
</template>
