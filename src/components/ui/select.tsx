"use client";

import { Select as BaseSelect } from "@base-ui/react/select";
import type * as React from "react";
import { cn } from "@/lib/utils/cn";

export type SelectItem<Value extends string> = {
  value: Value;
  label: string;
};

export type SelectProps<Value extends string> = {
  items: Array<SelectItem<Value>>;
  value: Value;
  onValueChange: (value: Value) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
};

export function Select<Value extends string>({
  items,
  value,
  onValueChange,
  placeholder,
  ariaLabel,
  className,
}: SelectProps<Value>) {
  return (
    <BaseSelect.Root<Value>
      items={items}
      value={value}
      onValueChange={(v) => onValueChange(v!)}
    >
      <BaseSelect.Trigger
        data-slot="select-trigger"
        aria-label={ariaLabel}
        className={cn(
          "h-10 w-full rounded-[var(--radius)] px-3",
          "bg-[color:var(--color-surface)] text-[color:var(--color-primary)]",
          "border border-[color:var(--color-muted)]",
          "flex items-center justify-between gap-2",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)]",
          className,
        )}
      >
        <BaseSelect.Value
          data-slot="select-value"
          placeholder={placeholder}
          className="text-sm"
        />
        <BaseSelect.Icon
          data-slot="select-icon"
          className="text-[color:var(--color-muted)]"
        >
          <ChevronUpDownIcon />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>

      <BaseSelect.Portal>
        <BaseSelect.Positioner
          data-slot="select-positioner"
          className="z-50"
          sideOffset={8}
          alignItemWithTrigger={false}
        >
          <BaseSelect.Popup
            data-slot="select-popup"
            className={cn(
              "min-w-[var(--anchor-width)] rounded-[var(--radius)]",
              "border border-[color:var(--color-muted)] bg-[color:var(--color-surface)]",
              "shadow-sm outline-none p-1",
            )}
          >
            <BaseSelect.List
              data-slot="select-list"
              className="max-h-64 overflow-auto"
            >
              {items.map((item) => (
                <BaseSelect.Item
                  key={item.value}
                  value={item.value}
                  data-slot="select-item"
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-[var(--radius)] px-2 py-2",
                    "text-sm text-[color:var(--color-primary)]",
                    "cursor-pointer select-none",
                    "outline-none",
                    "data-[highlighted]:bg-[color:var(--color-muted)]/15",
                    "data-[selected]:bg-[color:var(--color-muted)]/10",
                  )}
                >
                  <BaseSelect.ItemText
                    data-slot="select-item-text"
                    className="truncate"
                  >
                    {item.label}
                  </BaseSelect.ItemText>

                  <BaseSelect.ItemIndicator
                    data-slot="select-item-indicator"
                    className="text-[color:var(--color-primary)]"
                  >
                    <CheckIcon />
                  </BaseSelect.ItemIndicator>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
}

function ChevronUpDownIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="10"
      height="14"
      viewBox="0 0 10 14"
      fill="none"
      stroke="currentcolor"
      strokeWidth="1.5"
      aria-hidden="true"
      {...props}
    >
      <path d="M1 5L5 1L9 5" />
      <path d="M1 9L5 13L9 9" />
    </svg>
  );
}

function CheckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentcolor"
      aria-hidden="true"
      {...props}
    >
      <path d="M10.3 2.2a.9.9 0 0 1 .1 1.3l-5 6a.9.9 0 0 1-1.3.1L1.6 7.6a.9.9 0 1 1 1.2-1.3l1.9 1.7 4.4-5.3a.9.9 0 0 1 1.2-.1z" />
    </svg>
  );
}
