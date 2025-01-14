import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../../services/APIS/apiSettings";
import toast from "react-hot-toast";

const useEditSettings = () => {
  const queryClient = useQueryClient();

  const { mutate: editSettings, isLoading: isEditingSettings } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings edited successfully!");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: () =>
      toast.error("An  Error occured while updating, please try again!"),
  });
  return { editSettings, isEditingSettings };
};

export default useEditSettings;
