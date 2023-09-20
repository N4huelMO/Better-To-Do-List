"use client";

import React from "react";

import { useAppContext } from "@/context/AppProvider";

import useAuth from "@/helpers/useAuth";

import Menu from "@/components/Menu/Menu";

import ToggleButton from "@/components/Toggle";

import {
  Container,
  HeaderSidebar,
  SidebarContainerHome,
  StyledSvg,
} from "./styles";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isOpen, setIsOpen } = useAppContext();

  const { currentUser } = useAuth();

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

export default Layout;
