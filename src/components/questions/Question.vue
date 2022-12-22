<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import { Question } from "../../types";
import { formatDistanceToNow } from "date-fns";
import EditSvg from "../../assets/edit.svg";
import TrashSvg from "../../assets/trash.svg";
import ThumbsUpSvg from "../../assets/thumbs-up.svg";
import ThumbsDownSvg from "../../assets/thumbs-down.svg";

const props = defineProps({
  question: {
    type: Object as PropType<Question>,
    required: true,
  },
  owned: {
    type: Boolean,
    required: true,
  },
  onEditQuestionClick: {
    type: Function,
    required: true,
  },
  onDeleteQuestionClick: {
    type: Function,
    required: true,
  },
  handleLikeDislikeQuestion: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="mb-10 animate-fadeIn">
    <div class="flex justify-between mb-2">
      <!-- Title and create info -->
      <div>
        <p class="text-2xl text-secondary mb-1">{{ props.question?.title }}</p>

        <p class="text-sm text-gray-400 mb-1">
          <span class="text-light">{{ props.question?.user?.name }}</span> asked
          <span class="text-light">{{
            props.question?.createdAt &&
            formatDistanceToNow(props.question?.createdAt.toDate())
          }}</span>
          ago
        </p>
      </div>

      <!-- Action buttons -->
      <div v-if="owned" class="flex items-start gap-2">
        <button
          @click="props.onEditQuestionClick"
          class="px-4 py-1 bg-info hover:bg-infoDark text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
        >
          <img :src="EditSvg" alt="Pen" class="h-4" /> Edit
        </button>

        <button
          @click="props.onDeleteQuestionClick"
          class="px-4 py-1 bg-danger hover:bg-dangerDark text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
        >
          <img :src="TrashSvg" alt="Trash" class="h-4" /> Delete
        </button>
      </div>
    </div>

    <!-- Tags -->
    <ul class="flex gap-1 text-[12px] mb-4">
      <li
        v-for="tag in props.question?.tags"
        class="px-2 rounded bg-secondary text-darker"
      >
        {{ tag }}
      </li>
    </ul>

    <p class="text-lg text-light mb-4">{{ props.question?.content }}</p>

    <!-- Like & dislike buttons -->
    <div class="flex gap-2">
      <button
        @click="props.handleLikeDislikeQuestion('like')"
        class="px-4 py-1 border border-success hover:border-light text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
      >
        <img :src="ThumbsUpSvg" alt="Thumbs up" class="h-4" />
        {{ props.question?.likes.length }}
      </button>

      <button
        @click="props.handleLikeDislikeQuestion('dislike')"
        class="px-4 py-1 border border-danger hover:border-light text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
      >
        <img :src="ThumbsDownSvg" alt="Thumbs down" class="h-4" />
        {{ props.question?.dislikes.length }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
