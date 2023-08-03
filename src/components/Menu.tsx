import styled, { css, keyframes } from "styled-components";
import Link from "next/link";
import { BsFileEarmarkFont, BsList, BsCalendar3 } from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { Theme } from "@/helpers/constants";
import { auth } from "@/firebase/config";
import { useEffect, useState } from "react";

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

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.3rem;
  font-weight: 700;
  gap: 1.5rem;
  color: ${(p) => p.theme.bodyFontColor};
`;

const WelcomeDiv = styled.div<{ $isOpen: boolean }>`
  margin-bottom: 2rem;
  text-align: center;
  display: ${(p) => (p.$isOpen ? "initial" : "none")};
  animation: ${(p) =>
    p.$isOpen
      ? css`
          ${fade} .4s
        `
      : ""};

  p:nth-child(2) {
    font-size: 1.1rem;
    margin: 0.5rem 3rem;
  }
`;

const LinksContainer = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: ${(p) => (p.$isOpen ? "" : "3rem")};
`;

const StyledLink = styled(Link)<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: ${(p) => (p.$isOpen ? "0.5rem 2rem" : "0.5rem 1rem")};
  border-radius: 0.5rem;
  transition: 0.3s ease;

  p {
    display: ${(p) => (p.$isOpen ? "initial" : "none")};
    animation: ${(p) =>
      p.$isOpen
        ? css`
            ${fade} .4s
          `
        : ""};
  }

  &:hover {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#89bde0" : "#404040")};
  }
`;

interface Props {
  isOpen: boolean;
}

const Menu = ({ isOpen }: Props) => {
  const [userName, setUserName] = useState<string | undefined>("");

  useEffect(() => {
    const splitName = auth.currentUser?.displayName?.split(" ")[0];

    setUserName(splitName);
  }, []);

  return (
    <Container>
      <WelcomeDiv $isOpen={isOpen}>
        {userName ? <p>Hi, {userName}</p> : <p>...</p>}

        <p>What do you need remember today?</p>
      </WelcomeDiv>

      <LinksContainer $isOpen={isOpen}>
        <StyledLink $isOpen={isOpen} href="/home">
          <BsFileEarmarkFont size={30}></BsFileEarmarkFont>
          <p>Simple Tasks</p>
        </StyledLink>

        <StyledLink $isOpen={isOpen} href="/home/lists">
          <BsList size={30}></BsList>
          <p>Lists</p>
        </StyledLink>

        <StyledLink $isOpen={isOpen} href="/home/calendar">
          <BsCalendar3 size={30}></BsCalendar3>
          <p>Calendar</p>
        </StyledLink>

        <StyledLink $isOpen={isOpen} href="/home/settings">
          <RiSettings4Fill size={30}></RiSettings4Fill>
          <p>Settings</p>
        </StyledLink>

        <StyledLink $isOpen={isOpen} href="#">
          <BiLogOut size={30}></BiLogOut>
          <p>Logout</p>
        </StyledLink>
      </LinksContainer>
    </Container>
  );
};

export default Menu;
