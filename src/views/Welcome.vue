<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "../components/authentication/LoginForm.vue";
import SignupForm from "../components/authentication/SignupForm.vue";

// Refs
const showLogin = ref<boolean>(true);
</script>

<template>
  <div class="container">
    <div v-if="showLogin">
      <LoginForm />
      <p>
        Don't you have an account?
        <button @click="showLogin = false" class="text-blue-300">
          Sign up
        </button>
        now.
      </p>
    </div>

    <div v-else>
      <SignupForm />
      <p>
        Are you already a user?
        <button @click="showLogin = true" class="text-blue-300">Log in</button>
        now.
      </p>
    </div>
  </div>
</template>

<style scoped></style>
