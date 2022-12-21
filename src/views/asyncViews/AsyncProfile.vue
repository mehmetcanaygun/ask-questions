<script setup lang="ts">
import getUser from "../../composables/getUser";
import getQuestions from "../../composables/getQuestions";
import QuestionItem from "../../components/questions/QuestionItem.vue";
import Header from "../../components/layout/Header.vue";

// Logged in user
const { user } = getUser();

const { questions, error } = await getQuestions(user.value?.uid);
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

    <!-- User's questions -->
    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <QuestionItem
        v-for="question in questions"
        :question="question"
        :key="question.id"
      />
    </ul>

    <!-- Error -->
    <p v-if="error" class="text-light p-4 border-danger">{{ error }}</p>
  </div>
</template>

<style scoped></style>
