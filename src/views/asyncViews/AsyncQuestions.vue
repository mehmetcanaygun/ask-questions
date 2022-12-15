<script setup lang="ts">
import getQuestions from "../../composables/getQuestions";
import QuestionItem from "../../components/questions/QuestionItem.vue";

const { questions, error } = await getQuestions();
</script>

<template>
  <div>Async - Questions Feed</div>
  <QuestionItem
    v-for="question in questions"
    :question="question"
    :key="question.id"
  />
</template>

<style scoped></style>
