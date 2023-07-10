"use client";
import ToggleButton from "@/common/Toggle";
import Link from "next/link";
import { useContext } from "react";
import styled, { ThemeContext } from "styled-components";

const HeaderLayout = styled.header`
  background-color: ${(p) => p.theme.primaryColor};
  color: white;
  border-bottom: 1px solid #404040;
  flex: 0 1 auto;
  transition: all 0.2s linear;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: 70%;
  padding: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LinkHome = styled(Link)`
  font-size: 1.5rem;
`;

const Nav = styled.nav`
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const Header = ({ toggleTheme }: any) => {
  const theme = useContext(ThemeContext);

  const id = theme?.id;

  return (
    <HeaderLayout>
      <Container>
        <LinkHome href="/">Better To-Do List</LinkHome>
        <Nav>
          <ToggleButton isActive={id === "dark"} toggleTheme={toggleTheme} />
        </Nav>
      </Container>
    </HeaderLayout>
  );
};

export default Header;
