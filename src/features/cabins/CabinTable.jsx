import Spinner from "../../ui/Spinner";
import PageNotFound from "../../pages/PageNotFound";
import CabinRow from "./CabinRow";
import useCabins from "./cabins_hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { cabins } = useCabins();
  const { data, isLoading, error } = cabins;
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("discount") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  let filteredCabins;

  if (filterValue === "all") filteredCabins = data;
  if (filterValue === "no-discount")
    filteredCabins = data.filter((cabin) => cabin.discount === 0);

  if (filterValue === "with-discount")
    filteredCabins = data.filter((cabin) => cabin.discount > 0);

  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) return <Spinner />;
  if (error) return <PageNotFound />;
  if (!data.length) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div>img</div>
          <div>Cabins</div>
          <div>capacity</div>
          <div>price</div>
          <div>discount</div>
          <div>xx</div>
        </Table.Header>

        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
