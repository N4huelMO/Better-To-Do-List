"use client";
import { HeadDiv } from "../styles";
import styled, { StyleSheetManager } from "styled-components";
import { ButtonForm, Input } from "@/styles/sharedStyles";

import ScrollContainer from "react-indiana-drag-scroll";
import { Theme } from "@/helpers/constants";
import { ChangeEvent, useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import userAuth from "@/helpers/userAuth";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

const AddListForm = styled.form`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const AddListInput = styled(Input)`
  width: 40%;
`;

const AddListButton = styled(ButtonForm)`
  width: 200px;
`;

const Container = styled(ScrollContainer)<{ $hasScroll: boolean }>`
  cursor: ${(p) => (p.$hasScroll ? "grab" : "auto")};
  display: flex;
  max-height: 560px;
  overflow-x: auto;

  &:active {
    cursor: ${(p) => (p.$hasScroll ? "grabbing" : "auto")};
  }

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(p) =>
      p.theme.id != Theme.Dark ? "#3662816e" : "#5757576a"};
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#366281" : "#575757")};
    border-radius: 100px;
  }
`;

const ListsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 25%;
  gap: 1rem;
`;

const TaskList = styled.div`
  padding: 1rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 3px solid ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  background: ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#262626")};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#9eddff" : "#383838")};
  }
`;

const TaskContent = styled.p`
  font-weight: bold;
`;

const page = () => {
  const hasEnoughElements = 21;

  const [list, setList] = useState<string>("");
  const [lists, setLists] = useState<any>([]);

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
      tasks: [
        {
          description: "test",
          date: "2023-08-17",
          complete: false,
          id: "",
        },
        {
          description: "test2",
          date: "2023-08-17",
          complete: false,
          id: "",
        },
      ],
    };

    await addDoc(collection(db, "Lists"), newList);

    setList("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setList(e.target.value);
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const q = query(
        collection(db, "Lists"),
        where("creator.id", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedLists: Array<any> = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as any;

          const listId = doc.id;

          data.id = listId;

          fetchedLists.push(data);
        });

        fetchedLists.sort((a, b) => b.date - a.date);

        setLists(fetchedLists);
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

      <AddListForm onSubmit={handleSubmit}>
        <AddListInput
          required
          onChange={handleChange}
          value={list}
          type="text"
        />
        <AddListButton>Add new list</AddListButton>
      </AddListForm>

      <StyleSheetManager
        shouldForwardProp={({ prop }: any) => prop !== "hideScrollbars"}
      >
        <Container
          hideScrollbars={false}
          $hasScroll={lists.length > hasEnoughElements}
        >
          <ListsContainer>
            {lists.map((list: any, i: number) => (
              <TaskList key={i}>
                <TaskContent>{list.name}</TaskContent>
              </TaskList>
            ))}
          </ListsContainer>
        </Container>
      </StyleSheetManager>
    </>
  );
};

export default page;
