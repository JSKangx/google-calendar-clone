import Header from "@/components/layouts/Header";
import "./App.css";
import Sidebar from "@/components/layouts/Sidebar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import CustomWeekHeader from "@/components/calendar/CustomWeekHeader";
import "@/styles/calendar.scss";
import { getFormattedDate } from "@/utils/getFormattedDate";

const events = [
  {
    title: "문성욱 온라인",
    start: new Date(2025, 4, 28, 0, 30),
    end: new Date(2025, 4, 28, 13, 30),
  },
  {
    title: "강진수 온라인",
    start: new Date(2025, 4, 27, 0, 0),
    end: new Date(2025, 4, 28, 0, 0),
  },
  {
    title: "김지민 온라인",
    start: new Date(2025, 4, 27, 0, 0),
    end: new Date(2025, 4, 28, 0, 0),
  },
  {
    title: "김지민 온라인",
    start: new Date(2025, 4, 27, 0, 0),
    end: new Date(2025, 4, 28, 0, 0),
  },
];

function App() {
  const localizer = momentLocalizer(moment);

  return (
    <div className="flex flex-col h-screen w-screen">
      <Header />
      <div className="flex flex-1 h-full">
        <Sidebar />
        <main className="bg-[#F7FAFD] w-full">
          <div className="bg-white rounded-tl-3xl h-full">
            <Calendar
              defaultView="week"
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
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
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
