"use client";
import styled from "styled-components";

import { ButtonForm, Input } from "@/styles/sharedStyles";

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

export { AddTaskInput, AddTaskButton };
