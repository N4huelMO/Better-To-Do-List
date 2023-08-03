"use client";

import { Theme } from "@/helpers/constants";
import styled from "styled-components";

const SidebarContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#262626")};

  @media (min-width: 992px) {
    height: 100%;
    width: 480px;
    justify-content: initial;
    align-items: normal;
    text-align: initial;
  }
`;

const SidebarContent = styled.div`
  margin: 2rem;

  @media (min-width: 992px) {
    margin: 7rem 4rem 4rem 4rem;
  }
`;

const H1 = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.8rem;

  @media (min-width: 992px) {
    margin-bottom: 2rem;
  }
`;

const H2 = styled.h2`
  font-size: 1rem;

  @media (min-width: 992px) {
    display: block;
    font-size: 2rem;
  }
`;

const ImageDiv = styled.div`
  display: none;

  @media (min-width: 992px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export { SidebarContainer, SidebarContent, H1, H2, ImageDiv };
