import styled from "styled-components";

import Spinner from "../../ui/Spinner";
import PageNotFound from "../../pages/PageNotFound";
import CabinRow from "./CabinRow";
import useCabins from "./cabins_hooks/useCabins";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;

const CabinTable = () => {
  const { cabins } = useCabins();
  const { data, isLoading, error } = cabins;

  if (isLoading) return <Spinner />;
  if (error) return <PageNotFound />;
  return (
    <Table>
      <TableHeader>
        <div>img</div>
        <div>Cabins</div>
        <div>capacity</div>
        <div>price</div>
        <div>discount</div>
        <div>xx</div>
      </TableHeader>

      {data.map((cabin) => (
        <CabinRow cabin={cabin} key={cabin.id} />
      ))}
    </Table>
  );
};

export default CabinTable;
