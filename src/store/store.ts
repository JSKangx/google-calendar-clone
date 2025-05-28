import calendarViewSlice from "@/store/calendarViewSlice";
import dateSlice from "@/store/dateSlice";
import modalSlice from "@/store/modalSlice";
import scheduleSlice from "@/store/scheduleSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    dateStore: dateSlice.reducer,
    modalStore: modalSlice.reducer,
    scheduleStore: scheduleSlice.reducer,
    calendarViewStore: calendarViewSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
