import { getBooking } from "@/services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useBooking = () => {
  const { bookingId } = useParams();

  const {
    isLoading,
    error,
    data: booking,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId as string),
    retry: false,
  });

  return {
    isLoading,
    error,
    booking,
  };
};

export default useBooking;
