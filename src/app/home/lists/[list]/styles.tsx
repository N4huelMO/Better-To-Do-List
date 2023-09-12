"use client";
import styled from "styled-components";

import { ButtonForm, Input } from "@/styles/sharedStyles";

import { Theme } from "@/helpers/constants";

const H1 = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;

  &::first-letter {
    text-transform: capitalize;
  }
`;

const AddTaskInput = styled(Input)`
  width: 100%;

  @media (min-width: 992px) {
    width: 50%;
  }
`;

const AddTaskButton = styled(ButtonForm)`
  width: 100%;

  @media (min-width: 992px) {
    width: 200px;
  }
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

const TaskDescription = styled.p<{ $complete: boolean }>`
  font-weight: ${(p) => (p.$complete ? "lighter" : "bold")};
  padding: 0 1rem;
  font-size: 1.2rem;
  text-decoration: ${(p) => (p.$complete ? "line-through" : "none")};
  text-decoration-thickness: 0.15rem;

  @media (min-width: 992px) {
    padding: 0;
  }
`;

export {
  H1,
  AddTaskInput,
  AddTaskButton,
  TableContainer,
  Table,
  Task,
  TaskContent,
  TaskButtonsDiv,
  TaskButton,
  TaskDescription,
};
