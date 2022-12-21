<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "../components/authentication/LoginForm.vue";
import SignupForm from "../components/authentication/SignupForm.vue";
import WelcomeImg from "../assets/welcome-img.jpg";

// Refs
const showLogin = ref<boolean>(true);

const router = useRouter();

const redirectToQuestions = () => {
  router.push({ name: "Questions" });
};
</script>

<template>
  <div class="container">
    <!-- <div>
      <img :src="WelcomeImg" alt="Freezing texture" />
    </div> -->

    <div>
      <div v-if="showLogin">
        <LoginForm @login="redirectToQuestions" />
        <p class="text-light">
          Don't you have an account?
          <button @click="showLogin = false" class="text-secondary">
            Sign up
          </button>
          now.
        </p>
      </div>

      <div v-else>
        <SignupForm @signup="redirectToQuestions" />
        <p class="text-light">
          Are you already a user?
          <button @click="showLogin = true" class="text-primary">Log in</button>
          now.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
