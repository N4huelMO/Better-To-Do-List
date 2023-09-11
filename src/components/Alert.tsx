import { AlertProps } from "@/interfaces/interfaces";
import React from "react";
import styled from "styled-components";

const ContainerAlert = styled.div<{ $secondary?: boolean; $error: boolean }>`
  background: ${(p) => (p.$error ? "#fecaca" : "#a7f3d0")};
  text-align: center;
  font-size: 0.8rem;
  padding: 1rem 0;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  color: ${(p) => (p.$error ? "#7f1d1d" : "#064e3b")};
  font-weight: bold;
  width: ${(p) => (p.$secondary ? "40%" : "100%")};
`;

const Alert = ({ message, secondary }: AlertProps) => {
  const { msg, error } = message;

  return (
    <ContainerAlert $secondary={secondary} $error={error}>
      {msg}
    </ContainerAlert>
  );
};

export default Alert;
