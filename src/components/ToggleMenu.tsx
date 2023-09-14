import styled from "styled-components";
import { Theme } from "@/helpers/constants";

import { BiSolidMoon, BiSolidSun } from "react-icons/bi";
import { useAppContext } from "@/context/AppProvider";

const Container = styled.div`
  width: 40px;
  height: 40px;
  border: 2px solid ${(p) => p.theme.toggleButton.primary};
  border-radius: 3rem;
  background: ${(p) => p.theme.toggleButton.background};
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0 auto;
`;

function ToggleButtonMenu() {
  const { themeContext, toggleTheme } = useAppContext();

  return (
    <Container>
      <Button
        onClick={() => {
          toggleTheme(themeContext === Theme.Light ? Theme.Dark : Theme.Light);
        }}
      >
        {themeContext === Theme.Light ? (
          <BiSolidSun size={20}></BiSolidSun>
        ) : (
          <BiSolidMoon size={20}></BiSolidMoon>
        )}
      </Button>
    </Container>
  );
}

export default ToggleButtonMenu;
