import IconWrapper from "@/components/common/IconWrapper";
import { removeSchedule, type Schedule } from "@/store/scheduleSlice";
import type { RootState } from "@/store/store";
import getDay from "@/utils/getDay";
import { getPeriodTime } from "@/utils/getPeriodTime";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface ScheduleDetailProps {
  isOpen: boolean;
  handleClose: () => void;
  schedule: Schedule;
}

export default function ScheduleDetailModal({
  isOpen,
  handleClose,
  schedule,
}: ScheduleDetailProps) {
  const start = new Date(schedule.start);
  const end = new Date(schedule.end);
  const { startYear, startMonth, startDate, startDay, startHour, startMin } = {
    startYear: start.getFullYear(),
    startMonth: start.getMonth(),
    startDate: start.getDate(),
    startDay: start.getDay(),
    startHour: start.getHours(),
    startMin: start.getMinutes(),
  };
  const { endYear, endMonth, endDate, endHour, endMin } = {
    endYear: end.getFullYear(),
    endMonth: end.getMonth(),
    endDate: end.getDate(),
    endHour: end.getHours(),
    endMin: end.getMinutes(),
  };

  const isSameDate =
    startYear === endYear && startMonth === endMonth && startDate === endDate;

  // 일정 삭제
  const schedules = useSelector(
    (state: RootState) => state.scheduleStore.schedules
  );
  const dispatch = useDispatch();
  const onDeleteSchedule = () => {
    const ok = confirm("이 일정을 삭제하시겠습니까?");
    if (ok) {
      const matched = schedules.find((item) => item.id === schedule.id);
      if (matched) {
        console.log(matched.id);
        dispatch(removeSchedule(matched.id));
        handleClose();
      }
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => handleClose()}>
      <div className="flex fixed inset-0 items-center justify-center z-30">
        <DialogPanel className="flex flex-col bg-gray-10 rounded-2xl p-6 drop-shadow-lg/50">
          <DialogTitle className="flex mb-2">
            <span className="text-2xl">{schedule.title}</span>
            <IconWrapper wrapperSize="size-4 ml-auto inline-flex">
              <Trash2 className="size-4" onClick={() => onDeleteSchedule()} />
            </IconWrapper>
            <IconWrapper wrapperSize="size-4 inline-flex">
              <X className="size-4" onClick={() => handleClose()} />
            </IconWrapper>
          </DialogTitle>
          {isSameDate ? (
            <div>
              <span className="after:ml-3 after:mr-3 after:content-['·']">{`${
                startMonth + 1
              }월 ${startDate}일 (${getDay(startDay)})`}</span>
              <span className="after:ml-1 after:mr-1 after:content-['~']">
                {getPeriodTime(startHour, startMin)}
              </span>
              <span>{getPeriodTime(endHour, endMin)}</span>
            </div>
          ) : (
            <div>
              <span className="after:ml-1 after:mr-1 after:content-['~']">{`${startYear}년 ${
                startMonth + 1
              }월 ${startDate}일, ${getPeriodTime(startHour, startMin)}`}</span>
              <span>{`${endYear}년 ${
                endMonth + 1
              }월 ${endDate}일, ${getPeriodTime(endHour, endMin)}`}</span>
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
