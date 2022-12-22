<script setup lang="ts">
import getUser from "../../composables/getUser";
import getQuestions from "../../composables/getQuestions";
import Header from "../../components/layout/Header.vue";
import QuestionList from "../../components/questions/QuestionList.vue";

const { user } = getUser(); // Logged in user
const { questions, error } = await getQuestions({
  userId: user.value?.uid,
});
</script>

<template>
  <div class="container py-4">
    <Header title="My Profile" />

    <!-- Name  -->
    <div class="flex justify-between items-start mb-4">
      <p class="text-light">
        <span class="text-3xl text-primary">{{ user?.displayName }}</span
        >,
        <span>{{ user?.email }}</span>
      </p>
    </div>

    <QuestionList :questions="questions" />

    <!-- Error -->
    <p v-if="error" class="text-light p-4 border-danger">{{ error }}</p>
  </div>
</template>

<style scoped></style>
