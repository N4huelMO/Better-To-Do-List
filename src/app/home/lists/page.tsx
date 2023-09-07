"use client";
import { HeadDiv } from "../styles";

import styled, { StyleSheetManager } from "styled-components";

import { ButtonForm, HomeForm, Input } from "@/styles/sharedStyles";

import ScrollContainer from "react-indiana-drag-scroll";

import { Theme } from "@/helpers/constants";

import { ChangeEvent, useEffect, useState } from "react";

import { auth, db } from "@/firebase/config";
import userAuth from "@/helpers/userAuth";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { TbTrash } from "react-icons/tb";
import Loading from "@/components/Loading";
import Link from "next/link";

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
  }

  &:active {
    cursor: ${(p) => (p.$hasScroll ? "grabbing" : "auto")};
  }

  &::-webkit-scrollbar {
    height: 8px;
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
  border: 3px solid ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  background: ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#262626")};
  cursor: pointer;

  &:hover {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#9eddff" : "#383838")};
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
  transition: 0.2s;
  height: 100%;
  padding: 0 1rem;
  border-top-right-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;

  &:hover {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#4290b9" : "#262626")};
  }
`;

const NoLists = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 3rem 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

interface Lists {
  creator: { id: string; name: string };
  date: number;
  id: string;
  name: string;
  tasks: [
    {
      complete: boolean;
      date: string;
      description: string;
      id: string;
    }
  ];
}

const page = () => {
  const hasEnoughElements = 21;

  const [list, setList] = useState<string>("");
  const [lists, setLists] = useState<Array<Lists>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { currentUser } = userAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const splitName = auth.currentUser?.displayName?.split(" ");

    const newList = {
      creator: {
        id: currentUser.uid,
        name: splitName?.[0],
      },
      date: Date.now(),
      name: list.trimEnd(),
      tasks: [],
    };

    setList("");

    await addDoc(collection(db, "Lists"), newList);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setList(e.target.value.trimStart());
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "Lists", id));
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const q = query(
        collection(db, "Lists"),
        where("creator.id", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setIsLoading(true);

        const fetchedLists: Array<Lists> = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Lists;

          const listId = doc.id;

          data.id = listId;

          fetchedLists.push(data);
        });

        fetchedLists.sort((a, b) => b.date - a.date);

        setLists(fetchedLists);

        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <>
      <HeadDiv>
        <h1>Lists</h1>
        <h4>
          In this section you can create lists, to group tasks that have
          similarities. <br /> For example: purchases: milk, sugar...
        </h4>
      </HeadDiv>

      <HomeForm onSubmit={handleSubmit}>
        <AddListInput
          required
          onChange={handleChange}
          value={list}
          type="text"
        />
        <AddListButton>Add new list</AddListButton>
      </HomeForm>

      <StyleSheetManager
        shouldForwardProp={({ prop }: any) => prop !== "hideScrollbars"}
      >
        <Container
          hideScrollbars={false}
          $hasScroll={lists.length > hasEnoughElements}
          $noLists={lists.length === 0}
        >
          <ListsContainer $isLoading={isLoading}>
            {isLoading ? (
              <Loading />
            ) : lists.length === 0 ? (
              <NoLists>No lists added yet</NoLists>
            ) : (
              lists.map((list: Lists, i: number) => (
                <List key={i}>
                  <ListLink href={`/home/lists/${list.id}`}>
                    {list.name}
                  </ListLink>

                  <ListButton onClick={() => handleDelete(list.id)}>
                    <TbTrash size={25}></TbTrash>
                  </ListButton>
                </List>
              ))
            )}
          </ListsContainer>
        </Container>
      </StyleSheetManager>
    </>
  );
};

export default page;
