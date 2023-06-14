import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "@/services/apiBookings";
import useNotification from "../useNotification";

const useCheckout = () => {
  const queryClient = useQueryClient();
  const { notifyError, notifySuccess } = useNotification();

  const { mutate: handleCheckout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      notifySuccess(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries();
    },

    onError: () => notifyError("There was an error while checking out"),
  });

  return { handleCheckout, isCheckingOut };
};

export default useCheckout;
