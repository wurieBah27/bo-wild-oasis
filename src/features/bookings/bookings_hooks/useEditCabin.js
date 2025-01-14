import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { create_Edit_Cabin } from "../../../services/APIS/apiCabins";

const useEditCabin = () => {
  /* Update the UI with React-Query */
  const queryClient = useQueryClient();

  /* Edit cabin query */
  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id, supaIm }) =>
      create_Edit_Cabin(newCabinData, id, supaIm),
    onSuccess: () => {
      toast.success("New cabin edited successfully!");
      queryClient.invalidateQueries({ queryKey: ["cabin"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
};

export default useEditCabin;
