<script setup lang="ts">
import AsyncQuestions from "./asyncViews/AsyncQuestions.vue";
</script>

<template>
  <Suspense>
    <AsyncQuestions #default />
    <template #fallback>
      <h1 class="text-2xl">LOADING...</h1>
    </template>
  </Suspense>
</template>

<style scoped></style>
