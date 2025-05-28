import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  date: string;
  month: string;
}

const initialState: InitialState = {
  date: new Date().toISOString(), // state에 직렬화 값을 넣어야 함.
  month: new Date().toISOString(),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
      state.month = action.payload;
    },
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
});

export const { setDate, setMonth } = dateSlice.actions;

export default dateSlice;
