import toast from "react-hot-toast";
import { logout } from "../../../services/auth_API/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logoutFunc, isLoading: isLoggingOut } = useMutation({
    mutationFn: logout,

    onSuccess: () => {
      toast.success("You have been logged out");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error("An error occurred. Please try again" + err?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries("user");
    },
  });

  return { logoutFunc, isLoggingOut };
};
