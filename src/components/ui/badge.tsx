import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

function Badge({
  className,
  selected,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & { asChild?: boolean; selected: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-2 py-2 text-sm font-normal w-fit whitespace-nowrap shrink-0 cursor-pointer [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
        selected
          ? "border-transparent bg-blue-20 text-black hover:bg-blue-40"
          : "border-transparent bg-transparent text-black hover:bg-gray-20",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
