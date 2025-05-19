import type { RequestOptions, SearchOptions } from "@nuxtjs/algolia"
import { useDebounce } from "@vueuse/core"
import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants"
import type { CategoryAppModel } from "~/lib/firestore-model"

export function useCategoryList(keyword: Ref<string>, page: Ref<number>) {
	const debouncedSearch = useDebounce(keyword, DEBOUNCE_DEFAULT_TIME)
	const debouncedPage = useDebounce(page, DEBOUNCE_DEFAULT_TIME)
	const isLoading = ref(false)

	const { search, result } = useAlgoliaSearch<CategoryAppModel>("categories")

	watch([
		debouncedSearch, debouncedPage,
	], async ([
		s, p,
	]) => {
		const requestOptions: SearchOptions & RequestOptions = {
			page: p,
		}

		isLoading.value = true
		await search({
			query: s,
			requestOptions,
		})
			.finally(() => {
				isLoading.value = false
			})
	}, {
		immediate: true,
	})

	return {
		isLoading,
		result,
	}
}
