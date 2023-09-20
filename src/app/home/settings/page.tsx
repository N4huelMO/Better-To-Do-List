"use client";

import { useEffect, useState } from "react";

import styled from "styled-components";

import useAuth from "@/helpers/useAuth";

import { HeadDiv } from "@/styles/sharedStyles";

import ChangeName from "@/components/ChangeName";
import ResetPassword from "@/components/ResetPassword";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SettingsPage = () => {
  const { currentUser } = useAuth();

  const [provider, setProvider] = useState<string>("");

  const GOOGLE_PROVIDER = "google.com";

  useEffect(() => {
    setProvider(currentUser?.providerData[0].providerId ?? "");
  }, [currentUser]);

  return (
    <>
      <HeadDiv>
        <h1>Settings</h1>

        <h4>
          Change your name and if you login with email and password,you can
          change the password
        </h4>
      </HeadDiv>

      <Container>
        <ChangeName />

        {provider !== GOOGLE_PROVIDER && <ResetPassword />}
      </Container>
    </>
  );
};

export default SettingsPage;
