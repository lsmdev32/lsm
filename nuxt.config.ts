// oxlint-disable typescript/no-unsafe-assignment

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
  devtools: { enabled: true },
  app: {
    head: {
      title: "Lubis Santosa & Partners",
    },
  },
  css: ["~/assets/css/main.css"],
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
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  compatibilityDate: "2024-11-01",
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
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
