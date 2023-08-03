"use client";
import { auth, db } from "@/firebase/config";
import { Theme } from "@/helpers/constants";
import userAuth from "@/helpers/userAuth";
import { Input } from "@/styles/sharedStyles";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { ChangeEvent, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { formatDate } from "../../helpers/formatDate";
import Loading from "@/components/Loading";

const Container = styled.div`
  width: 100%;
  padding: 4rem 2rem;

  @media (min-width: 1200px) {
    padding: 4rem 5rem;
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

const AddTaskForm = styled.form`
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  width: 100%;

  button {
    padding: 0 2rem;
    border-radius: 0.5rem;
    text-transform: uppercase;
    font-weight: bold;
    background: ${(p) => (p.theme.id != Theme.Dark ? "#0284c7" : "#525252")};
    border: transparent;
    color: white;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      background: ${(p) => (p.theme.id != Theme.Dark ? "#0369a1" : "#404040")};
    }
  }
`;

const BoardContainer = styled.div`
  width: 100%;

  h3 {
    font-size: 1.5rem;
    margin-left: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Board = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  border-top: 3px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  border-left: 3px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  border-bottom: 3px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  border-right: 2px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  max-height: 600px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(p) =>
      p.theme.id != Theme.Dark ? "#ceebff" : "#666666"};
    border: 2px none #ffffff;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }
`;

const Task = styled.div`
  display: flex;
  border-bottom: 3px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};

  &:last-child {
    border-bottom: none;
  }
`;

const HeaderBoard = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 3px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  position: sticky;
  top: 0px;
  background: ${(p) => (p.theme.id != Theme.Dark ? "#bae6fd" : "#262626")};
`;

const DivWithBorderRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem 1rem;
  border-right: 3px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  font-weight: bold;
  width: 5rem;
`;

const DateDiv = styled(DivWithBorderRight)`
  width: 6rem;
`;

const TaskDiv = styled(DivWithBorderRight)`
  flex-grow: 1;
  padding: 0.5rem 0.5rem;
`;

const StatusDiv = styled(DivWithBorderRight)`
  background: rgb(226, 68, 92);
  color: white;
`;

const ActionsDiv = styled(DivWithBorderRight)`
  border-right: 2px solid
    ${(p) => (p.theme.id != Theme.Dark ? "#5d9ac5" : "#949494")};
  font-weight: bold;
  width: 7rem;
`;

const NoTaskP = styled.p`
  padding: 3rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

interface Tasks {
  creator: { id: string; name: string };
  date: number;
  status: string;
  task: string;
  taskId: string;
}

const page = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Array<Tasks>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleChangeTask = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value.trimStart());
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "simpleTasks", id));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTask("");

    const splitName = auth.currentUser?.displayName?.split(" ");

    const newTask = {
      creator: {
        id: userId,
        name: splitName?.[0],
      },
      date: Date.now(),
      status: "pending",
      task: task.trimEnd(),
    };

    await addDoc(collection(db, "simpleTasks"), newTask);
  };

  const { userId } = userAuth();

  useEffect(() => {
    const q = query(
      collection(db, "simpleTasks"),
      where("creator.id", "==", userId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const fetchedTasks: Array<Tasks> = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data() as Tasks;

        const taskId = doc.id;

        data.taskId = taskId;

        fetchedTasks.push(data);
      });

      fetchedTasks.sort((a, b) => Number(b.date) - Number(a.date));

      setTasks(fetchedTasks);
    });

    return () => unsubscribe();
  }, [userId]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Container>
      <HeadDiv>
        <h1>Simple Tasks</h1>
        <h4>
          In this section you can write simple tasks, something to do the same
          day or to do in the future.
        </h4>
      </HeadDiv>

      <AddTaskForm onSubmit={handleSubmit}>
        <Input
          $secondary
          required
          type="text"
          onChange={handleChangeTask}
          value={task}
        />
        <button>add new task</button>
      </AddTaskForm>

      <BoardContainer>
        <h3>Tasks</h3>

        <Board>
          <HeaderBoard>
            <DateDiv>Date</DateDiv>
            <TaskDiv>Task</TaskDiv>
            <DivWithBorderRight>Status</DivWithBorderRight>
            <ActionsDiv>Actions</ActionsDiv>
          </HeaderBoard>

          <div>
            {isLoading ? (
              <Loading />
            ) : tasks.length === 0 ? (
              <NoTaskP>You haven't scored any tasks yet!</NoTaskP>
            ) : (
              tasks.map((task: any, i: number) => {
                return (
                  <Task key={i}>
                    <DateDiv>
                      <p>{formatDate(task.date)}</p>
                    </DateDiv>
                    <TaskDiv>{task.task}</TaskDiv>
                    <StatusDiv></StatusDiv>
                    <ActionsDiv>
                      <button>edit</button>
                      <button
                        onClick={() => {
                          handleDelete(task.taskId);
                        }}
                      >
                        delete
                      </button>
                    </ActionsDiv>
                  </Task>
                );
              })
            )}
          </div>
        </Board>
      </BoardContainer>
    </Container>
  );
};

export default page;
