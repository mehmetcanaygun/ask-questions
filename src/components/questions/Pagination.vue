<script setup lang="ts">
import { PAGINATION_TYPE } from "../../constants";
import ChevronLeftSvg from "../../assets/chevron-left.svg";
import ChevronRightSvg from "../../assets/chevron-right.svg";

const emit = defineEmits(["paginate"]);
const props = defineProps({
  page: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});

const onPrevClick = async () => {
  emit("paginate", PAGINATION_TYPE.prev);
};

const onNextClick = async () => {
  emit("paginate", PAGINATION_TYPE.next);
};
</script>

<template>
  <div class="rounded py-4 mt-4 text-light flex justify-end items-center gap-2">
    <button
      @click="onPrevClick"
      class="bg-secondary hover:bg-secondaryDark px-2 text-dark rounded duration-200"
    >
      <img :src="ChevronLeftSvg" alt="Chevron left" />
    </button>

    <span>{{ props.page + 1 }} / {{ props.totalPages }}</span>

    <button
      @click="onNextClick"
      class="bg-secondary hover:bg-secondaryDark px-2 text-dark rounded duration-200"
    >
      <img :src="ChevronRightSvg" alt="Chevron right" />
    </button>
  </div>
</template>

<style scoped></style>
