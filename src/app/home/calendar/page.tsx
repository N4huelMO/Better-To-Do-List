"use client";
import React, { useEffect, useState } from "react";
import { HeadDiv } from "../styles";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import styled from "styled-components";
import { Theme } from "@/helpers/constants";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/firebase/config";
import userAuth from "@/helpers/userAuth";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppProvider";
import { AccInterface, Tasks } from "@/interfaces/interfaces";

const FullCalendarWrapper = styled.div`
  --fc-border-color: ${(p) => (p.theme.id != Theme.Dark ? "#89bde0" : "#fff")};

  --fc-today-bg-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#e0f2fe" : "#404040"};

  --fc-button-bg-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#0284c7" : "#525252"};

  --fc-button-hover-bg-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#0369a1" : "#404040"};

  --fc-button-border-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#082f49" : "#949494"};

  --fc-button-hover-border-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#082f49" : "#949494"};

  --fc-button-active-bg-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#082f49" : "#949494"};

  --fc-button-active-border-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#082f49" : "#949494"};

  --fc-event-bg-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#9cd6fd" : "#303030"};

  --fc-event-border-color: ${(p) =>
    p.theme.id != Theme.Dark ? "#4a81a7" : "#949494"};

  --fc-event-text-color: ${(p) => p.theme.bodyFontColor};

  .fc-daygrid-block-event .fc-event-time,
  .fc-daygrid-block-event .fc-event-title {
    display: flex;
    justify-content: center;
  }
`;

const page = () => {
  const { fetchIsLoading, setFetchIsLoading, tasks, setTasks } =
    useAppContext();

  const [windowWidth, setWindowWidth] = useState<number>(0);

  const { currentUser } = userAuth();

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

export default page;
