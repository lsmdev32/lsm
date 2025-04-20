<script>
export default {
	props: ["textButton"],
}
</script>

<template>
	<div class="custom-button font-ubuntu color-soft-orange">
		<span>{{ textButton }}</span>
	</div>
</template>

<style scoped>
.custom-button {
  width: 40%;
  background-color: #4b3d2a;
  padding: 20px 12px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  justify-content: center;
  text-align: center;
}

@media (max-width: 768px) {
  .custom-button {
    padding: 15px 12px;
    width: 50%;
  }
}
</style>
