import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { poppins } from "@/app/fonts";

import google from "../../../public/img/google.svg";

import PasswordInput from "../PasswordInput/PasswordInput";

import { ForgotPasswordDiv, Hr } from "./Login.styles";

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("test");
  };

  return (
    <FormContainer>
      <FormContent>
        <h3>Login to Better To-Do List</h3>

        <Form onSubmit={handleSubmit} className={poppins.className}>
          <FormFields>
            <FormLabels htmlFor="email">E-mail</FormLabels>
            <Input required type="email" id="email" />
          </FormFields>

          <FormFields>
            <FormLabels htmlFor="password">Password</FormLabels>
            <PasswordInput setPassword={setPassword} />

            <ForgotPasswordDiv>
              <Link href={"/"}>Forgot Password?</Link>
            </ForgotPasswordDiv>
          </FormFields>

          <ButtonSubmit className={poppins.className}>Sign In</ButtonSubmit>

          <SignUpSignIn>
            Don't have an account? <Link href={"/register"}>Sign Up</Link>
          </SignUpSignIn>
        </Form>

        <Hr />

        <ButtonSubmit className={poppins.className} $secondary>
          <Image src={google} height={40} width={40} alt="Google Image" />
          Sign in with Google
        </ButtonSubmit>
      </FormContent>
    </FormContainer>
  );
};

export default Login;
