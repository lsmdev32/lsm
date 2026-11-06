<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";

interface Props {
  clearable?: boolean;
  format?: string;
}

const { clearable = true, format = "dd MMMM yyyy HH:mm" } =
  defineProps<Props>();

const model = defineModel<Date>();
</script>

<template>
  <client-only>
    <vue-date-picker
      v-model="model"
      vertical
      :clearable="clearable"
      :format="format"
      :disabled-dates="(date) => date > new Date()"
    />
  </client-only>
</template>
