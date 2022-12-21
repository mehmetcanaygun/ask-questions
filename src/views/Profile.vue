<script setup lang="ts">
import AsyncProfile from "./asyncViews/AsyncProfile.vue";
import Spinner from "../components/layout/Spinner.vue";
</script>

<template>
  <Suspense>
    <AsyncProfile #default />

    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>

<style scoped></style>
