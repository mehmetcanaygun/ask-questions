<script setup lang="ts">
import AsyncQuestionDetail from "./asyncViews/AsyncQuestionDetail.vue";
</script>

<template>
  <Suspense>
    <AsyncQuestionDetail #default />
    <template #fallback>
      <h1 class="text-2xl">LOADING...</h1>
    </template>
  </Suspense>
</template>

<style scoped></style>
