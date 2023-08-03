"use client";
import ToggleButton from "@/components/Toggle";
import { useAppContext } from "@/context/AppProvider";
import React, { useContext, useState } from "react";
import { ThemeContext } from "styled-components";
import arrow from "../../../public/img/arrow.svg";
import darkArrow from "../../../public/img/darkArrow.svg";
import { Theme } from "@/helpers/constants";
import Menu from "@/components/Menu";
import { HeaderSidebar, SidebarContainerHome, StyledImage } from "./styles";

const layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useContext(ThemeContext);

  const { toggleTheme } = useAppContext();

  const id = theme?.id;

  const [open, setOpen] = useState<boolean>(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <SidebarContainerHome $isOpen={open}>
        <HeaderSidebar $isOpen={open}>
          <ToggleButton
            isOpen={open}
            isActive={id === "dark"}
            toggleTheme={toggleTheme}
          />
          <StyledImage
            onClick={handleClick}
            $isOpen={open}
            src={id != Theme.Dark ? arrow : darkArrow}
            height={30}
            width={30}
            alt="Arrow image"
          />
        </HeaderSidebar>

        <Menu isOpen={open} />
      </SidebarContainerHome>

      {children}
    </>
  );
};

export default layout;
