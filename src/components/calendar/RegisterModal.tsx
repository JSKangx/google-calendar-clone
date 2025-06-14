import type { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogPanel } from "@headlessui/react";
import { closeModal } from "@/store/modalSlice";
import { X } from "lucide-react";
import IconWrapper from "@/components/common/IconWrapper";
import Input from "@/components/common/Input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Clock } from "lucide-react";
import getDay from "@/utils/getDay";
import { getStartTime } from "@/utils/getStartTime";
import DatePicker from "@/components/calendar/DatePicker";
import { Controller, useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getTimeOptions } from "@/utils/getTimeOptions";
import { parseTimeLabel } from "@/utils/parseTimeLabel";
import type { FormValues } from "@/types/types";
import { convertToDate } from "@/utils/convertToDate";
import { addSchedule } from "@/store/scheduleSlice";
import DatePickerForEndDate from "@/components/calendar/DatePickerForEndDate";

export default function RegisterModal() {
  // 뱃지 선택 상태관리
  const [isSelected, setIsSelected] = useState<Record<string, boolean>>({
    event: true,
    toDo: false,
    schedule: false,
  });
  const handleSelectBadge = (key: keyof typeof isSelected) => {
    setIsSelected({
      event: false,
      toDo: false,
      schedule: false,
      [key]: true,
    });
  };

  // 모달 상태 관리
  const isOpen = useSelector((state: RootState) => state.modalStore.isOpen);
  const dispatch = useDispatch();
  const handleCloseModal = () => {
    dispatch(closeModal());
    setValue("title", "");
    setValue("startTime", getStartTime(hour, min));
    setValue("endTime", getStartTime(hour + 1, min));
    setEndDate(date);
  };

  // 일정 입력 드롭다운 상태 관리
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
  const [isEndDropOpen, setIsEndDropOpen] = useState<boolean>(false);
  const dateString = useSelector((state: RootState) => state.dateStore.date);
  // 달력 선택된 날짜 기준
  const date = new Date(dateString);
  const { month, today, day } = {
    month: date.getMonth() + 1,
    today: date.getDate(),
    day: date.getDay(),
  };
  // 현재 시각 기준
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  // 끝나는 날짜 상태관리
  const [endDate, setEndDate] = useState<Date>(new Date(dateString));
  // 달력 선택 날짜 변경시 모달에 입력한 끝날짜도 변경
  const { endMonth, endDay, endWeekDay } = {
    endMonth: endDate?.getMonth(),
    endDay: endDate?.getDate(),
    endWeekDay: endDate?.getDay(),
  };

  // 시간 옵션
  const timeOptions = getTimeOptions();

  // 이벤트 생성
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      title: "",
      startTime: getStartTime(hour, min),
      endTime: getStartTime(hour + 1, min),
    },
  });

  // 입력값 제출
  const schedules = useSelector(
    (state: RootState) => state.scheduleStore.schedules
  );
  const onSubmit = (formData: FormValues) => {
    const startTime = parseTimeLabel(formData.startTime);
    const endTime = parseTimeLabel(formData.endTime);
    const start = convertToDate(date, startTime);
    const end = convertToDate(endDate, endTime);

    // 제목 입력값 검증
    if (formData.title.trim() === "") {
      alert("일정 제목은 필수 입력입니다.");
    } else {
      // 시간 입력값 검증
      if (start.getTime() > end.getTime())
        alert(
          "일정 시작 시각보다 더 빠른 시각을 종료 시각으로 설정할 수 없습니다."
        );
      else {
        const payload = {
          id: schedules.length > 0 ? schedules[schedules.length - 1].id + 1 : 1,
          title: formData.title,
          start: start.toISOString(),
          end: end.toISOString(),
        };

        dispatch(addSchedule(payload));
        handleCloseModal();
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleCloseModal()} className="z-10">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed bottom-60 left-10">
          <DialogPanel className="flex flex-col bg-gray-10 rounded-2xl p-4 drop-shadow-lg/50">
            <section className="flex mb-5">
              <IconWrapper wrapperSize="size-4 ml-auto">
                <X className="size-4" onClick={() => handleCloseModal()} />
              </IconWrapper>
            </section>

            <section>
              <form
                className="flex flex-col gap-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="ml-13">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} classNames="mb-3" />
                    )}
                  />

                  <div className="flex gap-2">
                    <Badge
                      selected={isSelected.event}
                      onClick={() => handleSelectBadge("event")}
                    >
                      이벤트
                    </Badge>
                    <Badge
                      selected={isSelected.toDo}
                      onClick={() => handleSelectBadge("toDo")}
                    >
                      할 일
                    </Badge>
                    <Badge
                      selected={isSelected.schedule}
                      onClick={() => handleSelectBadge("schedule")}
                    >
                      약속 일정
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center ml-3 gap-[14px]">
                  <Clock className="size-5" />
                  <div className="flex-1">
                    <div className="flex text-sm">
                      {/* 시작 날짜 선택 */}
                      <div className="relative hover:bg-gray-20 p-2 rounded-sm shrink-0 mr-3">
                        <DropdownMenu
                          open={isDropOpen}
                          onOpenChange={setIsDropOpen}
                        >
                          <DropdownMenuTrigger>
                            <p className="mb-0.5 hover:underline cursor-pointer">{`${month}월 ${today}일 
                            (${getDay(day)})`}</p>
                          </DropdownMenuTrigger>
                          <p className="text-xs text-gray-60 font-normal">
                            <span className="after:ml-1 after:mr-1 after:content-['·']">
                              시간대
                            </span>
                            <span>반복 안함</span>
                          </p>
                          <DropdownMenuContent className="relative -right-15 -top-1">
                            <DropdownMenuItem className="focus:bg-white">
                              <DatePicker
                                setIsDropOpen={() => setIsDropOpen(false)}
                                className="z-20"
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* 이벤트 시간 */}
                      <Controller
                        control={control}
                        name="startTime"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="rounded-sm px-3 py-7 hover:bg-gray-20 border-0 shadow-none">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((item) => (
                                <SelectItem key={item.id} value={item.label}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <span className="flex items-center">-</span>

                      <Controller
                        control={control}
                        name="endTime"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="rounded-sm px-3 py-7 hover:bg-gray-20 border-0 shadow-none">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {timeOptions.map((item) => (
                                <SelectItem key={item.id} value={item.label}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />

                      {/* 종료 날짜 선택 */}
                      <div className="relative hover:bg-gray-20 p-2 rounded-sm shrink-0 mr-3">
                        <DropdownMenu
                          open={isEndDropOpen}
                          onOpenChange={setIsEndDropOpen}
                        >
                          <DropdownMenuTrigger>
                            <p className="mb-0.5 hover:underline cursor-pointer">{`${
                              endMonth + 1
                            }월 ${endDay}일 
                            (${getDay(endWeekDay)})`}</p>
                          </DropdownMenuTrigger>
                          <p className="text-xs text-gray-60 font-normal">
                            <span className="after:ml-1 after:mr-1 after:content-['·']">
                              시간대
                            </span>
                            <span>반복 안함</span>
                          </p>
                          <DropdownMenuContent className="relative -right-15 -top-1">
                            <DropdownMenuItem className="focus:bg-white">
                              <DatePickerForEndDate
                                endDate={endDate}
                                setEndDate={setEndDate}
                                setIsDropOpen={() => setIsEndDropOpen(false)}
                                className="z-20"
                              />
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="bg-primary-50 text-white text-[16px] font-medium px-6 py-2 rounded-full hover:bg-primary-40 active:bg-primary-60 transition-colors ml-auto">
                  저장
                </button>
              </form>
            </section>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
