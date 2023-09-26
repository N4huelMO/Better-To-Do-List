"use client";
import React, { useState, useEffect } from "react";

import { useParams } from "next/navigation";

import { db } from "@/firebase/config";

import userAuth from "@/helpers/useAuth";

import Loading from "@/components/Loading";

import { useAppContext } from "@/context/AppProvider";

import { List, ListTask } from "@/interfaces/interfaces";

import {
  TbEdit,
  TbSquareRounded,
  TbSquareRoundedCheck,
  TbTrash,
} from "react-icons/tb";

import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { AddTaskButton, AddTaskInput } from "./styles";

import {
  CancelButton,
  DeleteCompletedTasks,
  DeleteCompletedTasksDiv,
  H1,
  HomeForm,
  NoData,
  Table,
  TableContainer,
  Task,
  TaskButton,
  TaskButtonsDiv,
  TaskContent,
  TaskDescription,
  TaskRemaining,
} from "@/styles/sharedStyles";

const ListPage = () => {
  const { fetchIsLoading, setFetchIsLoading, task, setTask } = useAppContext();

  const [data, setData] = useState<List>();
  const [idTask, setIdTask] = useState<string>("");

  const params = useParams();

  const listId = params.list;

  const { currentUser } = userAuth();

  const listRef = doc(db, "Lists", listId);

  const listTasksRef = data?.tasks;

  const taskUncompleted = data?.tasks.filter((task) => !task.complete);

  const taskCompleted = data?.tasks.filter((task) => task.complete) ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value.trimStart());
  };

  const handleCancel = () => {
    setIdTask("");
    setTask("");
  };

  const handleDelete = async (id: string) => {
    const updatedTasks = listTasksRef?.filter((task) => task.id !== id);

    await updateDoc(listRef, {
      tasks: updatedTasks,
    });
  };

  const handleEdit = async (e: ListTask) => {
    const { id, description } = e;
    setIdTask(id);
    setTask(description);
  };

  const handleStatus = async (e: ListTask) => {
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

  const handleDeleteCompleted = async (e: Array<ListTask>) => {
    if (confirm("Do you want to delete completed tasks?")) {
      e.map((task) => handleDelete(task.id));

      setIdTask("");
      setTask("");
    }
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
            description: task.trimEnd(),
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
          description: task.trimEnd(),
          id: Date.now(),
        },
      ],
    });
  };

  useEffect(() => {
    setFetchIsLoading(true);

    if (currentUser && currentUser.uid) {
      const q = query(collection(db, "Lists"), where("__name__", "==", listId));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let fetchedList;

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          const listId = doc.id;

          data.id = listId;

          fetchedList = data;
        });

        setData(fetchedList);

        setFetchIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <>
      {fetchIsLoading ? (
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

            {idTask ? (
              <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            ) : (
              <TaskRemaining>
                Tasks remaining: {taskUncompleted?.length}
              </TaskRemaining>
            )}
          </HomeForm>

          <TableContainer>
            <Table>
              {data?.tasks.length === 0 ? (
                <NoData>You haven&apos;t scored any tasks yet!</NoData>
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

          <DeleteCompletedTasksDiv>
            <DeleteCompletedTasks
              disabled={taskCompleted.length == 0}
              onClick={() => {
                handleDeleteCompleted(taskCompleted);
              }}
            >
              Delete completed tasks
            </DeleteCompletedTasks>
          </DeleteCompletedTasksDiv>
        </>
      )}
    </>
  );
};

export default ListPage;
