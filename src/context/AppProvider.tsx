"use client";

import { Tasks } from "@/interfaces/interfaces";
import {
  createContext,
  useState,
  ReactNode,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

type ContextProps = {
  themeContext: string;
  toggleTheme: (e?: string) => void | (() => {});
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  alert: { msg: string; error: boolean };
  setAlert: Dispatch<SetStateAction<{ msg: string; error: boolean }>>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fetchIsLoading: boolean;
  setFetchIsLoading: Dispatch<SetStateAction<boolean>>;
  task: string;
  setTask: Dispatch<SetStateAction<string>>;
  tasks: Array<Tasks>;
  setTasks: Dispatch<SetStateAction<Tasks[]>>;
};

const AppContext = createContext<ContextProps | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [themeContext, setThemeContext] = useState<string>("light");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [alert, setAlert] = useState<{ msg: string; error: boolean }>({
    msg: "",
    error: false,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(true);
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Array<Tasks>>([]);

  const toggleTheme = (e?: string) => {
    if (e) {
      setThemeContext(e);
      return;
    }
  };

  return (
    <AppContext.Provider
      value={{
        themeContext,
        toggleTheme,
        email,
        setEmail,
        password,
        setPassword,
        alert,
        setAlert,
        isOpen,
        setIsOpen,
        isLoading,
        setIsLoading,
        fetchIsLoading,
        setFetchIsLoading,
        task,
        setTask,
        tasks,
        setTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a ThemeProvider");
  }
  return context;
}

export { AppProvider };

export default AppContext;
