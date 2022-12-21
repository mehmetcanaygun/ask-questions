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
import Header from "../../components/layout/Header.vue";
import { formatDistanceToNow } from "date-fns";
import { Comment, QuestionFormData } from "../../types";
import router from "../../router";
import EditSvg from "../../assets/edit.svg";
import TrashSvg from "../../assets/trash.svg";
import ThumbsUpSvg from "../../assets/thumbs-up.svg";
import ThumbsDownSvg from "../../assets/thumbs-down.svg";
import MessageCircleSvg from "../../assets/message-circle.svg";

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

  ownedRef.value = question.value?.user?.id === user.value?.uid;

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
    <Header title="Question Detail" />

    <!-- Questıon -->
    <div class="mb-10">
      <div class="flex justify-between mb-2">
        <!-- Title and create info -->
        <div>
          <p class="text-2xl text-secondary mb-1">{{ questionRef?.title }}</p>

          <p class="text-sm text-gray-400 mb-1">
            <span class="text-light">{{ questionRef?.user?.name }}</span> asked
            <span class="text-light">{{
              questionRef?.createdAt &&
              formatDistanceToNow(questionRef?.createdAt.toDate())
            }}</span>
            ago
          </p>
        </div>

        <!-- Action buttons -->
        <div v-if="ownedRef" class="flex items-start gap-2">
          <button
            @click="onEditQuestionClick"
            class="px-4 py-1 bg-info hover:bg-infoDark text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
          >
            <img :src="EditSvg" alt="Pen" class="h-4" /> Edit
          </button>

          <button
            @click="onDeleteQuestionClick"
            class="px-4 py-1 bg-danger hover:bg-dangerDark text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
          >
            <img :src="TrashSvg" alt="Trash" class="h-4" /> Delete
          </button>
        </div>
      </div>

      <!-- Tags -->
      <ul class="flex gap-1 text-[12px] mb-4">
        <li
          v-for="tag in questionRef?.tags"
          class="px-2 rounded bg-secondary text-darker"
        >
          {{ tag }}
        </li>
      </ul>

      <p class="text-lg text-light mb-4">{{ questionRef?.content }}</p>

      <!-- Like & dislike buttons -->
      <div class="flex gap-2">
        <button
          @click="handleLikeDislikeQuestion('like')"
          class="px-4 py-1 border border-success hover:border-light text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
        >
          <img :src="ThumbsUpSvg" alt="Thumbs up" class="h-4" />
          {{ questionRef?.likes.length }}
        </button>

        <button
          @click="handleLikeDislikeQuestion('dislike')"
          class="px-4 py-1 border border-danger hover:border-light text-sm text-light rounded flex items-center justify-start gap-1 duration-200"
        >
          <img :src="ThumbsDownSvg" alt="Thumbs down" class="h-4" />
          {{ questionRef?.dislikes.length }}
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
