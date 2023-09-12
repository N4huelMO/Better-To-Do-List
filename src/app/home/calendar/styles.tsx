import styled from "styled-components";
import { Theme } from "@/helpers/constants";

export const FullCalendarWrapper = styled.div`
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
