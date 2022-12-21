import { ref } from "vue";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";

const error = ref<null | string>(null);

const signup = async (email: string, username: string, password: string) => {
  error.value = null;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (!res) {
      throw new Error("Could not complete the signup");
    }

    await updateProfile(res.user, { displayName: username });
    error.value = null;

    return res;
  } catch (err: any) {
    console.log(err.message);
    error.value = err.message;
  }
};

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
