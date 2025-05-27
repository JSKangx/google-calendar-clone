import { cn } from "@/lib/utils";

interface Props {
  classNames?: string;
}

export default function Input({ classNames }: Props) {
  return (
    <input
      className={cn(
        "text-[22px] w-full border-b border-gray-20 focus:outline-0 focus:border-b-3 focus:border-b-[#0a52c4] placeholder:text-gray-60 placeholder:font-normal",
        classNames
      )}
      placeholder="제목 추가"
    />
  );
}
