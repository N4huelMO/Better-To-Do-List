"use client";
import React, { useState, useEffect } from "react";

import { useParams } from "next/navigation";
import {
  collection,
  deleteDoc,
  deleteField,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import userAuth from "@/helpers/userAuth";
import Loading from "@/components/Loading";
import { styled } from "styled-components";
import { ButtonForm, HomeForm, Input } from "@/styles/sharedStyles";
import { Theme } from "@/helpers/constants";
import {
  TbEdit,
  TbSquareRounded,
  TbSquareRoundedCheck,
  TbTrash,
} from "react-icons/tb";

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

interface List {
  creator: { id: string; name: string };
  date: number;
  id: string;
  name: string;
  tasks: Array<Task>;
}

interface Task {
  complete: boolean;
  description: string;
  id: string;
}

const page = () => {
  const [data, setData] = useState<List>();
  const [task, setTask] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [idTask, setIdTask] = useState<string>("");

  const params = useParams();

  const listId = params.list;

  const { currentUser } = userAuth();

  const listRef = doc(db, "Lists", listId);

  const listTasksRef = data?.tasks;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleDelete = async (id: string) => {
    const updatedTasks = listTasksRef?.filter((task) => task.id !== id);

    await updateDoc(listRef, {
      tasks: updatedTasks,
    });
  };

  const handleEdit = async (e: Task) => {
    const { id, description } = e;
    setIdTask(id);
    setTask(description);
  };

  const handleStatus = async (e: Task) => {
    const { id, complete } = e;

    const updatedTaskStatus = listTasksRef?.map((selectedTask) => {
      if (selectedTask.id === id) {
        return {
          ...selectedTask,
          complete: !complete,
        };
      }
      return selectedTask;
    });

    await updateDoc(listRef, {
      tasks: updatedTaskStatus,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idTask) {
      setIdTask("");
      setTask("");

      const updatedTask = listTasksRef?.map((selectedTask) => {
        if (selectedTask.id === idTask) {
          return {
            ...selectedTask,
            description: task,
            complete: false,
          };
        }
        return selectedTask;
      });

      await updateDoc(listRef, {
        tasks: updatedTask,
      });

      return;
    }

    setTask("");

    await updateDoc(listRef, {
      tasks: [
        ...(data?.tasks ?? []),
        {
          complete: false,
          description: task,
          id: Date.now(),
        },
      ],
    });
  };

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      const q = query(collection(db, "Lists"), where("__name__", "==", listId));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setIsLoading(true);

        let fetchedList;

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const listId = doc.id;

          data.id = listId;

          fetchedList = data;
        });

        setData(fetchedList);

        setIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <H1>{data?.name}</H1>

          <HomeForm onSubmit={handleSubmit}>
            <AddTaskInput
              required
              type="text"
              value={task}
              onChange={handleChange}
            />
            <AddTaskButton>
              {idTask ? "edit task" : "add new task"}
            </AddTaskButton>
          </HomeForm>

          <TableContainer>
            <Table>
              {data?.tasks.length === 0 ? (
                <p>No tasks</p>
              ) : (
                data?.tasks.map((task) => (
                  <Task key={task.id}>
                    <TaskContent>
                      <TaskDescription $complete={task.complete}>
                        {task.description}
                      </TaskDescription>
                    </TaskContent>

                    <TaskButtonsDiv>
                      <TaskButton onClick={() => handleStatus(task)}>
                        {task.complete ? (
                          <TbSquareRoundedCheck
                            size={27}
                          ></TbSquareRoundedCheck>
                        ) : (
                          <TbSquareRounded size={27}></TbSquareRounded>
                        )}
                      </TaskButton>

                      <TaskButton onClick={() => handleEdit(task)}>
                        <TbEdit size={27}></TbEdit>
                      </TaskButton>

                      <TaskButton onClick={() => handleDelete(task.id)}>
                        <TbTrash size={27}></TbTrash>
                      </TaskButton>
                    </TaskButtonsDiv>
                  </Task>
                ))
              )}
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default page;
