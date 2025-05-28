import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  view: "week" | "month";
}

const initialState: InitialState = {
  view: "week",
};

const calendarViewSlice = createSlice({
  name: "view",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { setView } = calendarViewSlice.actions;

export default calendarViewSlice;
