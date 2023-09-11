import styled from "styled-components";
import { Theme } from "@/helpers/constants";

import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { ToggleProps } from "@/interfaces/interfaces";

const Container = styled.div`
  margin: 0 5px;
  width: 220px;
  height: 50px;
  border: 2px solid ${(p) => (p.theme.id != Theme.Dark ? "#9ecce5" : "#525252")};
  border-radius: 0.5rem;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#e0f2fe" : "#404040")};
  display: flex;
  align-items: center;
  display: flex;
  gap: 1.5rem;
`;

const Button = styled.div`
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
    font-weight: bold;
    font-size: 0.9rem;
  }

  @media (min-width: 992px) {
    p {
      display: initial;
    }
  }
`;

const Circle = styled.div`
  position: absolute;
  width: 100px;
  height: 40px;
  border-radius: 0.5rem;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#b4ddf3" : "#525252")};
  margin: 0 3px;
  transition: 0.2s;
  transform: ${(p) =>
    p.theme.id === Theme.Dark ? "translateX(110px)" : "translateX(0px)"};

  @media (min-width: 992px) {
    transition: 0.2s;
    width: 100px;
    transform: ${(p) =>
      p.theme.id === Theme.Dark ? "translateX(110px)" : "translateX(0px)"};
  }
`;

function ToggleButton({ toggleTheme }: ToggleProps) {
  return (
    <Container>
      <Button
        onClick={() => {
          toggleTheme(Theme.Light);
        }}
      >
        <BiSolidSun size={20}></BiSolidSun>
        <p>Light</p>
      </Button>

      <Button
        onClick={() => {
          toggleTheme(Theme.Dark);
        }}
      >
        <BiSolidMoon size={20}></BiSolidMoon>
        <p>Dark</p>
      </Button>

      <Circle />
    </Container>
  );
}

export default ToggleButton;
