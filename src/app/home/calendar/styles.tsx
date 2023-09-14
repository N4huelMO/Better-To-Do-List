import styled from "styled-components";

export const FullCalendarWrapper = styled.div`
  --fc-border-color: ${(p) => p.theme.home.calendar.calendarBorder};

  --fc-today-bg-color: ${(p) => p.theme.home.calendar.todayBackground};

  --fc-button-bg-color: ${(p) => p.theme.home.calendar.buttonBackground};

  --fc-button-hover-bg-color: ${(p) =>
    p.theme.home.calendar.buttonBackgroundHover};

  --fc-button-border-color: ${(p) => p.theme.home.calendar.primary};

  --fc-button-hover-border-color: ${(p) => p.theme.home.calendar.primary};

  --fc-button-active-bg-color: ${(p) => p.theme.home.calendar.primary};

  --fc-button-active-border-color: ${(p) => p.theme.home.calendar.primary};

  --fc-event-bg-color: ${(p) => p.theme.home.calendar.eventBackground};

  --fc-event-border-color: ${(p) => p.theme.home.calendar.eventBorder};

  --fc-event-text-color: ${(p) => p.theme.bodyFontColor};

  .fc-daygrid-block-event .fc-event-time,
  .fc-daygrid-block-event .fc-event-title {
    display: flex;
    justify-content: center;
  }
`;
