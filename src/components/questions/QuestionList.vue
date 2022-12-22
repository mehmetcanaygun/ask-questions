<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import usePagination from "../../composables/usePagination";
import Pagination from "./Pagination.vue";
import QuestionItem from "./QuestionItem.vue";
import { Question } from "../../types";
import { PAGE_LIMIT, PAGINATION_TYPE } from "../../constants";

const props = defineProps({
  questions: {
    type: Array as PropType<Question[]>,
    required: true,
  },
});

const { page, totalPages, prevPage, nextPage } = usePagination(props.questions);

const paginatedQuestions = ref<Question[]>();

const init = () => {
  // Paginate
  paginatedQuestions.value = [...props.questions].slice(
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
  <div>
    <Pagination
      :page="page"
      :totalPages="totalPages"
      @paginate="handlePagination"
    />

    <ul class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <QuestionItem
        v-for="question in paginatedQuestions"
        :question="question"
        :key="question.id"
      />
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
