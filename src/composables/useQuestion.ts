import { ref } from "vue";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { db, timestamp } from "../firebase/config";
import getUser from "./getUser";
import useLoading from "./useLoading";
import { UpdateQuestionData } from "../types";

const { user } = getUser();
const { setLoading } = useLoading();

const useQuestion = () => {
  const error = ref<string>("");

  const addQuestion = async (question: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    try {
      setLoading(true);

      const newQuestion = {
        ...question,
        comments: [],
        likes: [],
        dislikes: [],
        userId: user.value?.uid,
        createdAt: timestamp,
      };

      const docRef = await addDoc(collection(db, "questions"), newQuestion);

      if (!docRef) return;

      setLoading(false);

      return docRef.id;
    } catch (err) {
      console.log(err);
      error.value = "Question could not be created.";
    }
  };

  const updateQuestion = async (
    questionId: string,
    data: UpdateQuestionData
  ) => {
    try {
      const docRef = doc(db, "questions", questionId);

      await updateDoc(docRef, data);

      if (!docRef) return;

      return docRef.id;
    } catch (err) {
      console.log(err);
      error.value = "Question could not be updated.";
    }
  };

  return { error, addQuestion, updateQuestion };
};

export default useQuestion;
