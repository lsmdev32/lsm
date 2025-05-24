import type { RequestOptions, SearchOptions } from "@nuxtjs/algolia"
import { useDebounce } from "@vueuse/core"
import { useRouteQuery } from "@vueuse/router"
import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants"
import type { CategoryAppModel } from "~/lib/firestore-model"

export function useCategoryList() {
	const searchString = useRouteQuery<string>("search", "")
	const page = useRouteQuery<number>("page", 0)
	const debouncedSearch = useDebounce(searchString, DEBOUNCE_DEFAULT_TIME)
	const debouncedPage = useDebounce(page, DEBOUNCE_DEFAULT_TIME)
	const isLoading = ref(false)

	const { search, result } = useAlgoliaSearch<CategoryAppModel>("categories")
	const results = computed(() => result?.value?.hits ?? [])
	const totalPages = computed(() => result?.value?.nbPages ?? 0)
	const totalHits = computed(() => result?.value?.nbHits ?? 0)
	const currentPage = computed(() => result?.value?.page ?? 0)

	watch([
		debouncedSearch, debouncedPage,
	], async ([
		s, p,
	]) => {
		const requestOptions: SearchOptions & RequestOptions = {
			page: p,
			hitsPerPage: 10,
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

	function setPage(value: number) {
		page.value = value
	}

	return {
		searchString,
		isLoading,
		results,
		totalHits,
		totalPages,
		currentPage,
		setPage,
	}
}
