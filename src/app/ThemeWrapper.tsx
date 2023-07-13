"use client";

import React, { useState } from "react";
import StyledComponentsRegistry from "./registry";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import styled from "styled-components";

import LightTheme from "../themes/light";
import DarkTheme from "../themes/dark";

const GlobalStyle = createGlobalStyle`
html,body { 
  height: 100%;
  background: ${(p) => p.theme.bodyBackgroundColor};
  transition: all 0.2s linear;
  color: ${(p) => p.theme.bodyFontColor};
  }
`;

const Container = styled.div`
  height: 100vh;
`;

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    theme == "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme == "light" ? LightTheme : DarkTheme}>
        <GlobalStyle />
        <Container>{children}</Container>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default ThemeWrapper;
