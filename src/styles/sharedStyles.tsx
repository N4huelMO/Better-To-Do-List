"use client";
import styled from "styled-components";

interface ButtonProps {
  $secondary?: boolean;
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const Input = styled.input`
  padding: 1rem;
  outline: none;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: ${(p) =>
    p.theme.id === "dark" ? `${p.theme.secondaryColor}` : "#e0f2fe"};
  color: ${(p) => p.theme.bodyFontColor};
  width: 100%;
  transition: 0.2s ease;

  &:hover,
  &:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;

    border: 1px solid #bae6fd;
  }
`;

const FormContainer = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: normal;
  justify-content: center;

  @media (min-width: 992px) {
    align-items: center;
  }
`;

const FormContent = styled.div`
  padding: 1rem 2rem;
  border-radius: 1rem;
  width: 500px;

  h3 {
    font-size: 1.3rem;
    margin: 1rem 0 1.5rem 0;
  }

  @media (min-width: 992px) {
    padding: 1rem 3rem;

    h3 {
      font-size: 1.5rem;
    }
  }
`;

const Form = styled.form`
  margin-bottom: 2rem;
`;

const FormFields = styled.fieldset`
  border: none;
  margin-bottom: 2rem;
`;

const FormLabels = styled.label`
  font-weight: bold;
  display: inline-block;
  margin: 0 0 0.2rem 0.5rem;
`;

const ButtonSubmit = styled.button<ButtonProps>`
  width: 100%;
  margin-top: ${(p) => (p.$secondary ? "0.5rem" : "0")};
  padding: ${(p) => (p.$secondary ? "0.55rem 0" : "1rem 0")};
  border-radius: 0.5rem;
  border: ${(p) => (p.$secondary ? "2px solid #0c4a6e" : "transparent")};
  background: ${(p) => (p.$secondary ? "#e0f2fe" : "#0362a1")};
  color: ${(p) => (p.$secondary ? "black" : "white")};
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${(p) => (p.$secondary ? "#bae6fd" : "#082f49")};
  }
`;

const SignUpSignIn = styled.p`
  text-align: center;
  margin-top: 0.5rem;

  a {
    font-weight: 700;
    text-decoration: underline;
  }
`;

export {
  Container,
  Input,
  FormContainer,
  FormContent,
  Form,
  FormFields,
  FormLabels,
  ButtonSubmit,
  SignUpSignIn,
};
