<script setup lang="ts">
import getQuestions from "../../composables/getQuestions";
import QuestionItem from "../../components/questions/QuestionItem.vue";
import Header from "../../components/layout/Header.vue";

const { questions, error } = await getQuestions();
</script>

<template>
  <div class="container py-4">
    <Header title="Questions Feed" />

    <!-- FILTERS -->

    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <QuestionItem
        v-for="question in questions"
        :question="question"
        :key="question.id"
      />
    </ul>
  </div>
</template>

<style scoped></style>
