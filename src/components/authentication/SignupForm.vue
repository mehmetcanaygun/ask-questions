<script setup lang="ts">
import { ref } from "vue";
import useSignup from "../../composables/useSignup";
import Header from "../layout/Header.vue";

const { error, signup } = useSignup();

// Refs
const email = ref<string>("");
const username = ref<string>("");
const password = ref<string>("");

const emit = defineEmits(["signup"]);

const onSubmit = async () => {
  await signup(email.value, username.value, password.value);

  if (!error.value) {
    emit("signup");
  }
};
</script>

<template>
  <div class="py-8">
    <Header title="Sign up" />

    <form @submit.prevent="onSubmit">
      <div class="flex flex-col mb-2">
        <label for="email" class="text-sm text-light mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="p-2 rounded bg-dark text-light text-xl"
        />
      </div>

      <div class="flex flex-col mb-2">
        <label for="username" class="text-sm text-light mb-1">Username</label>
        <input
          type="text"
          id="username"
          v-model="username"
          class="p-2 rounded bg-dark text-light text-xl"
        />
      </div>

      <div class="flex flex-col mb-4">
        <label for="password" class="text-sm text-light mb-1">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="p-2 rounded bg-dark text-light text-xl"
        />
      </div>

      <button
        type="submit"
        class="py-1 px-4 bg-secondary hover:bg-secondaryDark rounded"
      >
        Sign up
      </button>
    </form>
  </div>
</template>

<style scoped></style>
