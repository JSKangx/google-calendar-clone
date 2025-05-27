import dateSlice from "@/store/dateSlice";
import modalSlice from "@/store/modalSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    dateStore: dateSlice.reducer,
    modalStore: modalSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
