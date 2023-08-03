import { Theme } from "@/helpers/constants";
import Image from "next/image";
import styled from "styled-components";

const SidebarContainerHome = styled.aside<{
  $isOpen: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#262626")};
  width: 100%;
  transition: width 0.3s ease;

  @media (min-width: 992px) {
    height: 100%;
    width: ${(p) => (p.$isOpen ? "450px" : "100px")};
    justify-content: initial;
    align-items: normal;
    text-align: initial;
  }
`;

const HeaderSidebar = styled.header<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: ${(p) => (p.$isOpen ? "row" : "column-reverse")};
  justify-content: space-around;
  align-items: center;
  margin: ${(p) => (p.$isOpen ? "4rem 1rem" : "3rem 1rem")};
  gap: ${(p) => (p.$isOpen ? "0" : "2rem")};
`;

const StyledImage = styled(Image)<{ $isOpen: boolean }>`
  cursor: pointer;
  transform: ${(p) => (p.$isOpen ? "rotate(0deg)" : "rotate(180deg)")};
  transition: 0.3s ease;
`;

export { SidebarContainerHome, HeaderSidebar, StyledImage };
