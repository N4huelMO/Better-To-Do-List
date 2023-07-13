import { useState } from "react";
import Link from "next/link";

import { poppins } from "@/app/fonts";

import PasswordInput from "../PasswordInput/PasswordInput";

import {
  ButtonSubmit,
  FormContainer,
  FormContent,
  Form,
  FormFields,
  FormLabels,
  Input,
  SignUpSignIn,
} from "@/styles/sharedStyles";

const Login = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("test");
  };

  return (
    <FormContainer>
      <FormContent>
        <h3>Register to Better To-Do List</h3>

        <Form onSubmit={handleSubmit} className={poppins.className}>
          <FormFields>
            <FormLabels htmlFor="email">E-mail</FormLabels>
            <Input required type="email" id="email" />
          </FormFields>

          <FormFields>
            <FormLabels htmlFor="password">Password</FormLabels>
            <PasswordInput setPassword={setPassword} />
          </FormFields>
          <FormFields>
            <FormLabels htmlFor="confirmPassword">Confirm Password</FormLabels>
            <PasswordInput setPassword={setConfirmPassword} $confirmPassword />
          </FormFields>

          <ButtonSubmit type="submit" className={poppins.className}>
            Sign Up
          </ButtonSubmit>

          <SignUpSignIn>
            Already have an account? <Link href={"/"}>Sign In</Link>
          </SignUpSignIn>
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default Login;
