"use client";
import { auth, db } from "@/firebase/config";
import useAuth from "@/helpers/useAuth";

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
  InputButtonContainer,
  TaskDate,
} from "./styles";

import {
  CancelButton,
  DeleteCompletedTasks,
  DeleteCompletedTasksDiv,
  HeadDiv,
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

import { useAppContext } from "@/context/AppProvider";

import { Tasks } from "@/interfaces/interfaces";

const HomePage = () => {
  const {
    fetchIsLoading,
    setFetchIsLoading,
    task,
    setTask,
    tasks,
    setTasks,
    setIsLoading,
  } = useAppContext();

  const { currentUser } = useAuth();

  const defaultDate = new Date();

  const defaultValue = `${defaultDate.getFullYear()}-${(
    defaultDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${defaultDate.getDate().toString().padStart(2, "0")}`;

  const [date, setDate] = useState<string | number>(defaultValue);
  const [idTask, setIdTask] = useState<string>("");

  const taskUncompleted = tasks.filter((task) => !task.complete);

  const taskCompleted = tasks.filter((task) => task.complete);

  const minDate = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "task") {
      setTask(e.target.value.trimStart());
    } else if (e.target.id === "date") {
      setDate(e.target.value);
    }
  };

  const handleCancel = () => {
    setIdTask("");
    setTask("");
    setDate(defaultValue);
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

  const handleDeleteCompleted = async (e: Array<Tasks>) => {
    if (confirm("Do you want to delete completed tasks?")) {
      e.map((task) => handleDelete(task.id));

      setIdTask("");
      setTask("");
      setDate(defaultValue);
    }
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
        id: currentUser?.uid,
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
    setIsLoading(false);
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

        {idTask ? (
          <CancelButton onClick={handleCancel}>Cancel</CancelButton>
        ) : (
          <TaskRemaining>
            Tasks remaining: {taskUncompleted.length}
          </TaskRemaining>
        )}
      </HomeForm>

      <TableContainer>
        <Table>
          {fetchIsLoading ? (
            <Loading />
          ) : tasks.length === 0 ? (
            <NoData>You haven&apos;t scored any tasks yet!</NoData>
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
  );
};

export default HomePage;
