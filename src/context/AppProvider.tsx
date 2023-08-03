"use client";

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
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        isLoading,
        setIsLoading,
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
