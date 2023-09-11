import { ChangeEvent, useState } from "react";

import Image from "next/image";

import hide from "../../../public/img/hide.svg";
import show from "../../../public/img/show.svg";

import {
  PasswordInputWrapper,
  ToggleButton,
  ToggleButtonWrapper,
} from "./PasswordInput.styles";

import { Input } from "@/styles/sharedStyles";
import { PasswordInputProps } from "@/interfaces/interfaces";

const PasswordInput = ({
  setPassword,
  $confirmPassword,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [clickShowPassword, setClickShowPassword] = useState(false);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <PasswordInputWrapper>
        <Input
          {...{ type: showPassword ? "text" : "password" }}
          id={$confirmPassword ? "confirmPassword" : "password"}
          required
          onChange={handlePasswordChange}
        />

        <ToggleButtonWrapper>
          <ToggleButton
            type="button"
            onClick={() => {
              setShowPassword((s) => !s);
              setClickShowPassword(true);
            }}
          >
            <Image
              className={clickShowPassword ? "bounce" : ""}
              onAnimationEnd={() => setClickShowPassword(false)}
              src={showPassword ? show : hide}
              width={20}
              height={20}
              alt="hide and show"
            />
          </ToggleButton>
        </ToggleButtonWrapper>
      </PasswordInputWrapper>
    </>
  );
};

export default PasswordInput;
