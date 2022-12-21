<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import getUser from "../../composables/getUser";
import getQuestion from "../../composables/getQuestion";
import useQuestion from "../../composables/useQuestion";
import QuestionForm from "../../components/questions/QuestionForm.vue";
import { QuestionFormData } from "../../types";

const route = useRoute();
const router = useRouter();

const questionId = route.params.id as string;

const { error: useQuestionErr, updateQuestion } = useQuestion();
const { error: getQuestionErr, question } = await getQuestion(questionId);

// Prevent editing when logged in user does not own the question
const { user } = getUser();

if (user.value?.uid !== question.value?.user?.id) {
  router.push({ name: "Questions" });
}

// Fill form with to be edited data
const formData = ref<QuestionFormData>();
const title = question.value?.title as string;
const content = question.value?.content as string;
const tags = question.value?.tags as string[];

formData.value = { title, content, tags };

const handleSaveQuestion = async (data: QuestionFormData) => {
  await updateQuestion(questionId, data);

  router.push({ name: "Question Detail", params: { id: questionId } });
};
</script>

<template>
  <div class="container py-4">
    <h1 class="text-2xl mb-4">Edit Question</h1>

    <QuestionForm
      :action="'create'"
      :handleSaveQuestion="handleSaveQuestion"
      :formData="formData"
    />

    <div v-if="getQuestionErr || useQuestionErr">
      <p>{{ getQuestionErr || useQuestionErr }}</p>
    </div>
  </div>
</template>

<style scoped></style>
