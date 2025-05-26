import Calendar from "@/components/Calendar";
import CreateButton from "@/components/common/CreateButton";

export default function Sidebar() {
  return (
    <aside className="w-64 shrink-0 pl-4 pr-7 box-border bg-[#F7FAFD]">
      <div className="flex items-center h-21">
        <CreateButton />
      </div>
      <div className="pl-[14px]">
        <Calendar />
      </div>
    </aside>
  );
}
