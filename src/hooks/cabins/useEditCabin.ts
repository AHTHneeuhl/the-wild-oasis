import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import { createEditCabin } from "@/services/apiCabins";

const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { notifyError, notifySuccess } = useNotification();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      notifySuccess("Cabin successfully edited");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (error: Error) => notifyError(error.message),
  });

  return { isEditing, editCabin };
};

export default useEditCabin;
