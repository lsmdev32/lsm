import type { RequestOptions, SearchOptions } from "@nuxtjs/algolia"
import { useDebounce } from "@vueuse/core"
import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants"
import type { CategoryAppModel } from "~/lib/firestore-model"

type Params = Ref<{
	search: string
	page: number
}>

export function useCategoryList(params: Params) {
	const debouncedParams = useDebounce(params, DEBOUNCE_DEFAULT_TIME)
	const isLoading = ref(false)

	const { search, result } = useAlgoliaSearch<CategoryAppModel>("categories")

	watch(debouncedParams, async (v) => {
		const requestOptions: SearchOptions & RequestOptions = {
			page: v.page,
		}

		isLoading.value = true
		await search({
			query: v.search,
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
