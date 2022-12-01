<script setup lang="ts">
import { ref } from "vue";

const email = ref("");
const username = ref("");
const password = ref("");

const onSubmit = () => {
  console.log(email.value, username.value, password.value);
};
</script>

<template>
  <div>
    <h1 class="text-2xl">Sign up</h1>
    <form @submit.prevent="onSubmit">
      <div class="flex flex-col mb-2">
        <label for="email" class="text-sm">Email</label>
        <input type="email" id="email" v-model="email" class="border" />
      </div>

      <div class="flex flex-col mb-2">
        <label for="username" class="text-sm">Username</label>
        <input type="text" id="username" v-model="username" class="border" />
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

      <button type="submit" class="bg-gray-200">Sign up</button>
    </form>
  </div>
</template>

<style scoped></style>
