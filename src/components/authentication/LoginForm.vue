<script setup lang="ts">
import { ref } from "vue";
import useLogin from "../../composables/useLogin";
import Header from "../layout/Header.vue";

const { error, login } = useLogin();

// Refs
const email = ref("");
const password = ref("");

const emit = defineEmits(["login"]);

const onSubmit = async () => {
  await login(email.value, password.value);

  if (!error.value) {
    emit("login");
  }
};
</script>

<template>
  <div class="py-8">
    <Header title="Log in" />

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
        class="py-1 px-4 bg-primary hover:bg-primaryDark rounded"
      >
        Log in
      </button>
    </form>
  </div>
</template>

<style scoped></style>
