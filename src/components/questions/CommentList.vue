<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import usePagination from "../../composables/usePagination";
import Pagination from "./Pagination.vue";
import CommentItem from "./CommentItem.vue";
import { Comment } from "../../types";
import { sortComments } from "../../utils";
import { PAGE_LIMIT, PAGINATION_TYPE } from "../../constants";

const props = defineProps({
  comments: {
    type: Array as PropType<Comment[]>,
    required: true,
  },
  handleLikeDislikeComment: {
    type: Function,
    required: true,
  },
  onDeleteCommentClick: {
    type: Function,
    required: true,
  },
});

const { page, totalPages, prevPage, nextPage } = usePagination(props.comments);

const paginatedComments = ref<Comment[]>(props.comments);

const init = () => {
  // Paginate
  paginatedComments.value = [...props.comments].slice(
    page.value * PAGE_LIMIT,
    page.value * PAGE_LIMIT + PAGE_LIMIT
  );
};

const handlePagination = (type: string) => {
  type === PAGINATION_TYPE.prev ? prevPage() : nextPage();
};

watch([page], (refs, prevRefs) => {
  init();
});

init();
</script>

<template>
  <div class="animate-slideUp">
    <Pagination
      :page="page"
      :totalPages="totalPages"
      @paginate="handlePagination"
    />

    <ul
      v-if="paginatedComments && paginatedComments.length > 0"
      class="animate-slideUp"
    >
      <li v-for="comment in sortComments(paginatedComments)" :key="comment.id">
        <CommentItem
          :comment="comment"
          :onDeleteCommentClick="props.onDeleteCommentClick"
          @like-dislike="props.handleLikeDislikeComment"
        />
      </li>
    </ul>

    <!-- Pagination -->
    <Pagination
      :page="page"
      :totalPages="totalPages"
      @paginate="handlePagination"
    />
  </div>
</template>

<style scoped></style>
