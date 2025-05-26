import type { IconWrapperProps } from "@/types/types";
import clsx from "clsx";

export default function IconWrapper({
  className,
  children,
  wrapperSize,
}: IconWrapperProps) {
  const iconClasses = clsx(
    "flex justify-center items-center rounded-full size-8 hover:bg-[#E8EBEE] cursor-pointer",
    wrapperSize,
    className
  );

  return <div className={iconClasses}>{children}</div>;
}
