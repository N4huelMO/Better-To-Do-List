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
  LoginRegisterForm,
  FormFields,
  FormLabels,
  Input,
  SignUpSignIn,
  GoogleSignInButton,
  FormHeader,
} from "@/styles/sharedStyles";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { auth, provider } from "@/firebase/config";
import Alert from "../Alert";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppProvider";
import ToggleButtonMenu from "../ToggleMenu";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    alert,
    setAlert,
    isLoading,
    setIsLoading,
  } = useAppContext();

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        setIsLoading(false);

        router.push("/home");
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
          setAlert({
            msg: "The information sent is not incorrect",
            error: true,
          });
        }, 2000);

        setTimeout(() => {
          setAlert({ msg: "", error: false });
        }, 5000);
      });
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        router.push("/home");
      })
      .catch((error) => {
        GoogleAuthProvider.credentialFromError(error);
      });
  };

  return (
    <FormContainer>
      <FormContent>
        <FormHeader>
          <h3>Login to Better To-Do List</h3>

          <ToggleButtonMenu />
        </FormHeader>

        <LoginRegisterForm
          onSubmit={handleSubmit}
          className={poppins.className}
        >
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
              <Link href={"/forgot-password"}>Forgot Password?</Link>
            </ForgotPasswordDiv>
          </FormFields>

          {alert.msg && <Alert message={alert} />}

          {isLoading ? (
            <Loading />
          ) : (
            <>
              <ButtonForm type="submit" className={poppins.className}>
                Sign In
              </ButtonForm>
              <SignUpSignIn>
                Don&apos;t have an account?{" "}
                <Link href={"/register"}>Sign Up</Link>
              </SignUpSignIn>
            </>
          )}
        </LoginRegisterForm>

        <Hr />

        <GoogleSignInButton
          onClick={() => {
            signInWithGoogle();
          }}
          className={poppins.className}
        >
          <Image src={google} height={40} width={40} alt="Google Image" />
          Sign in with Google
        </GoogleSignInButton>
      </FormContent>
    </FormContainer>
  );
};

export default Login;
