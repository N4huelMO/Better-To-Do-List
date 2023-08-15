"use client";

import { useAppContext } from "@/context/AppProvider";

import React, { useState } from "react";

import Menu from "@/components/Menu/Menu";
import ToggleButton from "@/components/Toggle";

import {
  Container,
  HeaderSidebar,
  SidebarContainerHome,
  StyledSvg,
} from "./styles";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { toggleTheme } = useAppContext();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

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

        <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
      </SidebarContainerHome>

      <Container>{children}</Container>
    </>
  );
};

export default layout;
