<script setup lang="ts">
import AsyncNewQuestion from "./asyncViews/AsyncNewQuestion.vue";
import Spinner from "../components/layout/Spinner.vue";
</script>

<template>
  <Suspense>
    <AsyncNewQuestion #default />

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<style scoped></style>
