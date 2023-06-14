import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import { deleteBooking } from "@/services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotification();

  const { isLoading: isDeleting, mutate: handleDeleteBooking } = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      notifySuccess("Booking deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (error: Error) => notifyError(error.message),
  });

  return { isDeleting, handleDeleteBooking };
}

export default useDeleteBooking;
