"use client";
import ToggleButton from "@/components/Toggle";
import { useTheme } from "@/context/AppProvider";
import { Container } from "@/styles/sharedStyles";
import Image from "next/image";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { ThemeContext } from "styled-components";
import arrow from "../../../public/img/arrow.svg";

const SidebarContainerHome = styled.aside<{
  $isActive: boolean;
  $isOpen: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${(p) => (p.$isActive ? "#404040" : "#7dd3fc")};
  width: 100%;
  transition: width 0.2s ease;

  @media (min-width: 992px) {
    height: 100%;
    width: ${(p) => (p.$isOpen ? "350px" : "100px")};
    justify-content: initial;
    align-items: normal;
    text-align: initial;
  }
`;

const HeaderSidebar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin: 3rem 2rem;
`;

const StyledImage = styled(Image)<{ $isOpen: boolean }>`
  cursor: pointer;
  transform: ${(p) => (p.$isOpen ? "rotate(0deg)" : "rotate(180deg)")};
  transition: all 0.2s ease;
`;

const page = () => {
  const theme = useContext(ThemeContext);

  const { toggleTheme } = useTheme();

  const id = theme?.id;

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Container>
      <SidebarContainerHome $isActive={id === "dark"} $isOpen={open}>
        <HeaderSidebar>
          <ToggleButton
            isOpen={open}
            isActive={id === "dark"}
            toggleTheme={toggleTheme}
          />
          <StyledImage
            onClick={handleClick}
            $isOpen={open}
            src={arrow}
            height={30}
            width={30}
            alt="Sun Image"
          />
        </HeaderSidebar>
        <div>b</div>
      </SidebarContainerHome>

      <div>Notes</div>
    </Container>
  );
};

export default page;
