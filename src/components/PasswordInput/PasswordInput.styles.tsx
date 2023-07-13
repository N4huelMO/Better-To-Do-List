import styled from "styled-components";

const PasswordInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ToggleButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0px;
  top: 0px;
  bottom: 0px;
`;

const ToggleButton = styled.button`
  margin-right: 0.5rem;
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  background: transparent;
  transition-duration: 0.2s;
  border-radius: 0.5rem;
  padding: 0.5rem;

  &:hover {
    background-color: #bae6fd;
  }
`;

export { PasswordInputWrapper, ToggleButtonWrapper, ToggleButton };
