import type { ButtonProps } from "@/types/types";
import clsx from "clsx";

export default function Button({ className, children, onClick }: ButtonProps) {
  const buttonClasses = clsx(
    "ring-[0.7px] ring-gray-90 rounded-full text-sm",
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
}
