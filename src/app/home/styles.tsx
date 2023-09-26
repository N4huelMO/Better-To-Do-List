import styled from "styled-components";
import { BiArrowToLeft } from "react-icons/bi";
import { ButtonForm, Input } from "@/styles/sharedStyles";

const SidebarContainerHome = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(p) => p.theme.sidebar.background};
  width: 100%;

  @media (min-width: 992px) {
    height: 100%;
    width: 450px;
    justify-content: initial;
    align-items: normal;
    text-align: initial;
  }
`;

const HeaderSidebar = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 2rem;
  margin: 1rem;

  @media (min-width: 992px) {
    margin: 3rem 1rem;
  }
`;

const StyledSvg = styled(BiArrowToLeft)<{ $isOpen: boolean }>`
  transform: ${(p) => (p.$isOpen ? "rotate(90deg)" : "rotate(270deg)")};
  transition: 0.2s ease;
  color: ${(p) => p.theme.bodyFontColor};

  @media (min-width: 992px) {
    display: none;
  }
`;

const Container = styled.div`
  width: 100%;
  padding: 1rem;

  @media (min-width: 1200px) {
    padding: 1.5rem 2rem;
  }
`;

const AddTaskInput = styled(Input)`
  width: 100%;

  @media (min-width: 992px) {
    width: 40%;
  }
`;

const InputButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const AddTaskDateInput = styled(Input)`
  width: 10rem;
  font-weight: bold;
  font-size: 0.9rem;
  position: relative;

  &::-webkit-calendar-picker-indicator {
    transition: 0.2s;
    filter: ${(p) => p.theme.home.filter};
    background-position: right;
    background-size: auto;
    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 15px;
    top: 17px;
    width: auto;
  }
`;

const AddTaskButton = styled(ButtonForm)`
  padding: 0.5rem;
  font-size: 0.9rem;
  width: 50%;

  @media (min-width: 992px) {
    width: 170px;
    font-size: initial;
  }
`;

const TaskDate = styled.p`
  word-break: normal;
  width: 5.4rem;
  text-align: center;
  font-size: 0.8rem;

  @media (min-width: 992px) {
    text-align: left;
    font-size: 1rem;
    border-right: 2px solid ${(p) => p.theme.home.primary};
    padding-right: 0.75rem;
  }
`;

export {
  SidebarContainerHome,
  HeaderSidebar,
  StyledSvg,
  Container,
  AddTaskInput,
  InputButtonContainer,
  AddTaskDateInput,
  AddTaskButton,
  TaskDate,
};
