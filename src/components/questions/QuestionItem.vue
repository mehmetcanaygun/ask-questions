<script setup lang="ts">
import { PropType } from "vue";
import { Question } from "../../types";

const props = defineProps({
  question: Object as PropType<Question>,
});
</script>

<template>
  <div class="border">
    <p>Id: {{ props.question?.id }}</p>
    <p>Title: {{ props.question?.title }}</p>
    <p>UserId: {{ props.question?.userId }}</p>
    <p>createdAt: {{ props.question?.createdAt }}</p>
    <p>Content: {{ props.question?.content }}</p>
    <p>Likes: {{ props.question?.likes.length }}</p>
    <p>Dislikes: {{ props.question?.dislikes.length }}</p>
    <p>Comments: {{ props.question?.comments }}</p>
  </div>
</template>

<style scoped></style>
