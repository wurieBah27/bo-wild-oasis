import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/auth_API/apiAuth";

export const useUser = () => {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const isAuthenicated = user?.role === "authenticated";
  return { isLoading, user, isAuthenicated };
};
