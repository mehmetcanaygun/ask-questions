<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
import getUser from "../../composables/getUser";

const emit = defineEmits(["addComment"]);

const { user } = getUser();

const comment = ref<string>("");
const commentError = ref<string>("");

const onSendClick = () => {
  commentError.value = "";

  if (!comment.value) {
    commentError.value = "Enter a comment.";
    return;
  }

  const newComment = {
    id: uuidv4(),
    userId: user.value?.uid,
    displayName: user.value?.displayName,
    content: comment.value,
    createdAt: new Date(),
    likes: [],
    dislikes: [],
  };

  emit("addComment", newComment);

  comment.value = "";
};
</script>

<template>
  <form class="flex flex-col items-start rounded bg-light p-4">
    <label class="mb-1 text-dark">Enter your comment</label>
    <textarea
      v-model="comment"
      class="w-full p-2 rounded bg-white shadow mb-2"
    ></textarea>

    <p v-if="commentError" class="text-sm text-red-400">{{ commentError }}</p>

    <button
      @click.prevent="onSendClick"
      class="px-4 py-1 bg-info hover:bg-infoDark text-sm text-dark rounded flex items-center justify-start gap-1 duration-200 shadow"
    >
      Send
    </button>
  </form>
</template>

<style scoped></style>
