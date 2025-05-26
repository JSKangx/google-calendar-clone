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

export default function Header() {
  const date = new Date();
  const day = date.getDate();

  return (
    <header className="flex items-center *:flex *:items-center h-16 w-full px-2 py-3 bg-[#F7FAFD] text-gray-90">
      <section className="w-62">
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

      <section>
        <Button className="mr-6 py-2 px-6 hover:bg-[#E8EBEE]">오늘</Button>
        <div className="flex mr-7">
          <IconWrapper wrapperSize="size-8">
            <LeftArrowIcon className="size-3 text-[#444746]" />
          </IconWrapper>
          <IconWrapper wrapperSize="size-8">
            <RightArrowIcon className="size-3 text-[#444746]" />
          </IconWrapper>
        </div>
        <span className="text-[22px]">2025년 5월</span>
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
        <Button className="text-gray-90 py-2 px-6 mx-2">주</Button>
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
