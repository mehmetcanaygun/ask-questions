<script setup lang="ts">
import AsyncQuestions from "./asyncViews/AsyncQuestions.vue";
import Spinner from "../components/layout/Spinner.vue";
</script>

<template>
  <Suspense>
    <AsyncQuestions #default />

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<style scoped></style>
