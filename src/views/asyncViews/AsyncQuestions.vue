<script setup lang="ts">
import getQuestions from "../../composables/getQuestions";
import QuestionItem from "../../components/questions/QuestionItem.vue";

const { questions, error } = await getQuestions();
</script>

<template>
  <div class="container py-4">
    <h1 class="text-2xl mb-4">Questions Feed</h1>

    <div class="mb-4">There will be filters here...</div>

    <QuestionItem
      v-for="question in questions"
      :question="question"
      :key="question.id"
    />
  </div>
</template>

<style scoped></style>
