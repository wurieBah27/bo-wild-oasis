import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../../services/APIS/apiCabins";

const useCabins = () => {
  const cabins = useQuery({
    queryKey: ["cabin"],
    queryFn: getCabins,
  });
  return { cabins };
};

export default useCabins;
