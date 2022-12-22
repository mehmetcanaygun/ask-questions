import { ref } from "vue";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { Question } from "../types";

type GetQuestionOptions = {
  userId?: string;
  lastItem?: Question;
  firstItem?: Question;
};

const getQuestions = async (options: GetQuestionOptions) => {
  const questions = ref<Question[]>([]);
  const error = ref<null | string>(null);

  let searchQuery;
  const dbRef = collection(db, "questions");
  const orderOption = orderBy("createdAt", "desc");

  // Default query
  searchQuery = query(dbRef, orderOption);

  // Query for user profile
  if (options?.userId) {
    searchQuery = query(dbRef, where("user.id", "==", options?.userId));
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
  } catch (err: any) {
    console.log(err.message);
    error.value = "Questions could not be fetched.";
  }

  return { questions, error };
};

export default getQuestions;
