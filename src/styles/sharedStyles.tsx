"use client";
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

const Input = styled.input`
  padding: 1rem;
  outline: none;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  background: ${(p) => p.theme.input.background};
  color: ${(p) => p.theme.bodyFontColor};
  width: 100%;
  transition: 0.2s ease;

  &:hover,
  &:focus {
    box-shadow: ${(p) => p.theme.input.boxShadow};
    border: 2px solid ${(p) => p.theme.input.border};
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
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  width: 500px;

  @media (min-width: 992px) {
    padding: 1rem 3rem;
  }
`;

const LoginRegisterForm = styled.form`
  margin-bottom: 2rem;
`;

const FormFields = styled.fieldset`
  border: none;
  margin-bottom: 1rem;
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
  background: ${(p) => p.theme.button.background};
  color: white;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.1s;

  &:hover {
    background: ${(p) => p.theme.button.backgroundHover};
  }
`;
const GoogleSignInButton = styled(ButtonForm)`
  margin-top: 0.5rem;
  padding: 0.55rem 0;
  border: 2px solid ${(p) => p.theme.googleButton.border};
  background: ${(p) => p.theme.googleButton.background};
  color: ${(p) => p.theme.bodyFontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: ${(p) => p.theme.googleButton.backgroundHover};
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

const HomeForm = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  width: 100%;

  @media (min-width: 992px) {
    flex-direction: row;
  }
`;

const CancelButton = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #e47676;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s;

  &:hover {
    background: #dd5c5c;
  }
`;

const TaskRemaining = styled.p`
  font-weight: bold;
`;

const NoData = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;

  @media (min-width: 992px) {
    margin: 3rem 0;
  }
`;

const FormHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0 1.5rem 0;

  h3 {
    font-size: 1.15rem;
  }

  @media (min-width: 992px) {
    h3 {
      font-size: 1.5rem;
    }
  }
`;

const HeadDiv = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1rem;
    color: ${(p) => p.theme.home.secondary};
  }
`;

const TableContainer = styled.div`
  max-height: 600px;
  overflow: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(p) => p.theme.home.primaryTransparent};
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.home.primary};
    border-radius: 100px;
  }
`;

const Table = styled.div`
  width: 100%;
  border: 3px solid ${(p) => p.theme.home.primary};
  border-radius: 0.5rem;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid ${(p) => p.theme.home.primary};
  overflow-wrap: break-word;

  &:first-child {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    border-bottom: none;
  }
`;

const TaskContent = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 0.5rem 1rem;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: initial;
    text-align: initial;
    gap: 1rem;
  }
`;

const TaskButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 1rem 0.5rem 0;
  gap: 0.5rem;
  border-left: 2px solid ${(p) => p.theme.home.primary};
  padding-left: 0.5rem;

  @media (min-width: 992px) {
    flex-direction: row;
    margin: 0;
    margin-right: 1rem;
    gap: 1rem;
  }
`;

const TaskButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.bodyFontColor};
`;

const TaskDescription = styled.p<{ $complete: string | boolean }>`
  font-weight: ${(p) => (p.$complete ? "lighter" : "bold")};
  padding: 0 1rem;
  font-size: 1.2rem;
  text-decoration: ${(p) => (p.$complete ? "line-through" : "none")};
  text-decoration-thickness: 0.15rem;

  @media (min-width: 992px) {
    padding: 0;
  }
`;

const H1 = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  &::first-letter {
    text-transform: capitalize;
  }
`;

const ChangeNameForm = styled.form`
  width: 100%;

  @media (min-width: 992px) {
    width: 50%;
  }
`;

const ResetPasswordForm = styled(ChangeNameForm)`
  margin-top: 2rem;
`;

const SettingsFormFields = styled(FormFields)`
  display: flex;
  flex-direction: column;
`;

const SettingsInput = styled(Input)`
  width: 100%;

  &:read-only {
    cursor: default;
  }
`;

const SettingsStyledButton = styled(ButtonForm)`
  width: 100%;

  &:disabled {
    background: gray;
    cursor: not-allowed;
  }
`;

export {
  Container,
  Input,
  FormContainer,
  FormContent,
  LoginRegisterForm,
  FormFields,
  FormLabels,
  ButtonForm,
  GoogleSignInButton,
  SignUpSignIn,
  HomeForm,
  CancelButton,
  TaskRemaining,
  NoData,
  FormHeader,
  HeadDiv,
  TableContainer,
  Table,
  Task,
  TaskContent,
  TaskButtonsDiv,
  TaskButton,
  TaskDescription,
  H1,
  SettingsFormFields,
  SettingsInput,
  SettingsStyledButton,
  ChangeNameForm,
  ResetPasswordForm,
};
