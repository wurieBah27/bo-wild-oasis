import toast from "react-hot-toast";
import { createUser } from "../../../services/auth_API/apiAuth";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const {
    mutate: signUpUser,
    isLoading: isSigningUpUser,
    isError,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast.success("User created successfully");
    },
    onError: (error) => {
      toast.error("An error occurred. Please try again" + error?.message);
    },
  });

  return { signUpUser, isSigningUpUser, isError };
};
