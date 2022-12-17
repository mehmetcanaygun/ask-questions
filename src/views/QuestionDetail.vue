<script setup lang="ts">
import AsyncQuestionDetail from "./asyncViews/AsyncQuestionDetail.vue";
import Spinner from "../components/layout/Spinner.vue";
</script>

<template>
  <Suspense>
    <AsyncQuestionDetail #default />

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<style scoped></style>
