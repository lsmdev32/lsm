// oxlint-disable typescript/no-unsafe-assignment

import tailwindcss from "@tailwindcss/vite";

const vueFireConfig = JSON.parse(process.env.FIREBASE_CONFIG ?? "{}");

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/scripts",
    "shadcn-nuxt",
    "nuxt-vuefire",
    "dayjs-nuxt",
    "@nuxtjs/algolia",
  ],
  hooks: {
    /**
     * nuxt-vuefire registers its admin-auth plugin even when no service
     * account is configured, which makes every SSR request fail with
     * "The default Firebase app does not exist". Auth here is client-only
     * (see middleware/auth.ts), so drop the unusable server plugin.
     */
    "app:resolve": (app) => {
      const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS ?? "";

      if (credentials !== "") {
        return;
      }

      app.plugins = app.plugins.filter(
        (plugin) => !plugin.src.includes("auth/plugin-authenticate-user.server")
      );
    },
  },
  devtools: { enabled: true },
  app: {
    head: {
      title: "Lubis Santosa & Partners",
    },
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "Ui",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },
  runtimeConfig: {
    public: {
      mailchimpU: process.env.MAILCHIMP_U,
      mailchimpId: process.env.MAILCHIMP_ID,
      mailchimpFid: process.env.MAILCHIMP_FID,
      mailchimpDc: process.env.MAILCHIMP_DC,
    },
    smtpUser: process.env.SMTP_USER,
    smtpPass: process.env.SMTP_PASS,
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    emailRecipient: process.env.EMAIL_RECIPIENT,
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  compatibilityDate: "2024-11-01",
  algolia: {
    applicationId: process.env.NUXT_PUBLIC_ALGOLIA_APP_ID,
    apiKey: process.env.NUXT_PUBLIC_ALGOLIA_API_KEY,
  },
  dayjs: {
    plugins: ["utc", "timezone"],
  },
  // debug: process.env.NODE_ENV === "development",
  fonts: {
    provider: "google",
  },
  image: {
    dir: "assets/images",
  },
  vuefire: {
    // SAFETY: This is a workaround for the issue with the Firebase SDK and Nuxt 3. See
    config: vueFireConfig,
    auth: {
      enabled: true,
      sessionCookie: false,
    },
  },
});
