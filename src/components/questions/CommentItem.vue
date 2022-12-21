<script setup lang="ts">
import getUser from "../../composables/getUser";
import { formatDistanceToNow } from "date-fns";
import TrashSvg from "../../assets/trash.svg";
import ThumbsUpSvg from "../../assets/thumbs-up.svg";
import ThumbsDownSvg from "../../assets/thumbs-down.svg";

const { user } = getUser();

const props = defineProps({
  comment: null,
  onDeleteCommentClick: null,
});
const emit = defineEmits(["likeDislike"]);

const onLikeClick = () => {
  emit("likeDislike", "like", props.comment.id);
};

const onDislikeClick = () => {
  emit("likeDislike", "dislike", props.comment.id);
};
</script>

<template>
  <div class="bg-dark rounded p-4 my-2">
    <!-- Info and buttons -->
    <div class="flex justify-between">
      <p class="text-sm text-gray-400">
        Sent by
        <span class="font-bold text-blue-400">{{ comment.displayName }}</span
        >, {{ formatDistanceToNow(comment.createdAt.toDate()) }} ago
      </p>

      <button
        v-if="user?.uid === comment.userId"
        @click="onDeleteCommentClick(comment.id)"
        class="px-4 py-1 bg-danger hover:bg-dangerDark text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
      >
        <img :src="TrashSvg" alt="Trash" class="h-4" /> Delete
      </button>
    </div>

    <!-- Comment -->
    <p class="text-lg text-light">{{ comment.content }}</p>

    <!-- Like and dislike buttons -->
    <div class="flex gap-2 mt-2">
      <button
        @click="onLikeClick"
        class="px-4 py-1 border border-success hover:border-light text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
      >
        <img :src="ThumbsUpSvg" alt="Thumbs up" class="h-4" />
        {{ comment.likes.length }}
      </button>

      <button
        @click="onDislikeClick"
        class="px-4 py-1 border border-danger hover:border-light text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
      >
        <img :src="ThumbsDownSvg" alt="Thumbs down" class="h-4" />
        {{ comment.dislikes.length }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
