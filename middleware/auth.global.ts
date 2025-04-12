import { getCurrentUser } from "vuefire"

export default defineNuxtRouteMiddleware(async (to) => {
	const user = await getCurrentUser()
	const isAuthPage = to.meta.layout === "admin"

	/**
	 * if user is not authenticated and the route is an auth page, redirect to login
	 */
	if (!user && isAuthPage) return navigateTo("/login")

	/**
	 * if user is authenticated and the route is login page, redirect to dashboard
	 */
	if (user && to.path === "/login") return navigateTo("/dashboard")
})
