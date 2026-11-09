import type { RequestOptions, SearchOptions } from "@nuxtjs/algolia";
import { useDebounce } from "@vueuse/core";
import { useRouteQuery } from "@vueuse/router";

import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants";
import type { StaffAppModel } from "~/lib/firestore-model";

export function useStaffList() {
  const keyword = useRouteQuery<string>("keyword", "");
  const page = useRouteQuery<number>("page", 0);

  const debouncedSearch = useDebounce(keyword, DEBOUNCE_DEFAULT_TIME);
  const debouncedPage = useDebounce(page, DEBOUNCE_DEFAULT_TIME);
  const isLoading = ref(false);
  const refreshToken = ref(0);

  const { search, result } = useAlgoliaSearch<StaffAppModel>("staffs");
  const results = computed(() => result?.value?.hits ?? []);
  const totalPages = computed(() => result?.value?.nbPages ?? 0);
  const totalHits = computed(() => result?.value?.nbHits ?? 0);
  const currentPage = computed(() => result?.value?.page ?? 0);

  const algRef = useAlgoliaRef();

  watch(
    [debouncedSearch, debouncedPage, refreshToken],
    async ([s, p, newRefreshToken], [, __, oldRefreshToken]) => {
      if (newRefreshToken !== oldRefreshToken) {
        await algRef.clearCache();
      }

      const requestOptions: SearchOptions & RequestOptions = {
        page: p,
        hitsPerPage: 10,
        attributesToRetrieve: [
          "fullname",
          "email",
          "linkedin_url",
          "type",
          "profile_picture_url",
          "slug",
          "id",
        ],
      };

      isLoading.value = true;
      await search({
        query: s,
        requestOptions,
      }).finally(() => {
        isLoading.value = false;
      });
    },
    {
      immediate: true,
    }
  );

  function setPage(value: number) {
    page.value = value;
  }

  function refresh() {
    refreshToken.value += 1;
  }

  return {
    keyword,
    isLoading,
    results,
    totalHits,
    totalPages,
    currentPage,
    setPage,
    refresh,
  };
}
