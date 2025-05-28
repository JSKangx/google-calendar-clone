import { cn } from "@/lib/utils";
import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  classNames?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ classNames, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "text-[22px] w-full border-b border-gray-20 focus:outline-0 focus:border-b-3 focus:border-b-[#0a52c4] placeholder:text-gray-60 placeholder:font-normal",
          classNames
        )}
        placeholder="제목 추가"
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
