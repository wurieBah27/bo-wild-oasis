import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../../services/APIS/apiSettings";

const useSettings = () => {
  const {
    isLoading,
    error,
    data: settingsData,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return { isLoading, error, settingsData };
};

export default useSettings;
