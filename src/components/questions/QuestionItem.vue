<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { Question } from "../../types";

const router = useRouter();

const props = defineProps({
  question: Object as PropType<Question>,
});

const viewDetail = () => {
  router.push({
    name: "Question Detail",
    params: { id: props.question?.id },
  });
};
</script>

<template>
  <div class="border" @click="viewDetail">
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
