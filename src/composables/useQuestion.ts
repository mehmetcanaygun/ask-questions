import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase/config";
import getUser from "./getUser";

const { user } = getUser();

const useQuestion = () => {
  const error = ref<string>("");

  const addQuestion = async (question: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    try {
      const newQuestion = {
        ...question,
        comments: [],
        likes: [],
        dislikes: [],
        userId: user.value?.uid,
        createdAt: timestamp,
      }

      const docRef = await addDoc(collection(db, "questions"), newQuestion);

      if (!docRef) return

      return docRef.id
    } catch (err) {
      console.log(err);
      error.value = "Question could not be created.";
    }
  };

  return { error, addQuestion };
};

export default useQuestion;
