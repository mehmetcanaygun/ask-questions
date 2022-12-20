<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import useQuestion from "../../composables/useQuestion";
import QuestionForm from "../../components/questions/QuestionForm.vue";
import { QuestionFormData } from "../../types";

const router = useRouter();
const { error, addQuestion } = useQuestion();

const handleSaveQuestion = async (data: QuestionFormData) => {
  const questionId = await addQuestion(data);

  if (questionId) {
    router.push({ name: "Question Detail", params: { id: questionId } });
  }
};
</script>

<template>
  <div class="container py-4">
    <h1 class="text-2xl mb-4">New Question</h1>

    <QuestionForm :action="'create'" :handleSaveQuestion="handleSaveQuestion" />

    <div v-if="error">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<style scoped></style>
