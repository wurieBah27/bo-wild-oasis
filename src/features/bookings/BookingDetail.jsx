import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useBooking from "./bookings_hooks/useBooking";
import { useNavigate } from "react-router-dom";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { HiTrash } from "react-icons/hi";
import { useDeleteBooking } from "./bookings_hooks/useDeleteBooking";
import { confirmDeleteBooking } from "./confirmDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkOut, isCheckingOut } = useCheckOut();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  // const status = "checked-in";

  if (!booking) return null;

  const { status, id: bookingID } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingID}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {!booking?.isPaid && (
          <Button onClick={() => navigate(`/checkin/${bookingID}`)}>
            <HiArrowDownOnSquare /> Check in
          </Button>
        )}
        <Button
          variation="danger"
          disabled={isDeleting}
          onClick={() =>
            confirmDeleteBooking(bookingID, deleteBooking, navigate)
          }
        >
          <HiTrash /> Delete Booking
        </Button>

        {status === "checked-in" && (
          <Button
            disabled={isCheckingOut}
            onClick={() => checkOut({ bookingID })} // Use checkOut function here
          >
            <HiArrowUpOnSquare /> Check out
          </Button>
        )}

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
