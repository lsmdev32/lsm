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
	],
	devtools: { enabled: true },
	css: ["~/assets/css/main.css"],
	compatibilityDate: "2024-11-01",

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	debug: true,
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
		config: {
			apiKey: "AIzaSyCANRmq3jZOo_k5xGoHFLTdismkJaxVcgw",
			authDomain: "lsm-develop-a1e58.firebaseapp.com",
			projectId: "lsm-develop-a1e58",
			storageBucket: "lsm-develop-a1e58.firebasestorage.app",
			messagingSenderId: "849297643846",
			appId: "1:849297643846:web:698886dc5221bb290f2d47",
			measurementId: "G-RHFQLXNY6C",
		},
		auth: {
			enabled: true,
			sessionCookie: true,
		},
	},
})
