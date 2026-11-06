import { getCurrentUser } from "vuefire";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.server) {
    return;
  }

  const user = await getCurrentUser();
  const isToLogin = to.path === "/login";
  const isToDashboard = to.path.includes("/dashboard");

  /**
   * if user is not authenticated and the route is an auth page, redirect to login
   */
  if (isToDashboard && !user) {
    return await navigateTo("/login");
  }

  /**
   * if user is authenticated and the route is login page, redirect to dashboard
   */
  if (isToLogin && user) {
    return await navigateTo("/dashboard");
  }
});
