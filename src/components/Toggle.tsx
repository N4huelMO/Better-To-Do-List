import Image from "next/image";
import styled from "styled-components";
import sunImg from "../../public/img/sun.svg";
import darkSunImg from "../../public/img/darkSun.svg";
import moonImg from "../../public/img/moon.svg";
import darkMoonImg from "../../public/img/darkMoon.svg";
import { Theme } from "@/helpers/constants";

const Container = styled.div<PropsStyles>`
  margin: 0 5px;
  width: ${(p) => (p.$isOpen ? "220px" : "55px")};
  height: 50px;
  border: 2px solid ${(p) => (p.theme.id != Theme.Dark ? "#9ecce5" : "#525252")};
  border-radius: 0.5rem;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#e0f2fe" : "#404040")};
  display: flex;
  align-items: center;
  display: flex;
  gap: 1.5rem;
`;

const Button = styled.div<PropsStyles>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  z-index: 1;
  margin-left: 0.8rem;
  cursor: pointer;

  &:first-child {
    margin: 0 1rem;
  }

  p {
    display: ${(p) => (p.$isOpen ? "initial" : "none")};
    font-weight: bold;
    font-size: 0.9rem;
  }
`;

const Circle = styled.div<PropsStyles>`
  position: absolute;
  width: ${(p) => (p.$isOpen ? "100px" : "45px")};
  height: 40px;
  border-radius: 0.5rem;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#b4ddf3" : "#525252")};
  margin: 0 3px;
  transform: ${(p) =>
    p.theme.id === Theme.Dark && p.$isOpen == true
      ? "translateX(110px)"
      : "translateX(0px)"};
  transition: ${(p) => (p.$isOpen ? "0.2s" : "")};
`;

interface Props {
  isActive: boolean;
  toggleTheme: (e?: string) => void | (() => {});
  isOpen: boolean;
}

interface PropsStyles {
  $isOpen: boolean;
}

function ToggleButton({ isActive, toggleTheme, isOpen }: Props) {
  return (
    <Container $isOpen={isOpen}>
      {!isOpen && !isActive && (
        <Button
          $isOpen={isOpen}
          onClick={() => {
            toggleTheme(Theme.Dark);
          }}
        >
          <Image
            src={isActive ? darkSunImg : sunImg}
            height={20}
            width={20}
            alt="Sun Image"
          />
          <p>Light</p>
        </Button>
      )}

      {!isOpen && isActive && (
        <Button
          $isOpen={isOpen}
          onClick={() => {
            toggleTheme(Theme.Light);
          }}
        >
          <Image
            src={isActive ? darkMoonImg : moonImg}
            height={20}
            width={20}
            alt="Moon Image"
          />
          <p>Dark</p>
        </Button>
      )}

      {isOpen && (
        <>
          <Button
            $isOpen={isOpen}
            onClick={() => {
              toggleTheme(Theme.Light);
            }}
          >
            <Image
              src={isActive ? darkSunImg : sunImg}
              height={20}
              width={20}
              alt="Sun Image"
            />
            <p>Light</p>
          </Button>
          <Button
            $isOpen={isOpen}
            onClick={() => {
              toggleTheme(Theme.Dark);
            }}
          >
            <Image
              src={isActive ? darkMoonImg : moonImg}
              height={20}
              width={20}
              alt="Moon Image"
            />
            <p>Dark</p>
          </Button>
        </>
      )}

      <Circle $isOpen={isOpen} />
    </Container>
  );
}

export default ToggleButton;
