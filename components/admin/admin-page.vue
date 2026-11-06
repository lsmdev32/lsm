<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

interface Props {
  pageTitle: string;
  transformCrumbs?: Record<number, (segment: string) => string | undefined>;
}

const { pageTitle, transformCrumbs = {} } = defineProps<Props>();

const router = useRouter();

const pathSegments = router.currentRoute.value.path.split("/").filter(Boolean);

const breadcrumbs = computed(() =>
  pathSegments.map((segment, idx) => {
    const newSegment = transformCrumbs[idx]?.(segment) ?? segment;

    return {
      text: newSegment.replaceAll("-", " ").toLowerCase(),

      path: `/${pathSegments.slice(0, idx + 1).join("/")}`,
    };
  })
);
</script>

<template>
  <div class="justify flex w-full flex-col">
    <Breadcrumb>
      <BreadcrumbList>
        <template v-for="(item, index) in breadcrumbs" :key="index">
          <BreadcrumbItem>
            <BreadcrumbLink
              class="max-w-[200px] truncate capitalize"
              :href="item.path"
            >
              {{ item.text }}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator v-show="index !== breadcrumbs.length - 1" />
        </template>
      </BreadcrumbList>
    </Breadcrumb>
    <p
      class="mb-2 text-2xl font-bold text-gray-500 capitalize dark:text-gray-400"
    >
      {{ pageTitle }}
    </p>

    <ClientOnly>
      <div class="h-full w-full">
        <slot />
      </div>
    </ClientOnly>
  </div>
</template>
