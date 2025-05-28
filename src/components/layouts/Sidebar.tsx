import DatePicker from "@/components/calendar/DatePicker";
import CreateButton from "@/components/common/CreateButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { openModal } from "@/store/modalSlice";
import { useDispatch } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();

  return (
    <aside className="w-64 shrink-0 pl-4 pr-7 box-border bg-[#F7FAFD]">
      <div className="flex items-center h-21">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CreateButton />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => dispatch(openModal())}>
              이벤트
            </DropdownMenuItem>
            <DropdownMenuItem>할 일</DropdownMenuItem>
            <DropdownMenuItem>약속일정</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="pl-[14px]">
        <DatePicker />
      </div>
    </aside>
  );
}
