"use client";
import styled from "styled-components";

import { ButtonForm, Input } from "@/styles/sharedStyles";

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

export { H1, AddTaskInput, AddTaskButton };
