import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "@/styles/datePicker.scss";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { setDate, setMonth } from "@/store/dateSlice";

interface Props {
  className?: string;
  setIsDropOpen?: () => void;
}

export default function DatePicker({ className, setIsDropOpen }: Props) {
  // 선택한 일, 월 상태 관리
  const dateString = useSelector((state: RootState) => state.dateStore.date);
  const monthString = useSelector((state: RootState) => state.dateStore.month);
  const date = new Date(dateString);
  const month = new Date(monthString);
  const dispatch = useDispatch();
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={ko}
      mode="single"
      selected={date}
      onSelect={(selected) => {
        if (selected) {
          dispatch(setDate(selected.toISOString()));
          setIsDropOpen?.();
        }
      }}
      month={month}
      onMonthChange={(newMonth) => dispatch(setMonth(newMonth.toISOString()))}
      formatters={{
        formatCaption(month) {
          return month.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
          });
        },
      }}
      classNames={{
        day: `${defaultClassNames.day} rounded-full cursor-pointer text-[10px] hover:bg-[#E8EBEE] aria-selected:hover:bg-[#B1D7EE] data-today:bg-[#0a52c4] data-today:hover:bg-[#0a52c4] size-6`,
        selected: `bg-[#B1D7EE] rounded-full size-6 hover:bg-[#B9D6EC]`,
        day_button: `size-6 rounded-full m-[2px] cursor-pointer`,
        today: `size-6 bg-[#0a52c4] text-white rounded-full hover:bg-[#0a52c4]`,
        weekday: `${defaultClassNames.weekday} !text-[10px]`,
        month_grid: `${defaultClassNames.month_grid}`,
        month_caption: `${defaultClassNames.month_caption} !text-[14px]`,
        root: `${defaultClassNames.root}`,
        chevron: `${defaultClassNames.chevron} size-[14px] text-[#444746]`,
      }}
      className={className}
    />
  );
}
