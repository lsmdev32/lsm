export default defineNuxtPlugin({
	name: "loading-plugin",
	hooks: {
		"page:start": () => {
			const indicator = useLoadingIndicator()
			indicator.start()
		},
		"page:finish": () => {
			const indicator = useLoadingIndicator()
			indicator.finish()
		},
	},
})
