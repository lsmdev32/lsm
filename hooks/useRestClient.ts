/* eslint-disable @stylistic/array-bracket-newline */
import type { paths } from "~/types/openapi"
import client from "~/lib/rest-client"

export function useRestClient<
	const P extends keyof paths,
	const PParam extends paths[P]["get"]["parameters"],
	const Param extends PParam[keyof PParam] extends undefined ? undefined : PParam>(path: P, params: Param, key?: string) {
	const serializedParams = Object
		.entries(params ?? [])
		.map(([k, v]) => `${k}=${v}`)
		.join("&")

	const cacheKey = [path, serializedParams]
		.join("_")

	// @ts-expect-error - The type of params is not compatible with the expected type in the client
	if (!key) return useAsyncData(cacheKey, () => client[path].GET({ params }))

	// @ts-expect-error - The type of params is not compatible with the expected type in the client
	return useAsyncData(async () => client[path].GET({ params }))
}
