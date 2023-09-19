import userAuth from "@/helpers/userAuth";

import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";

import {
  ChangeNameForm,
  FormLabels,
  SettingsFormFields,
  SettingsInput,
  SettingsStyledButton,
} from "@/styles/sharedStyles";

const ChangeName = () => {
  const { currentUser } = userAuth();

  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value.trimStart());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentUser) {
      updateProfile(currentUser, {
        displayName: displayName.replace(/\s+/g, " ").trimEnd(),
      });
    }

    window.location.reload();
  };

  useEffect(() => {
    setDisplayName(currentUser?.displayName ?? "");
    setEmail(currentUser?.email ?? "");
  }, [currentUser]);

  return (
    <ChangeNameForm onSubmit={handleSubmit}>
      <SettingsFormFields>
        <FormLabels htmlFor="name">Name</FormLabels>
        <SettingsInput
          required
          value={displayName}
          onChange={handleChange}
          id="name"
        />
      </SettingsFormFields>

      <SettingsFormFields>
        <FormLabels htmlFor="email">Email</FormLabels>
        <SettingsInput value={email} id="email" type="email" readOnly />
      </SettingsFormFields>

      <SettingsStyledButton
        disabled={displayName == currentUser?.displayName || displayName == ""}
      >
        Apply
      </SettingsStyledButton>
    </ChangeNameForm>
  );
};

export default ChangeName;
