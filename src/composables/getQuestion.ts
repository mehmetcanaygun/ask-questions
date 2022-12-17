import { ref } from "vue";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Question } from "../types";

const getQuestion = async (id: string) => {
  const question = ref<Question>();
  const error = ref<null | string>(null);

  try {
    const docSnap = await getDoc(doc(db, "questions", id));

    if (docSnap.exists()) {
      const result = { ...docSnap.data(), id: docSnap.id } as Question
      question.value = result;
    }

    console.log("GET DOC: ", question.value)
  } catch (err) {
    console.log(err)
    error.value = 'Question could not be fetched.'
  }

  return { question, error }
}

export default getQuestion;
