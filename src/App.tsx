import { lazy } from "react";

const RegisterModal = lazy(() => import("@/components/calendar/RegisterModal"));
const ScheduleDetailModal = lazy(
  () => import("@/components/calendar/ScheduleDetailModal")
);
import Header from "@/components/layouts/Header";
import Sidebar from "@/components/layouts/Sidebar";

import CustomWeekHeader from "@/components/calendar/CustomWeekHeader";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "./App.css";
import "@/styles/calendar.scss";
import { getFormattedDate } from "@/utils/getFormattedDate";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useState } from "react";
import { type Schedule } from "@/store/scheduleSlice";

function App() {
  // 일정 상세 모달 오픈 상태 관리
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  // 일정 상세 데이터 상태 관리
  const [scheduleDetail, setScheduleDetail] = useState<Schedule>({
    id: 9999,
    title: "",
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  });

  const localizer = momentLocalizer(moment);
  const dateString = useSelector((state: RootState) => state.dateStore.date);
  const schedules = useSelector(
    (state: RootState) => state.scheduleStore.schedules
  );
  const formattedEvents = schedules.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  const date = dateString ? new Date(dateString) : undefined;

  return (
    <div className="flex flex-col h-screen w-screen">
      <RegisterModal />
      <ScheduleDetailModal
        isOpen={isDetailModalOpen}
        handleClose={() => setIsDetailModalOpen(false)}
        schedule={scheduleDetail}
      />
      <Header />
      <div className="flex flex-1 h-full">
        <Sidebar />
        <main className="bg-[#F7FAFD] w-full">
          <div className="h-full">
            <Calendar
              defaultView="week"
              localizer={localizer}
              events={formattedEvents}
              date={date}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={(event) => {
                setScheduleDetail({
                  ...event,
                  start: event.start.toISOString(),
                  end: event.end.toISOString(),
                });
                setIsDetailModalOpen(true);
              }}
              formats={{
                timeGutterFormat: (date) => {
                  const hour = moment(date).hour();
                  return getFormattedDate(hour);
                },
              }}
              components={{
                week: {
                  header: CustomWeekHeader,
                },
              }}
              className="max-w-[1150px] max-h-[720px] bg-white rounded-3xl overflow-hidden"
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
