"use client";

import React from "react";

import { useAppContext } from "@/context/AppProvider";

import userAuth from "@/helpers/userAuth";

import Menu from "@/components/Menu/Menu";

import ToggleButton from "@/components/Toggle";

import {
  Container,
  HeaderSidebar,
  SidebarContainerHome,
  StyledSvg,
} from "./styles";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useAppContext();

  const { currentUser } = userAuth();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (!currentUser) return null;

  return (
    <>
      <SidebarContainerHome>
        <HeaderSidebar>
          <ToggleButton />

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
