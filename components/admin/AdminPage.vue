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
}
defineProps<Props>()

const router = useRouter()

const pathSegments = router.currentRoute.value.path
	.split("/")
	.filter(segment => segment)

const breadcrumbs = pathSegments.map((segment, index) => ({
	text: segment
		.replaceAll(/-/g, " ")
		.toLowerCase(),
	path: "/" + pathSegments
		.slice(0, index + 1)
		.join("/"),
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
							class="capitalize"
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

		<div class="w-full h-full">
			<slot />
		</div>
	</div>
</template>
