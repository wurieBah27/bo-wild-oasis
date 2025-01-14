import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./Auth_Hooks/useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

const Logout = () => {
  const { logoutFunc, isLoggingOut } = useLogout();
  return (
    <ButtonIcon disabled={isLoggingOut} onClick={logoutFunc}>
      {!isLoggingOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
};

export default Logout;
