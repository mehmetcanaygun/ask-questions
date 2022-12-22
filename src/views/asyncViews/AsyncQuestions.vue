<script setup lang="ts">
import getQuestions from "../../composables/getQuestions";
import QuestionList from "../../components/questions/QuestionList.vue";
import Header from "../../components/layout/Header.vue";

const { questions, error } = await getQuestions({});
</script>

<template>
  <div class="container py-4">
    <Header title="Questions Feed" />

    <!-- FILTERS -->

    <QuestionList :questions="questions" />

    <!-- Error -->
    <p v-if="error" class="text-light p-4 border-danger">{{ error }}</p>
  </div>
</template>

<style scoped></style>
