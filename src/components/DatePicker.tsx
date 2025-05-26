import { useState } from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import { ko } from "react-day-picker/locale";
import "@/styles/datePicker.scss";

export default function DatePicker() {
  const [selected, setSelected] = useState<Date | undefined>();
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      locale={ko}
      mode="single"
      selected={selected}
      onSelect={setSelected}
      formatters={{
        formatCaption(month) {
          return month.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
          });
        },
      }}
      classNames={{
        day: `${defaultClassNames.day} rounded-full cursor-pointer text-[10px] hover:bg-[#E8EBEE] size-6`,
        selected: `bg-[#B1D7EE] rounded-full size-6 !hover:bg-[#B9D6EC]`,
        day_button: `size-6 rounded-full m-[2px]`,
        today: `size-6 bg-primary text-white rounded-full !hover:bg-primary`,
        weekday: `${defaultClassNames.weekday} !text-[10px]`,
        month_grid: `${defaultClassNames.month_grid}`,
        month_caption: `${defaultClassNames.month_caption} !text-[14px]`,
        root: `${defaultClassNames.root}`,
        chevron: `${defaultClassNames.chevron} size-[14px] text-[#444746]`,
      }}
    />
  );
}
