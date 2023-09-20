"use client";
import React, { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { collection, onSnapshot, query, where } from "firebase/firestore";

import { db } from "@/firebase/config";

import useAuth from "@/helpers/useAuth";

import Loading from "@/components/Loading";

import { useAppContext } from "@/context/AppProvider";

import { AccInterface, Tasks } from "@/interfaces/interfaces";

import { FullCalendarWrapper } from "./styles";
import { HeadDiv } from "@/styles/sharedStyles";

const CalendarPage = () => {
  const { fetchIsLoading, setFetchIsLoading, tasks, setTasks } =
    useAppContext();

  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { currentUser } = useAuth();

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

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

        setTasks(fetchedTasks);

        setFetchIsLoading(false);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const countTasksByDate = (tasks: Tasks[]) => {
    const completedTasks = tasks.filter((task) => !task.complete);

    const results = completedTasks.reduce((acc: AccInterface, task) => {
      const date = task.date;

      if (!acc[date]) {
        acc[date] = 1;
      } else {
        acc[date] += 1;
      }

      return acc;
    }, {});

    return Object.entries(results).map(([date, count]) => ({
      date,
      title: count.toString(),
    }));
  };

  const events = countTasksByDate(tasks);

  return (
    <>
      <HeadDiv>
        <h1>Calendar</h1>

        <h4>
          In this section you can see a general view of the simple tasks in
          calendar
        </h4>
      </HeadDiv>

      {fetchIsLoading ? (
        <Loading $calendar />
      ) : (
        <FullCalendarWrapper>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            events={events}
            initialView="dayGridMonth"
            height={700}
            buttonText={{ today: "Today" }}
            titleFormat={{
              year: "numeric",
              month: `${windowWidth < 480 ? "short" : "long"}`,
            }}
          />
        </FullCalendarWrapper>
      )}
    </>
  );
};

export default CalendarPage;
