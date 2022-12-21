<script setup lang="ts">
import Navbar from "./components/layout/Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="bg-darker w-full min-h-screen py-4 overflow-x-hidden font-Nunito">
    <Navbar />
    <RouterView :key="route.path" />
  </div>
</template>

<style scoped></style>
