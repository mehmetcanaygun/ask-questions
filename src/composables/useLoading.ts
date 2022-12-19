import { ref } from "vue";

const useLoading = () => {
  const isLoading = ref<boolean>(false)

  const setLoading = (condition: boolean) => {
    isLoading.value = condition
    console.log(condition)
  }

  return { isLoading, setLoading }
}

export default useLoading;