import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/APIS/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: ({ bookingID, breakfast }) => {
      if (!bookingID) {
        throw new Error("Booking ID is undefined");
      }
      return updateBooking(bookingID, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      });
    },

    onSuccess: (data) => {
      toast.success(`Checkin #${data?.id} successful`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },

    onError: (error) => {
      toast.error(`Checkin failed ${error.message}` || "An error occurred");
    },
  });

  return { checkin, isCheckingIn };
};
