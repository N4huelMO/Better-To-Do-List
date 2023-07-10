import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  margin: 0 5px;
  width: 45px;
  height: 25px;
  border: 1px solid #e1e5e9;
  border-radius: 12px;
  background-color: #f0f4f7;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Circle = styled.div<{ $isActive: string }>`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background-color: ${(p) => (p.$isActive ? "#404040" : "#5F7181")};
  margin: 0 3px;
  transform: ${(p) => (p.$isActive ? "translateX(20px)" : "translateX(0px)")};
  transition: all 0.2s ease-in-out;
`;

function ToggleButton({ isActive, toggleTheme }: any) {
  return (
    <Container onClick={toggleTheme}>
      <Circle $isActive={isActive} />
    </Container>
  );
}

export default ToggleButton;
