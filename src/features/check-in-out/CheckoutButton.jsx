import PropTypes from "prop-types";
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

function CheckoutButton({ bookingID }) {
  const { checkOut, isCheckingOut } = useCheckOut();
  console.log(bookingID);
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut({ bookingID: bookingID })}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

CheckoutButton.propTypes = {
  bookingID: PropTypes.any,
};

export default CheckoutButton;
