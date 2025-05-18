import { SESSION_STORAGE_KEYS } from "~/lib/constants"

export default defineNuxtRouteMiddleware((to, from) => {
	if (import.meta.server) return
	if (to.path === from.path) return

	for (const key of Object.values(SESSION_STORAGE_KEYS)) {
		sessionStorage.removeItem(key)
	}
})
