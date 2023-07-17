import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase/config";

import { ChangeEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { poppins } from "@/app/fonts";

import PasswordInput from "../PasswordInput/PasswordInput";

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
import Alert from "../Alert";
import styled from "styled-components";
import formValidation from "@/helpers/formValidation";
import Loading from "../Loading";

const FieldsWrapper = styled.div`
  display: flex;
  gap: 1rem;

  fieldset:first-child {
    width: 40%;
  }
`;

const SuccessP = styled.p`
  text-align: center;
`;

const Login = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [alert, setAlert] = useState<{ msg: string; error: boolean }>({
    msg: "",
    error: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = formValidation(name, password, confirmPassword);

    if (error) {
      setAlert({
        msg: error,
        error: true,
      });

      setTimeout(() => {
        setAlert({ msg: "", error: false });
      }, 2000);

      return;
    }

    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccess(true);

        const user = userCredential.user;

        updateProfile(user, { displayName: name });

        setTimeout(() => {
          setIsLoading(false);
          setAlert({
            msg: "Account created successfully, check email for verify",
            error: false,
          });
        }, 2000);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          router.push("/");
        }, 5000);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          setSuccess(false);
          setAlert({
            msg: "The email address is already in use",
            error: true,
          });
        }, 2000);

        setTimeout(() => {
          setAlert({ msg: "", error: false });
        }, 5000);
      });
    return;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "name") {
      setName(e.target.value);
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
    }
  };

  return (
    <FormContainer>
      <FormContent>
        <h3>Register to Better To-Do List</h3>

        <Form onSubmit={handleSubmit} className={poppins.className}>
          <FieldsWrapper>
            <FormFields>
              <FormLabels htmlFor="name">Name</FormLabels>
              <Input required type="text" id="name" onChange={handleChange} />
            </FormFields>
            <FormFields>
              <FormLabels htmlFor="email">E-mail</FormLabels>
              <Input required type="email" id="email" onChange={handleChange} />
            </FormFields>
          </FieldsWrapper>

          <FormFields>
            <FormLabels htmlFor="password">Password</FormLabels>
            <PasswordInput setPassword={setPassword} />
          </FormFields>
          <FormFields>
            <FormLabels htmlFor="confirmPassword">Confirm Password</FormLabels>
            <PasswordInput setPassword={setConfirmPassword} $confirmPassword />
          </FormFields>
          {alert.msg && <Alert message={alert} />}

          {success && isLoading === false ? (
            <SuccessP>Redirect to home page...</SuccessP>
          ) : isLoading ? (
            <Loading />
          ) : (
            <>
              <ButtonForm type="submit" className={poppins.className}>
                Sign Up
              </ButtonForm>

              <SignUpSignIn>
                Already have an account? <Link href={"/"}>Sign In</Link>
              </SignUpSignIn>
            </>
          )}
        </Form>
      </FormContent>
    </FormContainer>
  );
};

export default Login;