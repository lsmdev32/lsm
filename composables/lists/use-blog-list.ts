import type { RequestOptions, SearchOptions } from "@nuxtjs/algolia"
import { useDebounce } from "@vueuse/core"
import { useRouteQuery } from "@vueuse/router"
import { DEBOUNCE_DEFAULT_TIME } from "~/lib/constants"
import type { BlogAppModel } from "~/lib/firestore-model"

export function useBlogList() {
	const keyword = useRouteQuery<string>("keyword", "")
	const category = useRouteQuery<string>("category", "")
	const author = useRouteQuery<string>("author", "")
	const page = useRouteQuery<number>("page", 0)

	const debouncedSearch = useDebounce(keyword, DEBOUNCE_DEFAULT_TIME)
	const debouncedPage = useDebounce(page, DEBOUNCE_DEFAULT_TIME)
	const debouncedCategory = useDebounce(category, DEBOUNCE_DEFAULT_TIME)
	const debouncedAuthor = useDebounce(author, DEBOUNCE_DEFAULT_TIME)
	const isLoading = ref(false)

	const { search, result } = useAlgoliaSearch<BlogAppModel>("contents")
	const results = computed(() => result?.value?.hits ?? [])
	const totalPages = computed(() => result?.value?.nbPages ?? 0)
	const totalHits = computed(() => result?.value?.nbHits ?? 0)
	const currentPage = computed(() => result?.value?.page ?? 0)

	watch([
		debouncedSearch,
		debouncedPage,
		debouncedCategory,
		debouncedAuthor,
	], async ([
		s, p, c, a,
	]) => {
		const filter = [`type:blog`]
		if (c) {
			filter.push(`category_id:${c}`)
		}

		if (a) {
			filter.push(`author_id:${a}`)
		}

		const requestOptions: SearchOptions & RequestOptions = {
			page: p,
			hitsPerPage: 10,
			facetFilters: filter,
			attributesToRetrieve: [
				"objectID",
				"title",
				"status",
				"cover_image_url",
				"tags",
				"created_at",
				"published_at",
				"slug",
			],

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
		keyword,
		category,
		author,
		debouncedCategory,
		debouncedAuthor,
		isLoading,
		results,
		totalHits,
		totalPages,
		currentPage,
		setPage,
	}
}
