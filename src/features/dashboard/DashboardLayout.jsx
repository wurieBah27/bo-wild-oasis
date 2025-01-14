import styled from "styled-components";
import useRecentBookings from "./dashboard_hooks/useRecentBookings";
import useRecentStays from "./dashboard_hooks/useRecentStays";
import Stats from "./Stats";
import Spinner from "../../ui/Spinner";
import useCabins from "../cabins/cabins_hooks/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

const DashboardLayout = () => {
  const { isLoading, bookings } = useRecentBookings();

  const { isLoading: loadingStays, confirmedStays, numDays } = useRecentStays();

  // console.log(stays);

  const { cabins } = useCabins();
  const { data } = cabins;

  if (isLoading || loadingStays) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCounts={data?.length}
      />
      <Today />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
};

export default DashboardLayout;
