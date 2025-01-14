import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/auth_API/apiAuth";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: loginUser,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),

    onSuccess: (data) => {
      toast.success(`${data.user.email} Login successful`);
      queryClient.setQueryData(["user"], data?.user);
      navigate("/dashboard", { replace: true });
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });

  return { loginUser, isLoading, isError };
};
