import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/APIS/apiBookings";

export const useTodayActivity = () => {
  const { isLoading, data: stays } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["todays-activity"],
  });

  return { isLoading, stays };
};
