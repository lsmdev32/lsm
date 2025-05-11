<script lang="ts" setup>
import { QuillEditor } from "@vueup/vue-quill"
import "@vueup/vue-quill/dist/vue-quill.snow.css"

type Props = {
	class?: string
	editable?: boolean
	initialValue?: string
}

type Emits = {
	(key: "handleChange", value: string): void
}

const props = withDefaults(defineProps<Props>(), {
	editable: true,
	initialValue: "",
})

defineEmits<Emits>()
</script>

<template>
	<ClientOnly>
		<quill-editor
			:content="initialValue"
			:class="['min-h-[50px] mb-40', props.class, props.editable ? '' : 'opacity-40']"
			:enable="props.editable"
			toolbar="minimal"
			:read-only="!props.editable"
			content-type="html"

			@update:content="$emit('handleChange', $event)"
		/>
	</ClientOnly>
</template>
