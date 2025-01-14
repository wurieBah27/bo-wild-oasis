import styled from "styled-components";
import { useUser } from "../features/authentication/Auth_Hooks/useUser";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-grey-50);
`;

const ProtectedRoutes = ({ children }) => {
  // 1: Load the authenticated user
  const { isLoading, isAuthenicated } = useUser();
  const navigate = useNavigate();

  // 3: If the user is not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenicated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenicated, isLoading, navigate]);

  // 2: while loading, render ther loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4: If the user is authenticated, render the children

  if (isAuthenicated) return <>{children}</>;
};
ProtectedRoutes.propTypes = {
  children: PropTypes.node,
};

export default ProtectedRoutes;
