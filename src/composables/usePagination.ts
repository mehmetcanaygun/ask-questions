import { ref } from "vue";
import { Question, Comment } from "../types";
import { PAGE_LIMIT } from "../constants";

type List = Question[] | Comment[];

const usePagination = (list: List) => {
  const page = ref<number>(0);

  const totalItems = list.length;
  const totalPages = Math.ceil(totalItems / PAGE_LIMIT);

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
