import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import useNotification from "../useNotification";

const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotification();

  const { isLoading: isUpdating, mutate: handleUpdateSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      notifySuccess("Settings updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error: Error) => notifyError(error.message),
  });
  return {
    isUpdating,
    handleUpdateSettings,
  };
};

export default useUpdateSettings;
