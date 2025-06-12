<script setup lang="ts">
type Props = {
	textButton: string
	type?: "button" | "submit" | "reset"
}

const props = defineProps<Props>()
const emit = defineEmits(["click"])
</script>

<template>
	<button
		:type="type || 'button'"
		class="custom-button font-ubuntu color-soft-orange"
		@click="$emit('click')"
	>
		<span>{{ textButton }}</span>
	</button>
</template>

<style scoped>
.custom-button {
  width: 40%;
  background-color: #4B3D2A;
  color: #DAB38D;
  padding: 20px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  text-align: center;
  cursor: pointer;
}

@media (max-width: 768px) {
  .custom-button {
    padding: 15px 12px;
  }
}
</style>
