import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "@/services/apiBookings";
import useNotification from "../useNotification";

const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { notifyError, notifySuccess } = useNotification();

  const { mutate: handleCheckin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      notifySuccess(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries();
      navigate("/");
    },

    onError: () => notifyError("There was an error while checking in"),
  });

  return { handleCheckin, isCheckingIn };
};

export default useCheckin;
