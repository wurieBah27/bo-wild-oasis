import { useMutation, useQueryClient } from "@tanstack/react-query";
import { create_Edit_Cabin } from "../../../services/APIS/apiCabins";
import toast from "react-hot-toast";

const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: create_Edit_Cabin,
    onSuccess: () => {
      toast.success("New cabin successfully created!");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
};

export default useCreateCabin;
