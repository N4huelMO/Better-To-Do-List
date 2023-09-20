"use client";

import { StyleSheetManager } from "styled-components";

import { HeadDiv, HomeForm, NoData } from "@/styles/sharedStyles";

import { ChangeEvent, useEffect, useState } from "react";

import { auth, db } from "@/firebase/config";

import useAuth from "@/helpers/useAuth";

import Loading from "@/components/Loading";

import { useAppContext } from "@/context/AppProvider";

import { Lists } from "@/interfaces/interfaces";

import { TbTrash } from "react-icons/tb";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

import {
  AddListButton,
  AddListInput,
  Container,
  List,
  ListButton,
  ListLink,
  ListsContainer,
} from "./styles";

const ListsPage = () => {
  const { fetchIsLoading, setFetchIsLoading } = useAppContext();

  const hasEnoughElements = 21;

  const [list, setList] = useState<string>("");
  const [lists, setLists] = useState<Array<Lists>>([]);

  const { currentUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const splitName = auth.currentUser?.displayName?.split(" ");

    const newList = {
      creator: {
        id: currentUser?.uid,
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
    setFetchIsLoading(true);

    if (currentUser && currentUser.uid) {
      const q = query(
        collection(db, "Lists"),
        where("creator.id", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedLists: Array<Lists> = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Lists;

          const listId = doc.id;

          data.id = listId;

          fetchedLists.push(data);
        });

        fetchedLists.sort((a, b) => b.date - a.date);

        setLists(fetchedLists);

        setFetchIsLoading(false);
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
          <ListsContainer $isLoading={fetchIsLoading}>
            {fetchIsLoading ? (
              <Loading />
            ) : lists.length === 0 ? (
              <NoData>No lists added yet</NoData>
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

export default ListsPage;
