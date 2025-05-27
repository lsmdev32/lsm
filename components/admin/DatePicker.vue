<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

const model = defineModel<Date>()
</script>

<template>
	<client-only>
		<vue-date-picker
			v-model="model"
			vertical
		/>
	</client-only>
</template>
