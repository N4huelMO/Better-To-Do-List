"use client";
import { auth, db } from "@/firebase/config";
import userAuth from "@/helpers/userAuth";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import React, { useState, useEffect } from "react";

import { formatDate } from "../../helpers/formatDate";

import Loading from "@/components/Loading";

import {
  TbEdit,
  TbTrash,
  TbSquareRoundedCheck,
  TbSquareRounded,
} from "react-icons/tb";

import {
  AddTaskButton,
  AddTaskDateInput,
  AddTaskInput,
  HeadDiv,
  InputButtonContainer,
  NoTasks,
  Table,
  TableContainer,
  Task,
  TaskButton,
  TaskButtonsDiv,
  TaskContent,
  TaskDate,
  TaskDescription,
  TaskRemaining,
} from "./styles";

import { HomeForm } from "@/styles/sharedStyles";
import { useAppContext } from "@/context/AppProvider";
import { Tasks } from "@/interfaces/interfaces";

const page = () => {
  const { fetchIsLoading, setFetchIsLoading, task, setTask, tasks, setTasks } =
    useAppContext();

  const defaultDate = new Date();

  const defaultValue = `${defaultDate.getFullYear()}-${(
    defaultDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${defaultDate.getDate().toString().padStart(2, "0")}`;

  const [date, setDate] = useState<string | number>(defaultValue);
  const [idTask, setIdTask] = useState<string>("");

  const minDate = new Date().toISOString().split("T")[0];

  const { currentUser } = userAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "task") {
      setTask(e.target.value.trimStart());
    } else if (e.target.id === "date") {
      setDate(e.target.value);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "simpleTasks", id));
  };

  const handleEdit = async (e: Tasks) => {
    const { id, description, date } = e;

    setIdTask(id);
    setTask(description);
    setDate(date);
  };

  const handleStatus = async (e: Tasks) => {
    const { id, complete } = e;

    const updatedTask = doc(db, "simpleTasks", id);

    await updateDoc(updatedTask, {
      complete: !complete,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (idTask) {
      const updatedTask = doc(db, "simpleTasks", idTask);

      setIdTask("");
      setTask("");
      setDate(defaultValue);

      await updateDoc(updatedTask, {
        description: task,
        date,
        complete: false,
      });

      return;
    }

    const splitName = auth.currentUser?.displayName?.split(" ");

    const newTask = {
      creator: {
        id: currentUser.uid,
        name: splitName?.[0],
      },
      date,
      complete: false,
      description: task.trimEnd(),
    };

    setTask("");
    setDate(defaultValue);

    await addDoc(collection(db, "simpleTasks"), newTask);
  };

  useEffect(() => {
    setFetchIsLoading(true);

    if (currentUser && currentUser.uid) {
      const q = query(
        collection(db, "simpleTasks"),
        where("creator.id", "==", currentUser.uid)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedTasks: Array<Tasks> = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as Tasks;

          const TaskId = doc.id;

          data.id = TaskId;

          fetchedTasks.push(data);
        });

        fetchedTasks.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setTasks(fetchedTasks);

        setFetchIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return (
    <>
      <HeadDiv>
        <h1>Simple Tasks</h1>
        <h4>
          In this section you can write simple tasks, something to do the same
          day or to do in the future.
        </h4>
      </HeadDiv>

      <HomeForm onSubmit={handleSubmit}>
        <AddTaskInput
          required
          type="text"
          onChange={handleChange}
          id="task"
          value={task}
        />

        <InputButtonContainer>
          <AddTaskDateInput
            type="date"
            min={minDate}
            value={date}
            id="date"
            onChange={handleChange}
          />
          <AddTaskButton>{idTask ? "edit task" : "add new task"}</AddTaskButton>
        </InputButtonContainer>

        <TaskRemaining>Task remaining: {tasks.length}</TaskRemaining>
      </HomeForm>

      <TableContainer>
        <Table>
          {fetchIsLoading ? (
            <Loading />
          ) : tasks.length === 0 ? (
            <NoTasks>You haven't scored any tasks yet!</NoTasks>
          ) : (
            tasks.map((task: Tasks, i: number) => (
              <Task key={i}>
                <TaskContent>
                  <TaskDate>{formatDate(task.date)}</TaskDate>
                  <TaskDescription $complete={task.complete}>
                    {task.description}
                  </TaskDescription>
                </TaskContent>

                <TaskButtonsDiv>
                  <TaskButton onClick={() => handleStatus(task)}>
                    {task.complete ? (
                      <TbSquareRoundedCheck size={27}></TbSquareRoundedCheck>
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
  );
};

export default page;
