<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div
    class="container text-light h-28 mb-8 flex justify-end items-center animate-slideDown"
  >
    <p
      class="text-2xl md:text-3xl font-RubikGemstones relative z-10 before:absolute before:top-1 before:-left-2 before:w-12 before:h-12 before:rounded-full before:bg-primary before:-z-10"
    >
      {{ props.title }}
    </p>
  </div>
</template>

<style scoped></style>
