<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

type Props = {
	clearable?: boolean
	format?: string
}

withDefaults(defineProps<Props>(), {
	clearable: true,
	format: "dd MMMM yyyy HH:mm",
})

const model = defineModel<Date>()
</script>

<template>
	<client-only>
		<vue-date-picker
			v-model="model"
			vertical
			:clearable="clearable"
			:format="format"
		/>
	</client-only>
</template>
