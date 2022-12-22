<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import getUser from "../../composables/getUser";
import getQuestion from "../../composables/getQuestion";
import useQuestion from "../../composables/useQuestion";
import useLoading from "../../composables/useLoading";
import Question from "../../components/questions/Question.vue";
import CommentForm from "../../components/questions/CommentForm.vue";
import CommentList from "../../components/questions/CommentList.vue";
import Spinner from "../../components/layout/Spinner.vue";
import Header from "../../components/layout/Header.vue";
import { Comment } from "../../types";
import { v4 as uuidv4 } from "uuid";

const route = useRoute();
const questionId = route.params.id as string;

const router = useRouter();

const questionRef = ref();
const errorRef = ref();
const ownedRef = ref<boolean>(false);

// Get logged in user
const { user } = getUser();

// Get loading state
const { isLoading, setLoading } = useLoading();

const { updateQuestion, error: useQuestionErr, deleteQuestion } = useQuestion();

// Random id to pass as a key to CommentList
const commentListKey = ref<string>(uuidv4());

const init = async () => {
  const { question, error } = await getQuestion(questionId);

  ownedRef.value = question.value?.user?.id === user.value?.uid;

  questionRef.value = question.value;
  errorRef.value = error.value;

  commentListKey.value = uuidv4();
};

const handleAddComment = async (comment: Comment) => {
  const updatedComments = [
    ...(questionRef.value?.comments as Comment[]),
    comment,
  ];
  const data = {
    comments: updatedComments,
  };

  setLoading(true);

  await updateQuestion(questionId, data);
  await init();

  setLoading(false);
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

  setLoading(true);

  await updateQuestion(questionId, data);
  await init();

  setLoading(false);
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

  setLoading(true);

  await updateQuestion(questionId, data);
  await init();

  setLoading(false);
};

const onDeleteQuestionClick = async () => {
  setLoading(true);
  await deleteQuestion(questionRef.value.id);
  setLoading(false);

  router.push({ name: "Questions" });
};

const onDeleteCommentClick = async (commentId: string) => {
  const comments = questionRef.value?.comments as Comment[];
  const updatedComments = comments.filter((item) => item.id !== commentId);

  const data = {
    comments: updatedComments,
  };

  setLoading(true);

  await updateQuestion(questionId, data);
  await init();

  setLoading(false);
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
  <Spinner v-if="isLoading" />

  <div class="container py-4">
    <Header title="Question Detail" />

    <Question
      :question="questionRef"
      :owned="ownedRef"
      :onEditQuestionClick="onEditQuestionClick"
      :onDeleteQuestionClick="onDeleteQuestionClick"
      :handleLikeDislikeQuestion="handleLikeDislikeQuestion"
    />

    <CommentForm @add-comment="handleAddComment" />

    <CommentList
      :key="commentListKey"
      :comments="questionRef.comments"
      :handleLikeDislikeComment="handleLikeDislikeComment"
      :onDeleteCommentClick="onDeleteCommentClick"
    />
  </div>
</template>

<style scoped></style>
