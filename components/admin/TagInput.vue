<script setup lang="ts">
type Props = {
	placeholder?: string
	initialValues?: string[]
}

type Emits = {
	(ev: "add-tag", tag: string): void
	(ev: "onChange", value: string[]): void
}

defineEmits<Emits>()

withDefaults(defineProps<Props>(), {
	placeholder: "Tambahkan tag...",
	initialValues: () => [],
})

function convertValue(value: string): string {
	return value.trim()
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, "") // Remove special characters
		.replace(/\s+/g, "-") // Replace spaces with hyphens
}
</script>

<template>
	<UiTagsInput
		class="w-full"
		:model-value="initialValues"
		:convert-value="convertValue"
		@add-tag="$emit('add-tag', $event as string)"
		@update:model-value="$emit('onChange', $event as string[])"
	>
		<UiTagsInputItem
			v-for="item in initialValues"
			:key="item"
			:value="item"
		>
			<UiTagsInputItemText />
			<UiTagsInputItemDelete />
		</UiTagsInputItem>

		<UiTagsInputInput :placeholder="placeholder" />
	</UiTagsInput>
</template>
