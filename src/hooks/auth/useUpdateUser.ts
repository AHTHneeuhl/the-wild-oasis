import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import useNotification from "../useNotification";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotification();

  const { mutate: handleUpdateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      notifySuccess("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (error: Error) => notifyError(error.message),
  });

  return { handleUpdateUser, isUpdating };
};

export default useUpdateUser;
