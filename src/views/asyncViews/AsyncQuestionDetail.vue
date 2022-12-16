<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();

const questionId = route.params.id;
</script>

<template>
  <h1 class="text-2xl">Async Question Detail</h1>
  <p>Question ID: {{ questionId }}</p>
</template>

<style scoped></style>
