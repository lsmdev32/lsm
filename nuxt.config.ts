// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: [
		"@nuxt/eslint",
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
		plugins: [
			"utc", "timezone",
		],
	},
	// debug: process.env.NODE_ENV === "development",
	eslint: {
		config: {
			stylistic: {
				indent: "tab",
			},
		},
	},
	fonts: {
		provider: "google",
	},
	image: {
		dir: "assets/images",
	},
	vuefire: {
		config: JSON.parse(process.env.FIREBASE_CONFIG ?? "{}"),
		auth: {
			enabled: true,
			sessionCookie: false,
		},
	},
})
