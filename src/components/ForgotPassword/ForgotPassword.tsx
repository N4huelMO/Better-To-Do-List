import {
  ButtonForm,
  LoginRegisterForm,
  FormContainer,
  FormContent,
  FormFields,
  FormLabels,
  Input,
  FormHeader,
} from "@/styles/sharedStyles";
import React, { ChangeEvent } from "react";
import { poppins } from "@/app/fonts";
import styled from "styled-components";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import Alert from "../Alert";
import { useAppContext } from "@/context/AppProvider";

const StyledLinkContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: underline;
`;

const ForgotPassword = () => {
  const { email, setEmail, alert, setAlert } = useAppContext();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setEmail("");

        setAlert({
          msg: "Check your email for reset password",
          error: false,
        });

        setTimeout(() => {
          setAlert({ msg: "", error: false });
        }, 3000);
      })
      .catch((error) => {
        setAlert({
          msg: "The email provided doesn't exist",
          error: true,
        });

        setTimeout(() => {
          setAlert({ msg: "", error: false });
        }, 3000);
      });
  };

  return (
    <FormContainer>
      <FormContent>
        <LoginRegisterForm onSubmit={handleSubmit}>
          <FormHeader>
            <h3>Forgot Password</h3>
          </FormHeader>

          <FormFields>
            <FormLabels htmlFor="email">E-mail</FormLabels>
            <Input
              required
              type="email"
              id="email"
              value={email}
              onChange={handleChangeEmail}
            />
          </FormFields>

          {alert.msg && <Alert message={alert} />}

          <ButtonForm type="submit" className={poppins.className}>
            Reset Password
          </ButtonForm>

          <StyledLinkContainer>
            <StyledLink href={"/"}>Back to Sign In</StyledLink>
          </StyledLinkContainer>
        </LoginRegisterForm>
      </FormContent>
    </FormContainer>
  );
};

export default ForgotPassword;
