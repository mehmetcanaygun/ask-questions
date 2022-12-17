<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { Question } from "../../types";
import { formatDistanceToNow } from "date-fns";

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
  <div
    class="bg-blue-200 p-4 mb-2 shadow-md hover:bg-blue-300 cursor-pointer rounded"
    @click="viewDetail"
  >
    <!-- <p>Id: {{ props.question?.id }}</p> -->
    <p class="text-lg">{{ props.question?.title }}</p>
    <p class="text-sm text-gray-700">UserId: {{ props.question?.userId }}</p>
    <p class="text-sm text-gray-700">
      createdAt:
      {{
        props.question?.createdAt &&
        formatDistanceToNow(props.question?.createdAt.toDate())
      }}
    </p>
    <p>{{ props.question?.content }}</p>
    <p>
      Likes: {{ props.question?.likes.length }} - Dislikes:
      {{ props.question?.dislikes.length }}
    </p>
    <!-- <p>Comments: {{ props.question?.comments }}</p> -->
  </div>
</template>

<style scoped></style>
