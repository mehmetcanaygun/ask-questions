<script setup lang="ts">
import { useRoute } from "vue-router";
import getQuestion from "../../composables/getQuestion";
import QuestionForm from "../../components/questions/CommentForm.vue";
import { formatDistanceToNow } from "date-fns";

const route = useRoute();
const questionId = route.params.id as string;
const { question, error } = await getQuestion(questionId);
</script>

<template>
  <div class="container py-4">
    <h1 class="text-2xl mb-4">Question Detail</h1>

    <!-- Questıon -->
    <div class="border p-2 mb-4">
      <p class="font-bold text-blue-400">{{ question?.title }}</p>
      <!-- <p class="text-sm text-gray-500">Id: {{ question?.id }}</p> -->
      <p class="text-sm text-gray-500">UserId: {{ question?.userId }}</p>
      <p class="text-sm text-gray-500">
        createdAt:
        {{
          question?.createdAt &&
          formatDistanceToNow(question?.createdAt.toDate())
        }}
      </p>
      <p class="font-bold text-lg my-2">{{ question?.content }}</p>

      <!-- Buttons -->
      <div class="flex gap-2">
        <button class="px-3 py-1 bg-green-200 hover:bg-green-300">
          Like - {{ question?.likes.length }}
        </button>
        <button class="px-3 py-1 bg-red-200 hover:bg-red-300">
          Dislike - {{ question?.dislikes.length }}
        </button>
      </div>
    </div>

    <!-- Comment Form -->
    <QuestionForm />

    <!-- Comments -->
    <div
      v-for="comment in question?.comments"
      :key="comment.userId"
      class="border p-2 my-2"
    >
      <p class="mb-2">{{ comment.content }}</p>

      <!-- Buttons -->
      <div class="flex gap-2">
        <button class="px-3 py-1 bg-green-200 hover:bg-green-300">
          Like - {{ comment.likes.length }}
        </button>
        <button class="px-3 py-1 bg-red-200 hover:bg-red-300">
          Dislike - {{ comment.dislikes.length }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
