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
  description?: string;
  transformCrumbs?: Record<number, (segment: string) => string | undefined>;
}

const {
  pageTitle,
  description = "",
  transformCrumbs = {},
} = defineProps<Props>();

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split("/").filter(Boolean);

  return pathSegments.map((segment, idx) => {
    const newSegment = transformCrumbs[idx]?.(segment) ?? segment;

    return {
      text: newSegment.replaceAll("-", " "),
      path: `/${pathSegments.slice(0, idx + 1).join("/")}`,
    };
  });
});
</script>

<template>
  <div class="flex w-full flex-col gap-6">
    <header
      class="flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-end sm:justify-between"
    >
      <div class="flex min-w-0 flex-col gap-1.5">
        <Breadcrumb>
          <BreadcrumbList class="text-xs text-muted-foreground">
            <template v-for="(item, index) in breadcrumbs" :key="item.path">
              <BreadcrumbItem>
                <BreadcrumbLink
                  class="max-w-[180px] truncate capitalize"
                  :href="item.path"
                >
                  {{ item.text }}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator v-show="index !== breadcrumbs.length - 1" />
            </template>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 class="font-[Marcellus] text-2xl leading-tight text-foreground">
          {{ pageTitle }}
        </h1>

        <p v-if="description" class="text-sm text-muted-foreground">
          {{ description }}
        </p>
      </div>

      <div v-if="$slots.actions" class="flex flex-wrap items-center gap-2">
        <slot name="actions" />
      </div>
    </header>

    <ClientOnly>
      <div class="flex w-full flex-col">
        <slot />
      </div>
    </ClientOnly>
  </div>
</template>
