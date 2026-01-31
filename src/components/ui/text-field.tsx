"use client";

import { Field } from "@base-ui/react/field";
import { Input, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";

export type TextFieldProps = {
  label: string;
  error?: string;
  description?: string;
  className?: string;
  inputProps: InputProps;
};

export function TextField({
  label,
  error,
  description,
  className,
  inputProps,
}: TextFieldProps) {
  return (
    <Field.Root
      data-slot="text-field"
      invalid={Boolean(error) || undefined}
      className={cn("space-y-1", className)}
    >
      <Field.Label
        data-slot="text-field-label"
        className="text-sm text-[color:var(--color-primary)]"
      >
        {label}
      </Field.Label>

      {/* Em vez de Field.Control, usamos Base UI Input (compatível com Field) */}
      <Input aria-invalid={Boolean(error) || undefined} {...inputProps} />

      {error ? (
        <Field.Error
          data-slot="text-field-error"
          className="text-xs text-[color:var(--color-destructive)]"
        >
          {error}
        </Field.Error>
      ) : null}

      {description ? (
        <Field.Description
          data-slot="text-field-description"
          className="text-xs text-[color:var(--color-muted)]"
        >
          {description}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}
