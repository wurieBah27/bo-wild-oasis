import PropTypes from "prop-types";
import styled from "styled-components";

const FormVerticalStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 1.2rem 0;
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;
const FormRowVertical = ({ children, label, error }) => {
  return (
    <FormVerticalStyled>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </FormVerticalStyled>
  );
};
FormRowVertical.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  error: PropTypes.any,
};

export default FormRowVertical;
