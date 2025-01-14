import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../../services/auth_API/apiAuth";
import toast from "react-hot-toast";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: ({ user }) => {
      toast.success(`User was updated successfully`);
      // queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.setQueryData(["user"], user);
    },

    onError: (err) => toast.error(`Failed to update user, ${err.message}`),
  });

  return { updateUser, isUpdatingUser };
};

export default useUpdateUser;
