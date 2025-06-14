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
import HomeIcon from "@/assets/icons/home.svg?react";
import CheckCircle from "@/assets/icons/check_circle_blue.svg?react";
import HumanIcon from "@/assets/icons/human.svg?react";
import LocationIcon from "@/assets/icons/location.svg?react";

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
  // 한국어로 변경하는 로컬라이저
  const localizer = momentLocalizer(moment);

  // 선택된 날짜, 스케쥴 상태관리
  const dateString = useSelector((state: RootState) => state.dateStore.date);
  const schedules = useSelector(
    (state: RootState) => state.scheduleStore.schedules
  );
  // 시간 데이터 타입 가공
  const formattedEvents = schedules.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  const date = dateString ? new Date(dateString) : undefined;

  // 캘린더 뷰 상태관리
  const viewType = useSelector(
    (state: RootState) => state.calendarViewStore.view
  );

  return (
    <div className="flex flex-col h-screen">
      <RegisterModal />
      <ScheduleDetailModal
        isOpen={isDetailModalOpen}
        handleClose={() => setIsDetailModalOpen(false)}
        schedule={scheduleDetail}
      />
      <Header />
      <div className="sm:flex flex-1 h-full">
        <Sidebar />
        <main className="flex bg-[#F7FAFD] h-full w-full">
          <div className="flex-1">
            <Calendar
              defaultView={viewType}
              view={viewType}
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
              className="bg-white rounded-3xl overflow-hidden"
            />
          </div>
          <section className="sm:flex flex-col items-center justify-start w-13 pt-4 pr-2 gap-8 *:size-6 hidden">
            <HomeIcon />
            <CheckCircle className="size-5" />
            <HumanIcon />
            <LocationIcon />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
