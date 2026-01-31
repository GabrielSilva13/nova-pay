import type * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils/cn";

const buttonStyles = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "rounded-[var(--radius)]",
    "px-3 py-2 text-sm font-medium",
    "transition",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
    "disabled:opacity-50 disabled:pointer-events-none",
  ].join(" "),
  variants: {
    intent: {
      primary:
        "bg-[color:var(--color-primary)] text-[color:var(--color-surface)] hover:opacity-90",
      secondary:
        "bg-[color:var(--color-secondary)] text-[color:var(--color-surface)] hover:opacity-90",
      ghost:
        "bg-transparent text-[color:var(--color-primary)] hover:bg-[color:var(--color-muted)]",
      destructive:
        "bg-[color:var(--color-destructive)] text-[color:var(--color-surface)] hover:opacity-90",
    },
    size: {
      sm: "h-8 px-2",
      md: "h-10 px-3",
      lg: "h-12 px-4 text-base",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export function Button({
  className,
  intent,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      type={type}
      className={cn(buttonStyles({ intent, size }), className)}
      {...props}
    />
  );
}
