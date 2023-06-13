import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import useNotification from "../useNotification";

const useCreateCabin = () => {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotification();

  const { mutate: handleCreateCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      notifySuccess("Cabin created successfully");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => notifyError(error.message),
  });

  return {
    handleCreateCabin,
    isCreating,
  };
};

export default useCreateCabin;
