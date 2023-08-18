"use client";
import { Theme } from "@/helpers/constants";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const Input = styled.input<{ $secondary?: boolean }>`
  padding: ${(p) => (p.$secondary ? "0.7rem 1rem" : "1rem")};
  outline: none;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#e0f2fe" : "#404040")};
  color: ${(p) => p.theme.bodyFontColor};
  width: ${(p) => (p.$secondary ? "40%" : "100%")};
  transition: 0.3s ease;

  &:hover,
  &:focus {
    box-shadow: ${(p) =>
      p.theme.id != Theme.Dark
        ? " rgba(0, 0, 0, 0.1) 0px 0px 5px 0px,  rgba(0, 0, 0, 0.1) 0px 0px 1px 0px"
        : "rgb(54, 54, 54) 0px 0px 5px 0px, rgb(54, 54, 54) 0px 0px 1px 0px"};
    border: 2px solid
      ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#737373")};
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

const ButtonForm = styled.button`
  width: 100%;
  margin-top: 0;
  padding: 1rem 0;
  border-radius: 0.5rem;
  border: transparent;
  text-transform: uppercase;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#0284c7" : "#525252")};
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#0369a1" : "#404040")};
  }
`;
const GoogleSignInButton = styled(ButtonForm)`
  margin-top: 0.5rem;
  padding: 0.55rem 0;
  border: 2px solid ${(p) => (p.theme.id != Theme.Dark ? "#0369a1" : "#262626")};
  background: ${(p) => (p.theme.id != Theme.Dark ? "#e0f2fe" : "#525252")};
  color: ${(p) => p.theme.bodyFontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#404040")};
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
  ButtonForm,
  GoogleSignInButton,
  SignUpSignIn,
};
