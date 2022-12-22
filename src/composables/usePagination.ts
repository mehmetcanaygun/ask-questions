import { ref } from "vue";
import { Question } from "../types";
import { PAGE_LIMIT } from "../constants";

const usePagination = (questions: Question[]) => {
  const page = ref<number>(0);

  const totalQuestions = questions.length;
  const totalPages = Math.ceil(totalQuestions / PAGE_LIMIT);

  const prevPage = () => {
    if (page.value > 0) {
      page.value = page.value - 1;
    }
  };

  const nextPage = () => {
    if (page.value < totalPages - 1) {
      page.value = page.value + 1;
    }
  };

  return { page, totalPages, prevPage, nextPage };
};

export default usePagination;
