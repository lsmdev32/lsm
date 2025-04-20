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
	],
	devtools: { enabled: true },
	app: {
		head: {
			title: "Lubis Santosa & Partners",
		},
	},
	css: ["~/assets/css/main.css"],
	compatibilityDate: "2024-11-01",
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
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
