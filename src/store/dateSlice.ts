import { createSlice } from "@reduxjs/toolkit";

interface InitailState {
  date: string | undefined;
}

const initialState: InitailState = {
  date: new Date().toISOString(), // state에 직렬화 값을 넣어야 함.
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setDate } = dateSlice.actions;

export default dateSlice;
