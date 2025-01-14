import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "../bookings/bookings_hooks/useBooking";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import useSettings from "../settings/settings_hooks/useSettings";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmedPaid, setConfirmedPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  const { checkin, isCheckingIn } = useCheckin();
  const { settingsData, isLoading: isloadingSettings } = useSettings();

  const { breakfastPrice } = settingsData || {};
  useEffect(
    () => setConfirmedPaid(booking?.isPaid ?? false),
    [booking?.isPaid]
  );

  // const booking = {};
  if (isLoading || isloadingSettings) return <Spinner />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice = addBreakfast
    ? numGuests * numNights * breakfastPrice
    : 0;
  const total = totalPrice + optionalBreakfastPrice;

  function handleCheckin() {
    if (!confirmedPaid) return;

    if (addBreakfast) {
      checkin({
        bookingID: bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: total,
        },
      });
    } else {
      checkin({ bookingID: bookingId, breakfast: {} });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((prev) => !prev);
              setConfirmedPaid(false);
            }}
            id="addBreakfast"
            disabled={isCheckingIn}
          >
            Add breakfast for {numGuests} guests for {numNights} nights for an
            additional €{optionalBreakfastPrice.toFixed(2)}.
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmedPaid}
          onChange={() => setConfirmedPaid((prev) => !prev)}
          disabled={confirmedPaid || isCheckingIn}
          id="confirmedPaid"
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {`${formatCurrency(total.toFixed(2))}`} CASH 💵.
        </Checkbox>
      </Box>

      <ButtonGroup>
        {confirmedPaid && (
          <Button onClick={handleCheckin} disabled={isCheckingIn}>
            Check in booking #{bookingId}
          </Button>
        )}{" "}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
