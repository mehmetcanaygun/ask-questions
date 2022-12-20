import { ref } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { Question } from "../types";

const getQuestions = async () => {
  const questions = ref<Question[]>([]);
  const error = ref<null | string>(null);

  try {
    const querySnapshot = await getDocs(collection(db, "questions"));

    let results: Question[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().createdAt) {
        results.push({
          id: doc.id,
          userId: doc.data().userId,
          createdAt: doc.data().createdAt,
          title: doc.data().title,
          content: doc.data().content,
          tags: doc.data().tags,
          likes: doc.data().likes,
          dislikes: doc.data().dislikes,
          comments: doc.data().comments,
        });
      }
    });

    questions.value = results;
  } catch (err) {
    console.log(err);
    error.value = "Questions could not be fetched.";
  }

  return { questions, error };
};

export default getQuestions;
