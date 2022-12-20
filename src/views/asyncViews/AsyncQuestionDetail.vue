<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import getUser from "../../composables/getUser";
import getQuestion from "../../composables/getQuestion";
import useQuestion from "../../composables/useQuestion";
import useLoading from "../../composables/useLoading";
import CommentForm from "../../components/questions/CommentForm.vue";
import CommentItem from "../../components/questions/CommentItem.vue";
import Spinner from "../../components/layout/Spinner.vue";
import { formatDistanceToNow } from "date-fns";
import { Comment, QuestionFormData } from "../../types";
import router from "../../router";

const route = useRoute();
const questionId = route.params.id as string;

const questionRef = ref();
const errorRef = ref();
const ownedRef = ref<boolean>(false);

// Get logged in user
const { user } = getUser();

// Get loading state
const { isLoading } = useLoading();

const { updateQuestion, error: useQuestionErr, deleteQuestion } = useQuestion();

const init = async () => {
  const { question, error } = await getQuestion(questionId);

  ownedRef.value = question.value?.userId === user.value?.uid;

  questionRef.value = question.value;
  errorRef.value = error.value;
};

const handleAddComment = async (comment: Comment) => {
  const updatedComments = [
    ...(questionRef.value?.comments as Comment[]),
    comment,
  ];
  const data = {
    comments: updatedComments,
  };

  await updateQuestion(questionId, data);

  await init();
};

const handleLikeDislikeComment = async (action: string, id: string) => {
  const comments = questionRef.value?.comments as Comment[];
  const comment = comments.find((item) => item.id === id);

  const likes = comment?.likes || [];
  const dislikes = comment?.dislikes || [];

  const isLiked = !!likes.find((item) => item === user.value?.uid);
  const isDisliked = !!dislikes.find((item) => item === user.value?.uid);

  let updatedLikes = [...likes];
  let updatedDislikes = [...dislikes];

  if (action === "like") {
    // Do not make a request if it's already been liked
    if (isLiked) return;

    if (!isLiked && user.value) {
      // Add like
      updatedLikes.push(user.value.uid);
    }

    if (isDisliked && user.value) {
      // Remove dislike
      updatedDislikes = updatedDislikes.filter(
        (item) => item !== user.value?.uid
      );
    }
  } else {
    // Do not make a request if it's already been disliked
    if (isDisliked) return;

    if (!isDisliked && user.value) {
      // Add dislike
      updatedDislikes.push(user.value.uid);
    }

    if (isLiked && user.value) {
      // Remove like
      updatedLikes = updatedLikes.filter((item) => item !== user.value?.uid);
    }
  }

  const updatedComments = comments.map((item) => {
    if (item.id === comment?.id) {
      return {
        ...comment,
        likes: updatedLikes,
        dislikes: updatedDislikes,
      };
    }

    return { ...item };
  });

  const data = {
    comments: updatedComments,
  };

  await updateQuestion(questionId, data);
  await init();
};

const handleLikeDislikeQuestion = async (action: string) => {
  const likes: string[] = questionRef.value.likes || [];
  const dislikes: string[] = questionRef.value.dislikes || [];

  const isLiked = !!likes.find((item) => item === user.value?.uid);
  const isDisliked = !!dislikes.find((item) => item === user.value?.uid);

  let updatedLikes = [...likes];
  let updatedDislikes = [...dislikes];

  if (action === "like") {
    // Do not make a request if it's already been liked
    if (isLiked) return;

    if (!isLiked && user.value) {
      // Add like
      updatedLikes.push(user.value.uid);
    }

    if (isDisliked && user.value) {
      // Remove dislike
      updatedDislikes = updatedDislikes.filter(
        (item) => item !== user.value?.uid
      );
    }
  } else {
    // Do not make a request if it's already been disliked
    if (isDisliked) return;

    if (!isDisliked && user.value) {
      // Add dislike
      updatedDislikes.push(user.value.uid);
    }

    if (isLiked && user.value) {
      // Remove like
      updatedLikes = updatedLikes.filter((item) => item !== user.value?.uid);
    }
  }

  const data = {
    likes: updatedLikes,
    dislikes: updatedDislikes,
  };

  await updateQuestion(questionId, data);
  await init();
};

const onDeleteQuestionClick = async () => {
  await deleteQuestion(questionRef.value.id);
  router.push({ name: "Questions" });
};

const onDeleteCommentClick = async (commentId: string) => {
  const comments = questionRef.value?.comments as Comment[];
  const updatedComments = comments.filter((item) => item.id !== commentId);

  const data = {
    comments: updatedComments,
  };

  await updateQuestion(questionId, data);
  await init();
};

const onEditQuestionClick = async () => {
  const { id, title, content, tags } = questionRef.value;

  router.push({
    name: "Edit Question",
    params: { id },
  });
};

await init();
</script>

<template>
  <div v-if="isLoading">
    <Spinner />
  </div>

  <div v-else class="container py-4">
    <h1 class="text-2xl mb-4">Question Detail</h1>

    <!-- Questıon -->
    <div class="border p-2 mb-4">
      <div v-if="ownedRef" class="flex gap-2">
        <button
          @click="onEditQuestionClick"
          class="px-3 py-1 bg-blue-400 hover:bg-blue-500"
        >
          Edit
        </button>

        <button
          @click="onDeleteQuestionClick"
          class="px-3 py-1 bg-red-400 hover:bg-red-500"
        >
          Delete
        </button>
      </div>

      <p class="font-bold text-blue-400">{{ questionRef?.title }}</p>
      <!-- <p class="text-sm text-gray-500">Id: {{ question?.id }}</p> -->
      <p class="text-sm text-gray-500">UserId: {{ questionRef?.userId }}</p>
      <p class="text-sm text-gray-500">
        createdAt:
        {{
          questionRef?.createdAt &&
          formatDistanceToNow(questionRef?.createdAt.toDate())
        }}
      </p>
      <p class="font-bold text-lg my-2">{{ questionRef?.content }}</p>

      <!-- Buttons -->
      <div class="flex gap-2">
        <button
          @click="handleLikeDislikeQuestion('like')"
          class="px-3 py-1 bg-green-200 hover:bg-green-300"
        >
          Like - {{ questionRef?.likes.length }}
        </button>
        <button
          @click="handleLikeDislikeQuestion('dislike')"
          class="px-3 py-1 bg-red-200 hover:bg-red-300"
        >
          Dislike - {{ questionRef?.dislikes.length }}
        </button>
      </div>
    </div>

    <!-- Comment Form -->
    <CommentForm @add-comment="handleAddComment" />

    <!-- Comments -->
    <ul v-if="questionRef.comments && questionRef.comments.length > 0">
      <li v-for="comment in questionRef.comments" :key="comment.id">
        <CommentItem
          :comment="comment"
          :onDeleteCommentClick="onDeleteCommentClick"
          @like-dislike="handleLikeDislikeComment"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
