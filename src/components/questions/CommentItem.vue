<script setup lang="ts">
import getUser from "../../composables/getUser";
import { formatDistanceToNow } from "date-fns";

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
  <div class="border p-2 my-2">
    <button
      v-if="user?.uid === comment.userId"
      @click="onDeleteCommentClick(comment.id)"
      class="px-3 py-1 bg-red-400 hover:bg-red-500"
    >
      Delete
    </button>

    <p class="text-lg">{{ comment.content }}</p>
    <p class="text-sm text-gray-500">
      Sent by
      <span class="font-bold text-blue-400">{{ comment.displayName }}</span
      >, {{ formatDistanceToNow(comment.createdAt.toDate()) }} ago
    </p>

    <!-- Buttons -->
    <div class="flex gap-2 mt-2">
      <button
        @click="onLikeClick"
        class="px-3 py-1 bg-green-200 hover:bg-green-300"
      >
        Like - {{ comment.likes.length }}
      </button>

      <button
        @click="onDislikeClick"
        class="px-3 py-1 bg-red-200 hover:bg-red-300"
      >
        Dislike - {{ comment.dislikes.length }}
      </button>
    </div>
  </div>
</template>

<style scoped></style>
