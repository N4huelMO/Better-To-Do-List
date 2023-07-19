import {
  ButtonForm,
  Form,
  FormContainer,
  FormContent,
  FormFields,
  FormLabels,
  Input,
} from "@/styles/sharedStyles";
import React, { ChangeEvent, useState } from "react";
import { poppins } from "@/app/fonts";
import { styled } from "styled-components";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import Alert from "../Alert";

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
  const [email, setEmail] = useState<string>("");
  const [alert, setAlert] = useState<{ msg: string; error: boolean }>({
    msg: "",
    error: false,
  });

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
        <Form onSubmit={handleSubmit}>
          <h3>Forgot Password</h3>

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
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default ForgotPassword;
