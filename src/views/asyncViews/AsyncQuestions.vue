<script setup lang="ts">
import { ref } from "vue";
import getQuestions from "../../composables/getQuestions";
import Header from "../../components/layout/Header.vue";
import Filter from "../../components/questions/Filter.vue";
import QuestionList from "../../components/questions/QuestionList.vue";
import { Question } from "../../types";
import { v4 as uuidv4 } from "uuid";

const { questions, error } = await getQuestions({});
const filteredQuestions = ref<Question[]>(questions.value);
const listId = ref<string>("");

const handleFilter = (text: string) => {
  filteredQuestions.value = [...questions.value].filter(
    (item) =>
      item.title.toLocaleLowerCase().includes(text) ||
      item.tags.join(",").toLocaleLowerCase().includes(text)
  );

  listId.value = uuidv4();
};
</script>

<template>
  <div class="container py-4">
    <Header title="Questions Feed" />

    <Filter :handleFilter="handleFilter" />

    <QuestionList :questions="filteredQuestions" :key="listId" />

    <!-- Error -->
    <p v-if="error" class="text-light p-4 border-danger">{{ error }}</p>
  </div>
</template>

<style scoped></style>
