import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { TSignIn, signIn } from "../../services/apiAuth";
import useNotification from "../useNotification";

const useSignIn = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { notifyError } = useNotification();

  const { mutate: handleSignIn, isLoading } = useMutation({
    mutationFn: ({ email, password }: TSignIn) => signIn({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      console.log("ERROR", error);
      notifyError("Provided email or password are incorrect");
    },
  });

  return { handleSignIn, isLoading };
};

export default useSignIn;
