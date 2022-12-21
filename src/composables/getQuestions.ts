import { ref } from "vue";
import {
  collection,
  query,
  where,
  getDocs,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { Question } from "../types";

const getQuestions = async (userId?: string) => {
  const questions = ref<Question[]>([]);
  const error = ref<null | string>(null);

  let searchQuery = collection(db, "questions");

  if (userId) {
    searchQuery = query(
      collection(db, "questions"),
      where("user.id", "==", userId)
    ) as CollectionReference<DocumentData>;
  }

  try {
    const querySnapshot = await getDocs(searchQuery);

    let results: Question[] = [];

    querySnapshot.forEach((doc) => {
      if (doc.data().createdAt) {
        results.push({
          id: doc.id,
          user: doc.data().user,
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
