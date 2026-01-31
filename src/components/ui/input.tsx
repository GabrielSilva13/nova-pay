"use client";

import { Input as BaseInput } from "@base-ui/react/input";
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type InputProps = React.ComponentPropsWithoutRef<typeof BaseInput> & {
  className?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return (
      <BaseInput
        ref={ref}
        data-slot="input"
        className={cn(
          "h-10 w-full rounded-[var(--radius)] px-3",
          "bg-[color:var(--color-surface)] text-[color:var(--color-primary)]",
          "border border-[color:var(--color-muted)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
          "data-[disabled]:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
