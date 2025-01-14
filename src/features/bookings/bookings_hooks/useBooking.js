import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../../services/APIS/apiBookings";

const useBooking = () => {
  const { bookingID } = useParams();

  const {
    data: booking,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["booking", bookingID],
    queryFn: () => getBooking(bookingID),
  });

  return { booking, error, isLoading };
};

export default useBooking;
