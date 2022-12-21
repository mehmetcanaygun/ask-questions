<script setup lang="ts">
import { PropType } from "vue";
import { useRouter } from "vue-router";
import { Question } from "../../types";
import { formatDistanceToNow } from "date-fns";
import { shortenStr } from "../../utils";
import ThumbsUpSvg from "../../assets/thumbs-up.svg";
import ThumbsDownSvg from "../../assets/thumbs-down.svg";
import MessageCircleSvg from "../../assets/message-circle.svg";

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
  <li
    class="px-4 pt-4 pb-1 bg-dark border border-dark hover:bg-darker hover:border hover:border-light cursor-pointer rounded-lg duration-200"
    @click="viewDetail"
  >
    <!-- User, title and content info -->
    <div class="mb-2">
      <p class="text-secondary mb-1">{{ props.question?.title }}</p>

      <p class="text-sm text-gray-400 mb-1">
        <span class="text-light">{{ props.question?.user?.name }}</span> asked
        <span class="text-light">{{
          props.question?.createdAt &&
          formatDistanceToNow(props.question?.createdAt.toDate())
        }}</span>
        ago
      </p>

      <p class="text-gray-400 mb-1">
        {{ shortenStr(props.question?.content as string, 80) }}
      </p>
    </div>

    <!-- Tags and numbers -->
    <div class="flex justify-between items-start">
      <ul class="flex gap-1 text-[12px]">
        <li
          v-for="tag in props.question?.tags"
          class="px-2 rounded bg-secondary text-darker"
        >
          {{ tag }}
        </li>
      </ul>

      <ul class="pr-2 flex text-light text-sm">
        <li class="text-center w-8 h-8 relative">
          <img :src="ThumbsUpSvg" alt="Thumbs up" class="w-2/3" />
          <span class="absolute bottom-0 right-0">{{
            props.question?.likes.length
          }}</span>
        </li>
        <li class="text-center w-8 h-8 relative">
          <img :src="ThumbsDownSvg" alt="Thumbs down" class="w-2/3" />
          <span class="absolute bottom-0 right-0">{{
            props.question?.dislikes.length
          }}</span>
        </li>
        <li class="text-center w-8 h-8 relative">
          <img :src="MessageCircleSvg" alt="Message circle" class="w-2/3" />
          <span class="absolute bottom-0 right-0">{{
            props.question?.comments.length
          }}</span>
        </li>
      </ul>
    </div>
  </li>
</template>

<style scoped></style>
