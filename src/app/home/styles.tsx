import { Theme } from "@/helpers/constants";
import styled from "styled-components";
import { BiArrowToLeft } from "react-icons/bi";
import { ButtonForm, Input } from "@/styles/sharedStyles";

const SidebarContainerHome = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#262626")};
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
    padding: 4rem 4rem;
  }
`;

const HeadDiv = styled.div`
  margin-bottom: 2rem;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  h4 {
    font-size: 1rem;
    color: ${(p) => (p.theme.id != Theme.Dark ? "#4d718a" : "#949494")};
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

  &::-webkit-calendar-picker-indicator {
    transition: 0.2s;
    filter: ${(p) => (p.theme.id != Theme.Dark ? "" : "invert(1)")};
  }
`;

const AddTaskButton = styled(ButtonForm)`
  padding: 0.5rem;
  font-size: 0.9rem;
  width: 50%;

  @media (min-width: 992px) {
    width: 200px;
    font-size: initial;
  }
`;

const TaskRemaining = styled.p`
  font-weight: bold;
`;

const TableContainer = styled.div`
  max-height: 600px;
  overflow: auto;
  padding-right: 0.5rem;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(p) =>
      p.theme.id != Theme.Dark ? "#5d9ac56c" : "#9494946c"};
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
    border-radius: 100px;
  }
`;

const Table = styled.div`
  width: 100%;
  border: 3px solid ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  border-radius: 0.5rem;
`;

const Task = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 2px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  overflow-wrap: break-word;

  &:first-child {
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
  }

  &:last-child {
    border-bottom-left-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    border-bottom: none;
  }
`;

const TaskContent = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  padding: 0.5rem 1rem;

  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: initial;
    text-align: initial;
    gap: 1rem;
  }
`;

const TaskButtonsDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 1rem 0.5rem 0;
  gap: 0.5rem;
  border-left: 2px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  padding-left: 0.5rem;

  @media (min-width: 992px) {
    flex-direction: row;
    margin: 0;
    margin-right: 1rem;
    gap: 1rem;
  }
`;
const TaskButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.bodyFontColor};
`;

const TaskDate = styled.p`
  word-break: normal;
  width: 5.4rem;
  text-align: center;
  font-size: 0.8rem;

  @media (min-width: 992px) {
    text-align: left;
    font-size: 1rem;
    border-right: 2px solid
      ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
    padding-right: 0.5rem;
  }
`;

const TaskDescription = styled.p<{ $complete: string }>`
  font-weight: ${(p) => (p.$complete ? "lighter" : "bold")};
  padding: 0 1rem;
  font-size: 1.2rem;
  text-decoration: ${(p) => (p.$complete ? "line-through" : "none")};
  text-decoration-thickness: 0.15rem;

  @media (min-width: 992px) {
    padding: 0;
  }
`;

const NoTasks = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 3rem 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

export {
  SidebarContainerHome,
  HeaderSidebar,
  StyledSvg,
  HeadDiv,
  Container,
  AddTaskInput,
  InputButtonContainer,
  AddTaskDateInput,
  AddTaskButton,
  TaskRemaining,
  TableContainer,
  Table,
  Task,
  TaskContent,
  TaskButtonsDiv,
  TaskButton,
  TaskDate,
  TaskDescription,
  NoTasks,
};
