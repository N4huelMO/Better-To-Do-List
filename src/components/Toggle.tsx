import Image from "next/image";
import styled from "styled-components";
import sunImg from "../../public/img/sun.svg";
import moonImg from "../../public/img/moon.svg";

const Container = styled.div<{ $isActive: boolean; $isOpen: boolean }>`
  box-sizing: border-box;
  margin: 0 5px;
  width: ${(p) => (p.$isOpen ? "220px" : "55px")};
  height: 50px;
  border: 2px solid ${(p) => (p.$isActive ? "#525252 " : "#bae6fd")};
  border-radius: 12px;
  background-color: ${(p) => (p.$isActive ? "#a3a3a3" : "#e0f2fe")};
  display: flex;
  align-items: center;
  display: flex;
  gap: 1.5rem;
  cursor: pointer;
`;

const Button = styled.div<{ $isOpen: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  z-index: 1;
  margin-left: 0.8rem;

  &:first-child {
    margin: 0 1rem;
  }

  p {
    display: ${(p) => (p.$isOpen ? "initial" : "none")};
  }
`;

const Circle = styled.div<{ $isActive: boolean; $isOpen: boolean }>`
  position: absolute;
  width: ${(p) => (p.$isOpen ? "100px" : "45px")};
  height: 40px;
  border-radius: 12px;
  background-color: ${(p) => (p.$isActive ? "#404040" : "#7dd3fc")};
  margin: 0 3px;
  transform: ${(p) =>
    p.$isActive && p.$isOpen == true ? "translateX(110px)" : "translateX(0px)"};
  transition: all 0.2s ease;
`;

function ToggleButton({ isActive, toggleTheme, isOpen }: any) {
  return (
    <Container $isActive={isActive} $isOpen={isOpen} onClick={toggleTheme}>
      {isActive && !isOpen ? null : (
        <Button $isOpen={isOpen}>
          <Image src={sunImg} height={20} width={20} alt="Sun Image" />
          <p>Light</p>
        </Button>
      )}

      {isActive && !isOpen ? (
        <Button $isOpen={isOpen}>
          <Image src={moonImg} height={20} width={20} alt="Sun Image" />
          <p>Dark</p>
        </Button>
      ) : !isActive && isOpen ? (
        <Button $isOpen={isOpen}>
          <Image src={moonImg} height={20} width={20} alt="Sun Image" />
          <p>Dark</p>
        </Button>
      ) : (
        isActive &&
        isOpen && (
          <Button $isOpen={isOpen}>
            <Image src={moonImg} height={20} width={20} alt="Sun Image" />
            <p>Dark</p>
          </Button>
        )
      )}

      <Circle $isActive={isActive} $isOpen={isOpen} />
    </Container>
  );
}

export default ToggleButton;
