<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
</script>

<template>
  <div class="w-full min-h-screen overflow-x-hidden font-Nunito">
    <Navbar />
    <RouterView />
  </div>
</template>

<style scoped></style>
