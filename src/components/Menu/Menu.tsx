import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { BsFileEarmarkFont, BsList, BsCalendar3 } from "react-icons/bs";
import { RiSettings4Fill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

import userAuth from "@/helpers/userAuth";
import SocialLink from "../SocialLink";
import {
  Container,
  LinksContainer,
  StyledLink,
  WelcomeDiv,
} from "./Menu.styles";

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const Menu = ({ isOpen, setIsOpen }: Props) => {
  const [userName, setUserName] = useState<string | undefined>("");

  const { currentUser } = userAuth();

  useEffect(() => {
    const splitName = currentUser.displayName?.split(" ")[0];

    setUserName(splitName);
  }, [currentUser]);

  return (
    <Container $isOpen={isOpen}>
      <WelcomeDiv>
        {userName ? <p>Hi, {userName}</p> : <p>...</p>}

        <p>What do you need remember today?</p>
      </WelcomeDiv>

      <LinksContainer>
        <StyledLink
          $isOpen={isOpen}
          href="/home"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <BsFileEarmarkFont size={30}></BsFileEarmarkFont>
          <p>Simple Tasks</p>
        </StyledLink>

        <StyledLink
          $isOpen={isOpen}
          href="/home/lists"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <BsList size={30}></BsList>
          <p>Lists</p>
        </StyledLink>

        <StyledLink
          $isOpen={isOpen}
          href="/home/calendar"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <BsCalendar3 size={30}></BsCalendar3>
          <p>Calendar</p>
        </StyledLink>

        <StyledLink
          $isOpen={isOpen}
          href="/home/settings"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <RiSettings4Fill size={30}></RiSettings4Fill>
          <p>Settings</p>
        </StyledLink>

        <StyledLink $isOpen={isOpen} href="#">
          <BiLogOut size={30}></BiLogOut>
          <p>Logout</p>
        </StyledLink>
      </LinksContainer>

      <SocialLink />
    </Container>
  );
};

export default Menu;
