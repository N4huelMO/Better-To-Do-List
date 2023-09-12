"use client";

import { useAppContext } from "@/context/AppProvider";

import React, { useState, useEffect } from "react";

import Menu from "@/components/Menu/Menu";
import ToggleButton from "@/components/Toggle";

import {
  Container,
  HeaderSidebar,
  SidebarContainerHome,
  StyledSvg,
} from "./styles";
import userAuth from "@/helpers/userAuth";

import Loading from "@/components/Loading";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { toggleTheme, isOpen, setIsOpen } = useAppContext();

  const { currentUser } = userAuth();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!currentUser) return null;

  return (
    <>
      <SidebarContainerHome>
        <HeaderSidebar>
          <ToggleButton toggleTheme={toggleTheme} />

          <StyledSvg
            size={30}
            onClick={handleClick}
            $isOpen={isOpen}
          ></StyledSvg>
        </HeaderSidebar>

        <Menu />
      </SidebarContainerHome>

      <Container>{children}</Container>
    </>
  );
};

export default layout;
