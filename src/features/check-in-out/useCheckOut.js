import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/APIS/apiBookings";
import toast from "react-hot-toast";

export const useCheckOut = () => {
  const queryClient = useQueryClient();

  const { mutate: checkOut, isLoading: isCheckingOut } = useMutation({
    mutationFn: async ({ bookingID }) => {
      if (!bookingID) {
        throw new Error("Booking ID is undefined");
      }
      return updateBooking(bookingID, { status: "checked-out" });
    },

    onSuccess: (data) => {
      if (!data || !data.id) {
        throw new Error("Invalid data returned from updateBooking");
      }
      toast.success(`Checking out #${data.id} successful`);
      queryClient.invalidateQueries({ active: true });
    },

    onError: (error) => {
      toast.error(`CheckOut failed ${error.message}` || "An error occurred");
    },
  });

  return { checkOut, isCheckingOut };
};
