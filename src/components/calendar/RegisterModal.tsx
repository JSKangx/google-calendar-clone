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
import getStartTime from "@/utils/getStartTime";
import { cn } from "@/lib/utils";
import DatePicker from "@/components/DatePicker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    setIsEditing(false);
  };

  // 일정 입력 드롭다운 상태 관리
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
  const dateString = useSelector((state: RootState) => state.dateStore.date);
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const today = date.getDate();
  const day = date.getDay();
  const hour = date.getHours();
  const min = date.getMinutes();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleCloseModal()}
      className="fixed inset-0 z-10"
    >
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="fixed bottom-10 left-10">
          <DialogPanel className="w-[440px] h-[514px] bg-gray-10 rounded-2xl p-4 drop-shadow-lg/50">
            <section className="flex mb-5">
              <IconWrapper wrapperSize="size-4 ml-auto">
                <X className="size-4" onClick={() => handleCloseModal()} />
              </IconWrapper>
            </section>

            <section>
              <form className="flex flex-col gap-6">
                <div className="ml-13">
                  <Input classNames="mb-3" />
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
                  <div
                    className={cn(
                      "rounded-sm p-2 flex-1 ",
                      isEditing ? "" : "hover:bg-gray-20"
                    )}
                  >
                    <div className="flex gap-4 text-sm">
                      <div className="relative">
                        <DropdownMenu
                          open={isDropOpen}
                          onOpenChange={setIsDropOpen}
                        >
                          {isEditing ? (
                            <div>
                              <div className="rounded-sm p-3 bg-gray-20">
                                {`${month}월 ${today}일 (${getDay(day)})`}
                              </div>
                            </div>
                          ) : (
                            <>
                              <DropdownMenuTrigger>
                                <p
                                  className="mb-0.5 hover:underline cursor-pointer"
                                  onClick={() => setIsEditing(true)}
                                >{`${month}월 ${today}일 (${getDay(day)})`}</p>
                              </DropdownMenuTrigger>
                              <p className="text-xs text-gray-60 font-normal">
                                <span className="after:ml-1 after:mr-1 after:content-['·']">
                                  시간대
                                </span>
                                <span>반복 안함</span>
                              </p>
                            </>
                          )}
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
                      {isEditing ? (
                        <div className="rounded-sm p-3 bg-gray-20">
                          {getStartTime(hour, min)}
                        </div>
                      ) : (
                        <span
                          className="hover:underline cursor-pointer"
                          onClick={() => setIsEditing(true)}
                        >
                          {getStartTime(hour, min)}
                        </span>
                      )}
                      <span
                        className={cn(isEditing ? "flex items-center" : "")}
                      >
                        -
                      </span>
                      {isEditing ? (
                        <>
                          <div className="rounded-sm p-3 bg-gray-20">
                            {getStartTime(hour + 1, min)}
                          </div>
                        </>
                      ) : (
                        <>
                          <span
                            className="hover:underline cursor-pointer"
                            onClick={() => setIsEditing(true)}
                          >
                            {getStartTime(hour + 1, min)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </section>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
