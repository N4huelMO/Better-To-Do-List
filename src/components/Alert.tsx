import React from "react";
import styled from "styled-components";

interface Props {
  message: { msg: string; error: boolean };
}

const Container = styled.div<{ $error: boolean }>`
  background: ${(p) => (p.$error ? "#fecaca" : "#a7f3d0")};
  text-align: center;
  font-size: 0.8rem;
  padding: 1rem 0;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  color: ${(p) => (p.$error ? "#7f1d1d" : "#064e3b")};
  font-weight: bold;
`;

const Alert = ({ message }: Props) => {
  const { msg, error } = message;

  return <Container $error={error}>{msg}</Container>;
};

export default Alert;
