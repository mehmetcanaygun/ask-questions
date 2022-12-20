<script setup lang="ts">
import AsyncEditQuestion from "./asyncViews/AsyncEditQuestion.vue";
import Spinner from "../components/layout/Spinner.vue";
</script>

<template>
  <Suspense>
    <AsyncEditQuestion #default />

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<style scoped></style>
