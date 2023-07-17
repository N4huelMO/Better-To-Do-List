import { ChangeEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { poppins } from "@/app/fonts";

import google from "../../../public/img/google.svg";

import PasswordInput from "../PasswordInput/PasswordInput";

import { ForgotPasswordDiv, Hr } from "./Login.styles";

import {
  ButtonForm,
  FormContainer,
  FormContent,
  Form,
  FormFields,
  FormLabels,
  Input,
  SignUpSignIn,
} from "@/styles/sharedStyles";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth, provider } from "@/firebase/config";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email);
    console.log(password);
  };

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);

        const token = credential?.accessToken;

        const user = result.user;

        console.log(token);
        console.log(user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <FormContainer>
      <FormContent>
        <h3>Login to Better To-Do List</h3>

        <Form onSubmit={handleSubmit} className={poppins.className}>
          <FormFields>
            <FormLabels htmlFor="email">E-mail</FormLabels>
            <Input
              required
              type="email"
              id="email"
              onChange={handleChangeEmail}
            />
          </FormFields>

          <FormFields>
            <FormLabels htmlFor="password">Password</FormLabels>
            <PasswordInput setPassword={setPassword} />

            <ForgotPasswordDiv>
              <Link href={"/"}>Forgot Password?</Link>
            </ForgotPasswordDiv>
          </FormFields>

          <ButtonForm type="submit" className={poppins.className}>
            Sign In
          </ButtonForm>

          <SignUpSignIn>
            Don't have an account? <Link href={"/register"}>Sign Up</Link>
          </SignUpSignIn>
        </Form>

        <Hr />

        <ButtonForm
          onClick={() => {
            signInWithGoogle();
          }}
          className={poppins.className}
          $secondary
        >
          <Image src={google} height={40} width={40} alt="Google Image" />
          Sign in with Google
        </ButtonForm>
      </FormContent>
    </FormContainer>
  );
};

export default Login;
