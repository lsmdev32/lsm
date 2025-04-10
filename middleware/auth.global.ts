import { getCurrentUser } from "vuefire"

export default defineNuxtRouteMiddleware(async (to) => {
	const user = await getCurrentUser()
	const isAuthPage = to.meta.layout === "admin"

	if (!user && isAuthPage) return navigateTo("/login")
})
