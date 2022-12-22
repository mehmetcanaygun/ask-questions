<script setup lang="ts">
import { ref } from "vue";
import useLogin from "../../composables/useLogin";
import useLoading from "../../composables/useLoading";
import Header from "../layout/Header.vue";
import Spinner from "../layout/Spinner.vue";

const { error, login } = useLogin();
const { isLoading, setLoading } = useLoading();

// Refs
const email = ref("");
const password = ref("");
const emailError = ref<string>("");
const passwordError = ref<string>("");

const emit = defineEmits(["login"]);

const onSubmit = async () => {
  emailError.value = "";
  passwordError.value = "";

  if (!email.value) {
    emailError.value = "Email is required.";
  }

  if (!password.value) {
    passwordError.value = "Password is required.";
  }

  if (!emailError.value && !passwordError.value) {
    setLoading(true);

    await login(email.value, password.value);

    if (!error.value) {
      emit("login");
    }

    setLoading(false);
  }
};
</script>

<template>
  <Spinner v-if="isLoading" />

  <div class="py-8">
    <Header title="Log in" />

    <form @submit.prevent="onSubmit" class="animate-fadeIn">
      <div class="flex flex-col mb-2">
        <label for="email" class="text-sm text-light mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="p-2 rounded bg-dark text-light text-xl"
        />
        <p v-if="emailError" class="text-sm text-danger">{{ emailError }}</p>
      </div>

      <div class="flex flex-col mb-4">
        <label for="password" class="text-sm text-light mb-1">Password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          class="p-2 rounded bg-dark text-light text-xl"
        />
        <p v-if="passwordError" class="text-sm text-danger">
          {{ passwordError }}
        </p>
      </div>

      <button
        type="submit"
        class="py-1 px-4 bg-primary hover:bg-primaryDark rounded"
      >
        Log in
      </button>

      <!-- Error -->
      <p v-if="error" class="text-sm text-danger mt-4">{{ error }}</p>
    </form>
  </div>
</template>

<style scoped></style>
