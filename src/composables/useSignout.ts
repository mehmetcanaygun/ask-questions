import { ref } from "vue";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";

const error = ref<null | string>(null);

const signout = async () => {
  error.value = null;

  try {
    await signOut(auth);
  } catch (err) {
    console.log(err);
    error.value = "Error at log out.";
  }
};

const useSignout = () => {
  return { error, signout };
};

export default useSignout;
