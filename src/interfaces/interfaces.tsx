import { Dispatch, SetStateAction } from "react";

export interface Tasks {
  creator: { id: string; name: string };
  date: number;
  complete: string;
  description: string;
  id: string;
}

export interface Lists {
  creator: { id: string; name: string };
  date: number;
  id: string;
  name: string;
  tasks: [
    {
      complete: boolean;
      date: string;
      description: string;
      id: string;
    }
  ];
}

export interface Task {
  complete: boolean;
  description: string;
  id: string;
}

export interface List {
  creator: { id: string; name: string };
  date: number;
  id: string;
  name: string;
  tasks: Array<Task>;
}

export interface AccInterface {
  [date: string]: number;
}

export interface PasswordInputProps {
  setPassword: Dispatch<SetStateAction<string>>;
  $confirmPassword?: boolean;
}

export interface ValidPaths {
  [key: string]: boolean;
}

export interface AlertProps {
  secondary?: boolean;
  message: { msg: string; error: boolean };
}

export interface LoadingProps {
  $calendar?: boolean;
}

export interface ToggleProps {
  toggleTheme: (e?: string) => void | (() => {});
}
