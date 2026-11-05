<script setup lang="ts">
interface Props {
  itemName?: `${string}${"s" | "es"}`;
}

const props = withDefaults(defineProps<Props>(), {
  itemName: "items",
});
</script>

<template>
  <div class="empty-list-placeholder">
    <svg class="icon" viewBox="0 0 64 64" width="48" height="48" fill="none">
      <rect x="8" y="20" width="48" height="32" rx="4" fill="#f3f4f6" />
      <rect x="16" y="28" width="32" height="4" rx="2" fill="#e5e7eb" />
      <rect x="16" y="36" width="24" height="4" rx="2" fill="#e5e7eb" />
    </svg>
    <p class="message">No {{ props.itemName }} found</p>
  </div>
</template>

<style scoped>
.empty-list-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  color: #6b7280;
  background: #fff;
  border-radius: 8px;
  border: 1px dashed #e5e7eb;
}

.icon {
  margin-bottom: 16px;
}

.message {
  font-size: 1.1rem;
  font-weight: 500;
}
</style>
