import PropTypes from "prop-types";
import Stat from "./Stat";
import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

const Stats = ({ bookings, confirmedStays, numDays, cabinCounts }) => {
  const numBookings = bookings?.length;

  const sales = bookings?.reduce((acc, curr) => acc + curr.totalPrice, 0);

  const checkIns = confirmedStays?.length;

  const occupation = confirmedStays?.reduce(
    (acc, curr) => acc + curr.numNights,
    0
  );

  const occupationRate = (occupation / (numDays * cabinCounts)) * 100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${occupationRate.toFixed(2)}%`}
      />
    </>
  );
};

Stats.propTypes = {
  bookings: PropTypes.array,
  confirmedStays: PropTypes.array,
  numDays: PropTypes.number,
  cabinCounts: PropTypes.number,
};

export default Stats;
