import styled from "styled-components";

import Alert from "./Alert";

import { useState } from "react";

import userAuth from "@/helpers/userAuth";

import { useAppContext } from "@/context/AppProvider";

import { useRouter } from "next/navigation";

import { auth } from "@/firebase/config";

import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";

import {
  ChangeNameForm,
  FormLabels,
  SettingsFormFields,
  SettingsInput,
  SettingsStyledButton,
} from "@/styles/sharedStyles";

const ResetPasswordForm = styled(ChangeNameForm)`
  margin-top: 2rem;
`;

const ResetPassword = () => {
  const { currentUser } = userAuth();

  const { alert, setAlert } = useAppContext();

  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmitChangePassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    let credentials;

    if (currentUser?.email) {
      credentials = EmailAuthProvider.credential(
        currentUser?.email,
        currentPassword
      );
    }

    try {
      if (currentUser && credentials) {
        await reauthenticateWithCredential(currentUser, credentials);
      }
    } catch (error) {
      setAlert({
        msg: "The password is incorrect",
        error: true,
      });

      setTimeout(() => {
        setAlert({ msg: "", error: false });
      }, 3000);

      return;
    }

    if (currentUser) {
      updatePassword(currentUser, newPassword)
        .then(() => {
          setAlert({
            msg: "Your password has been changed successfully",
            error: false,
          });

          setTimeout(() => {
            setAlert({ msg: "", error: false });
          }, 3000);
        })
        .catch((error) => {
          setAlert({
            msg: "Password must have at least 6 characters",
            error: true,
          });

          setTimeout(() => {
            setAlert({ msg: "", error: false });
          }, 3000);
        });
      return;
    }

    setTimeout(() => {
      router.push("/");
      signOut(auth);
    }, 2000);
  };

  return (
    <ResetPasswordForm onSubmit={handleSubmitChangePassword}>
      {alert.msg && <Alert message={alert} />}

      <SettingsFormFields>
        <FormLabels htmlFor="currentPassword">Current Password</FormLabels>
        <SettingsInput
          value={currentPassword}
          onChange={handleChangePassword}
          id="currentPassword"
        />
      </SettingsFormFields>

      <SettingsFormFields>
        <FormLabels htmlFor="newPassword">New Password</FormLabels>
        <SettingsInput
          value={newPassword}
          onChange={handleNewPassword}
          id="newPassword"
        />
      </SettingsFormFields>

      <SettingsFormFields>
        <FormLabels htmlFor="confirmNewPassword">
          Confirm New Password
        </FormLabels>
        <SettingsInput
          value={confirmNewPassword}
          onChange={handleConfirmNewPassword}
          id="confirmNewPassword"
        />
      </SettingsFormFields>

      <SettingsStyledButton
        disabled={
          currentPassword == "" || newPassword == "" || confirmNewPassword == ""
        }
      >
        Change password
      </SettingsStyledButton>
    </ResetPasswordForm>
  );
};

export default ResetPassword;
