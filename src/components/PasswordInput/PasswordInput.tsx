import { ChangeEvent, useState } from "react";

import Image from "next/image";

import hide from "../../../public/img/hide.svg";
import show from "../../../public/img/show.svg";

import {
  PasswordInputWrapper,
  ToggleButton,
  ToggleButtonWrapper,
} from "./PasswordInput.styles";

import { Dispatch, SetStateAction } from "react";
import { Input } from "@/styles/sharedStyles";

interface PasswordInputProps {
  setPassword: Dispatch<SetStateAction<string>>;
  $confirmPassword?: boolean;
}

const PasswordInput = ({
  setPassword,
  $confirmPassword,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [clickShowPassword, setClickShowPassword] = useState(false);

  return (
    <>
      <PasswordInputWrapper>
        <Input
          {...{ type: showPassword ? "text" : "password" }}
          id={$confirmPassword ? "confirmPassword" : "password"}
          required
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
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
