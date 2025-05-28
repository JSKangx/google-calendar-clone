import Button from "@/components/common/Button";
import HamburgerIcon from "@/assets/icons/hambuger.svg?react";
import LeftArrowIcon from "@/assets/icons/arrow_left.svg?react";
import RightArrowIcon from "@/assets/icons/arrow_right.svg?react";
import MagnifyIcon from "@/assets/icons/magnify.svg?react";
import QuestionIcon from "@/assets/icons/question.svg?react";
import SettingIcon from "@/assets/icons/setting.svg?react";
import CalendarIcon from "@/assets/icons/calendar.svg?react";
import CheckCircleIcon from "@/assets/icons/check_circle.svg?react";
import MenuIcon from "@/assets/icons/menu.svg?react";
import ProfileIcon from "@/assets/icons/profile.svg?react";
import IconWrapper from "@/components/common/IconWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setDate } from "@/store/dateSlice";
import type { RootState } from "@/store/store";
import { setView } from "@/store/calendarViewSlice";

export default function Header() {
  // 오늘 날짜
  const today = new Date();
  const day = today.getDate();

  // 선택한 날짜 상태 관리
  const selectedDateString = useSelector(
    (state: RootState) => state.dateStore.date
  );
  const selectedDate = new Date(selectedDateString);
  const { selectedYear, selectedMonth, selectedDay } = {
    selectedYear: selectedDate.getFullYear(),
    selectedMonth: selectedDate.getMonth() + 1,
    selectedDay: selectedDate.getDate(),
  };
  const dispatch = useDispatch();
  const onTodayBtnClick = () => {
    dispatch(setDate(today.toISOString()));
  };

  // 화살표로 달력 이동하기
  const onPreviousClick = () => {
    dispatch(
      setDate(
        new Date(selectedYear, selectedMonth - 1, selectedDay - 7).toISOString()
      )
    );
  };
  const onNextClick = () => {
    dispatch(
      setDate(
        new Date(selectedYear, selectedMonth - 1, selectedDay + 7).toISOString()
      )
    );
  };

  // 캘린더 뷰 변경하기 위한 상태 관리
  const viewType = useSelector(
    (state: RootState) => state.calendarViewStore.view
  );
  const switchViewType = () => {
    if (viewType === "week") {
      dispatch(setView("month"));
    } else {
      dispatch(setView("week"));
    }
  };

  return (
    <header className="flex items-center *:flex *:items-center h-16 w-full px-2 py-3 bg-[#F7FAFD] text-gray-90">
      <section className="sm:flex sm:w-62 sm:shrink-0 sm:opacity-100 w-0 opacity-0">
        <div className="flex justify-center items-center rounded-full size-12 hover:bg-[#E8EBEE] cursor-pointer">
          <HamburgerIcon className="size-4 text-[#444746]" />
        </div>
        <img
          className="size-10 mr-2"
          src={`https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${day}_2x.png`}
          srcSet={`https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${day}_2x.png 1x, https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_${day}_2x.png 2x`}
          alt=""
          aria-hidden="true"
          role="presentation"
        ></img>
        <span className="font-sans text-[22px]">Calendar</span>
      </section>

      <section className="shrink-0">
        <Button
          className="mr-6 py-2 px-6 hover:bg-[#E8EBEE] cursor-pointer"
          onClick={() => onTodayBtnClick()}
        >
          오늘
        </Button>
        <div className="flex mr-7">
          <IconWrapper wrapperSize="size-8">
            <LeftArrowIcon
              className="size-3 text-[#444746]"
              onClick={() => onPreviousClick()}
            />
          </IconWrapper>
          <IconWrapper wrapperSize="size-8">
            <RightArrowIcon
              className="size-3 text-[#444746]"
              onClick={() => onNextClick()}
            />
          </IconWrapper>
        </div>
        <span className="text-[22px]">{`${selectedYear}년 ${selectedMonth}월`}</span>
      </section>

      <section className="flex gap-1 ml-auto mr-2 text-[#444746]">
        <IconWrapper wrapperSize="size-10">
          <MagnifyIcon className="size-5" />
        </IconWrapper>
        <IconWrapper wrapperSize="size-10">
          <QuestionIcon className="size-5" />
        </IconWrapper>
        <IconWrapper wrapperSize="size-10">
          <SettingIcon className="size-5" />
        </IconWrapper>
        <Button
          className="text-gray-90 py-2 px-6 mx-2 cursor-pointer hover:bg-gray-20"
          onClick={() => switchViewType()}
        >
          {viewType === "week" ? "주" : "월"}
        </Button>
        <Button className="flex px-5 mx-2 *:py-2">
          <div className="pr-3 border-r">
            <CalendarIcon className="size-5" />
          </div>
          <div className="pl-3">
            <CheckCircleIcon className="size-5" />
          </div>
        </Button>
        <IconWrapper wrapperSize="size-10">
          <MenuIcon className="size-4" />
        </IconWrapper>
        <ProfileIcon className="size-8 ml-2" />
      </section>
    </header>
  );
}
