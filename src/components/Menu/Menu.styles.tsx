import styled, { keyframes } from "styled-components";

import Link from "next/link";

const fade = keyframes`
  0%{
    opacity:0;
    translate: -30px 0;
  }

  50%{
    opacity:0.5
  }

    100% {
      opacity: 1;
    }
`;

const Container = styled.div<{ $isOpen: boolean }>`
  display: ${(p) => (p.$isOpen ? "initial" : "none")};
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: bold;
  gap: 1.5rem;
  color: ${(p) => p.theme.bodyFontColor};

  @media (min-width: 992px) {
    display: flex;
  }
`;

const WelcomeDiv = styled.div`
  display: none;
  margin-bottom: 2rem;
  text-align: center;
  animation: ${fade} 0.4s;

  p:nth-child(2) {
    font-size: 1.1rem;
    margin: 0.5rem 3rem;
  }

  @media (min-width: 992px) {
    display: initial;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 0 2rem 0;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  transition: 0.2s ease;

  p {
    animation: ${fade} 0.4s;
  }

  &:hover {
    background: ${(p) => p.theme.menu.backgroundHover};
  }
`;

const Logout = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  transition: 0.2s ease;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${(p) => p.theme.bodyFontColor};

  p {
    animation: ${fade} 0.4s;
    font-size: 1.3rem;
    font-weight: bold;
  }

  &:hover {
    background: ${(p) => p.theme.menu.backgroundHover};
  }
`;
export { Container, WelcomeDiv, LinksContainer, StyledLink, Logout };
