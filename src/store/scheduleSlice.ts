import { DUMMY_EVENTS } from "@/constants/events";
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
      state.schedules = state.schedules.filter(
        (schedule) => schedule.id !== action.payload
      );
    },
  },
});

export const { addSchedule, removeSchedule } = scheduleSlice.actions;

export default scheduleSlice;
