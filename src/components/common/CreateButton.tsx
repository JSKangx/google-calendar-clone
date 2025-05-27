// components/CreateButton.tsx
import { Plus } from "lucide-react"; // 아이콘 라이브러리
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface CreateButtonProps {
  className?: string;
  onClick?: () => void;
}

export default function CreateButton({
  className,
  onClick,
}: CreateButtonProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "inline-flex items-center gap-2 px-4 py-4 rounded-xl bg-white shadow-lg",
        "text-gray-800 hover:bg-gray-50 border border-gray-200",
        className
      )}
    >
      <Plus className="size-6 stroke-[2]" />
      <span className="text-sm font-medium">만들기</span>
      <ChevronDown className="w-4 h-4" />
    </div>
  );
}
