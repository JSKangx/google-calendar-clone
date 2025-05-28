import { createSlice } from "@reduxjs/toolkit";

export interface Schedule {
  id: number;
  title: string;
  start: string;
  end: string;
}

interface InitialState {
  schedules: Schedule[];
}

const DUMMY_EVENTS = [
  {
    id: 1,
    title: "강진수 링글 수업",
    start: new Date(2025, 4, 26, 13, 0).toISOString(),
    end: new Date(2025, 4, 26, 13, 20).toISOString(),
  },
  {
    id: 2,
    title: "강진수 링글 면접",
    start: new Date(2025, 4, 29, 14, 0).toISOString(),
    end: new Date(2025, 4, 29, 15, 0).toISOString(),
  },
  {
    id: 3,
    title: "사전 과제",
    start: new Date(2025, 4, 26, 8, 0).toISOString(),
    end: new Date(2025, 4, 28, 23, 59).toISOString(),
  },
];

const initialState: InitialState = {
  schedules: DUMMY_EVENTS,
};

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    addSchedule: (state, action) => {
      state.schedules.push(action.payload);
    },
    removeSchedule: (state, action) => {
      state.schedules.filter((schedule) => schedule.id !== action.payload.id);
    },
  },
});

export const { addSchedule, removeSchedule } = scheduleSlice.actions;

export default scheduleSlice;
