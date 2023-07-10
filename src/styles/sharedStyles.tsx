"use client";
import styled from "styled-components";

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  @media (min-width: 992px) {
    flex-direction: row;
    margin: 2rem;
  }
`;

export { Main };
