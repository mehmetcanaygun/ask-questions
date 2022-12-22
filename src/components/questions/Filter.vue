<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  handleFilter: {
    type: Function,
    required: true,
  },
});

const filter = ref<string>("");

watch(filter, (ref, prevRef) => {
  props.handleFilter(ref);
});
</script>

<template>
  <div class="rounded mb-4 text-light flex flex-col">
    <label class="text-sm text-light mb-1">Filter by title or tag</label>
    <input
      type="text"
      v-model="filter"
      class="p-2 rounded bg-white text-dark"
    />
  </div>
</template>

<style scoped></style>
