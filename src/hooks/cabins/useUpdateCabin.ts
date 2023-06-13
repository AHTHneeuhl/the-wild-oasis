import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import { updateCabin } from "../../services/apiCabins";

const useUpdateCabin = () => {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotification();

  const { mutate: handleUpdateCabin, isLoading: isUpdating } = useMutation({
    mutationFn: updateCabin,
    onSuccess: () => {
      notifySuccess("Cabin updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error: Error) => notifyError(error.message),
  });

  return {
    handleUpdateCabin,
    isUpdating,
  };
};

export default useUpdateCabin;
