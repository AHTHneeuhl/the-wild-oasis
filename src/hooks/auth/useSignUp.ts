import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth";
import useNotification from "../useNotification";

const useSignup = () => {
  const { notifySuccess } = useNotification();

  const { mutate: handleSignUp, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      notifySuccess(
        "Account created successfully! Please verify the account from the user's email address."
      );
    },
  });

  return { handleSignUp, isLoading };
};

export default useSignup;
