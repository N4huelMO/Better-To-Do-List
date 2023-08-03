"use client";

import React from "react";
import StyledComponentsRegistry from "./registry";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import styled from "styled-components";

import LightTheme from "@/themes/light";
import DarkTheme from "@/themes/dark";
import { Theme } from "@/helpers/constants";
import { useAppContext } from "@/context/AppProvider";

const GlobalStyle = createGlobalStyle`
html,body { 
  height: 100%;
  background: ${(p) => p.theme.bodyBackgroundColor};
  color: ${(p) => p.theme.bodyFontColor};
  transition: background 0.2s ease, color 0.2s ease;
  }
`;

const Container = styled.div`
  height: 100vh;
`;

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { themeContext } = useAppContext();

  return (
    <StyledComponentsRegistry>
      <ThemeProvider
        theme={themeContext == Theme.Light ? LightTheme : DarkTheme}
      >
        <GlobalStyle />
        <Container>{children}</Container>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
};

export default ThemeWrapper;
