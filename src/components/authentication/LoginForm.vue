<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const password = ref("");

const onSubmit = () => {
  console.log(email.value, password.value);
};
</script>

<template>
  <div>
    <h1 class="text-2xl">Log in</h1>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col mb-2">
        <label for="email" class="text-sm">Email</label>
        <input type="email" id="email" v-model="email" class="border" />
      </div>

      <div class="flex flex-col mb-2">
        <label for="password" class="text-sm">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="border"
        />
      </div>

      <button type="submit" class="bg-gray-200">Log in</button>
    </form>
  </div>
</template>

<style scoped></style>
