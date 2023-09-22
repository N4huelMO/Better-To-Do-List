"use client";

import styled from "styled-components";

import Link from "next/link";

import { ButtonForm, Input } from "@/styles/sharedStyles";

import ScrollContainer from "react-indiana-drag-scroll";

const AddListInput = styled(Input)`
  width: 100%;

  @media (min-width: 992px) {
    width: 40%;
  }
`;

const AddListButton = styled(ButtonForm)`
  width: 100%;

  @media (min-width: 992px) {
    width: 200px;
  }
`;

const Container = styled(ScrollContainer)<{
  $hasScroll: boolean;
  $noLists: boolean;
}>`
  cursor: ${(p) => (p.$hasScroll ? "grab" : "auto")};
  display: flex;
  justify-content: ${(p) => (p.$noLists ? "center" : "initial")};
  align-items: ${(p) => (p.$noLists ? "center" : "initial")};
  max-height: 560px;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;

  @media (min-width: 992px) {
    overflow-x: auto;
    height: 560px;
  }

  &:active {
    cursor: ${(p) => (p.$hasScroll ? "grabbing" : "auto")};
  }

  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(p) => p.theme.home.primaryTransparent};
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => p.theme.home.primary};
    border-radius: 100px;
  }
`;

const ListsContainer = styled.div<{ $isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding-right: 0.5rem;

  @media (min-width: 992px) {
    padding: 0;
    flex-wrap: wrap;
    width: ${(p) => (p.$isLoading ? "100%" : "50%")};
  }

  @media (min-width: 1200px) {
    width: ${(p) => (p.$isLoading ? "100%" : "25%")};
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0.5rem;
  overflow-wrap: break-word;
  border: 3px solid ${(p) => p.theme.home.primary};
  background: ${(p) => p.theme.home.lists.background};
  cursor: pointer;

  &:hover {
    background: ${(p) => p.theme.home.lists.backgroundHover};
  }
`;

const ListLink = styled(Link)`
  flex: 1;
  font-weight: bold;
  text-align: center;
  padding: 1rem 0 1rem 1rem;

  &::first-letter {
    text-transform: capitalize;
  }

  @media (min-width: 992px) {
    text-align: left;
  }
`;

const ListButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.bodyFontColor};
  height: 100%;
  padding: 0 1rem;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;

  &:hover {
    background: ${(p) => p.theme.home.lists.button.backgroundHover};
  }
`;

export {
  AddListInput,
  AddListButton,
  Container,
  ListsContainer,
  List,
  ListLink,
  ListButton,
};
