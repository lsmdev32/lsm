// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
	// Your custom configs here
	{
		rules: {
			"vue/max-attributes-per-line": [
				"error", { singleline: 1 },
			],
			"vue/first-attribute-linebreak": "error",
			"@stylistic/array-element-newline": [
				"error", "consistent",
			],
			"@stylistic/array-bracket-newline": [
				"error", {
					minItems: 2, multiline: true,
				},
			],
			"@stylistic/newline-per-chained-call": [
				"error", { ignoreChainWithDepth: 1 },
			],
			"@stylistic/quotes": [
				"error", "double", {
					allowTemplateLiterals: true,
				},
			],
			"@stylistic/object-curly-spacing": [
				"error", "always",
			],
			"import/consistent-type-specifier-style": [
				"error", "prefer-top-level",
			],

		},
	},
)
	.prepend({
		ignores: ["components/ui/**/*.{vue,ts}"],
	})
