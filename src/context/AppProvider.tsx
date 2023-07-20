"use client";

import { createContext, useState, ReactNode, useContext } from "react";

type ContextProps = {
  themeContext: string;
  toggleTheme: () => void;
};

const AppContext = createContext<ContextProps | null>(null);

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [themeContext, setThemeContext] = useState("light");

  const toggleTheme = () => {
    setThemeContext((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <AppContext.Provider
      value={{
        themeContext,
        toggleTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { AppProvider };

export default AppContext;
