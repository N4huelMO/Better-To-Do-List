"use client";

import {
  createContext,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type ContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const AppContext = createContext<ContextType>({
  theme: "",
  setTheme: () => {},
});

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [theme, setTheme] = useState("light");

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
