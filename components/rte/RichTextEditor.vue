<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"

type Props = {
	class?: string
	disabled?: boolean
	initialValue?: string
}

type Emits = {
	(key: "handleChange", value: string): void
}

const props = withDefaults(defineProps<Props>(), {
	disabled: false,
	initialValue: "",
})

defineEmits<Emits>()
</script>

<template>
	<ClientOnly>
		<quill-editor
			:content="initialValue"
			:class="['min-h-[50px] mb-40', props.class, props.disabled ? 'opacity-40' : '']"
			:enable="!props.disabled"
			toolbar="minimal"
			:read-only="props.disabled"
			content-type="html"
			@update:content="$emit('handleChange', $event)"
		/>
	</ClientOnly>
</template>
