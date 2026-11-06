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
  const debouncedValue = useDebounce(query, DEBOUNCE_DEFAULT_TIME);

  const { result, search } = useAlgoliaSearch<Pick<T, TA[number]>>(index);

  type Options = RequestOptions & SearchOptions;

  const requestOptions: Options = {
    attributesToRetrieve: onlyAttributes,
  };

  watch(
    debouncedValue,
    async (v) => {
      isLoading.value = true;
      await search({ query: v, requestOptions }).finally(() => {
        isLoading.value = false;
      });
    },
    {
      immediate: true,
    }
  );

  async function refresh() {
    isLoading.value = true;
    window.location.reload();
  }

  return {
    result,
    isLoading,
    refresh,
  };
}
