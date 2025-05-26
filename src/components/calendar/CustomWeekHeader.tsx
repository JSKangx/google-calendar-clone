import { format, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import clsx from "clsx";

export default function CustomWeekHeader({ date }: { date: Date }) {
  const dayLabel = format(date, "E", { locale: ko }); // 요일 (일~토)
  const dateLabel = format(date, "d"); // 날짜 (1~31)
  const today = isToday(date);

  return (
    <div className="flex flex-col items-center gap-1 pt-2">
      <div className="text-[11px] text-gray-60">{dayLabel}</div>
      <div
        className={clsx(
          "size-[46px] flex items-center justify-center text-[25px] font-medium",
          today ? "bg-blue-600 text-white rounded-full" : "text-gray-800"
        )}
      >
        {dateLabel}
      </div>
    </div>
  );
}
