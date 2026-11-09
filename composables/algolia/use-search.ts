import type { RequestOptions, SearchOptions } from "@nuxtjs/algolia";
import { useDebounce } from "@vueuse/core";

import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants";

export function useSearch<
  const T extends Record<string, unknown>,
  const TA extends readonly Extract<keyof T, string>[] = readonly Extract<
    keyof T,
    string
  >[],
>(index: string, query: Ref<string>, onlyAttributes?: [...TA]) {
  const isLoading = ref(false);
  const refreshToken = ref(0);
  const debouncedValue = useDebounce(query, DEBOUNCE_DEFAULT_TIME);

  const { result, search } = useAlgoliaSearch<Pick<T, TA[number]>>(index);

  const algRef = useAlgoliaRef();

  type Options = RequestOptions & SearchOptions;

  const requestOptions: Options = {
    attributesToRetrieve: onlyAttributes,
  };

  watch(
    [debouncedValue, refreshToken],
    async ([value, newRefreshToken], [, oldRefreshToken]) => {
      if (newRefreshToken !== oldRefreshToken) {
        await algRef.clearCache();
      }

      isLoading.value = true;

      await search({ query: value, requestOptions }).finally(() => {
        isLoading.value = false;
      });
    },
    {
      immediate: true,
    }
  );

  /** Re-runs the current query without reloading the page. */
  function refresh() {
    refreshToken.value += 1;
  }

  return {
    result,
    isLoading,
    refresh,
  };
}
