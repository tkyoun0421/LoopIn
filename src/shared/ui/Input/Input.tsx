import clsx from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxCharCount?: number;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      showCharCount,
      maxCharCount,
      className,
      value,
      ...props
    },
    ref,
  ) => {
    const hasError = !!error;
    const currentLength = typeof value === "string" ? value.length : 0;

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-[hsl(var(--foreground))]">
            {label}
          </label>
        )}

        <input
          ref={ref}
          value={value}
          className={clsx(
            "mt-1.5 w-full rounded-md border px-3 py-2 text-sm transition-colors",
            "bg-[hsl(var(--background))] text-[hsl(var(--foreground))]",
            "placeholder:text-[hsl(var(--muted-foreground))]",
            "focus:ring-2 focus:ring-[hsl(var(--ring))] focus:ring-offset-2 focus:outline-none",
            hasError
              ? "border-red-500 focus:border-red-500"
              : "border-[hsl(var(--border))] focus:border-[hsl(var(--ring))]",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />

        <div className="flex min-h-[1rem] items-center justify-between">
          <div className="text-xs">
            {error && <span className="text-red-500">{error}</span>}
            {!error && helperText && (
              <span className="text-[hsl(var(--muted-foreground))]">
                {helperText}
              </span>
            )}
          </div>

          {showCharCount && maxCharCount && (
            <span
              className={clsx(
                "text-xs",
                currentLength > maxCharCount
                  ? "text-red-500"
                  : "text-[hsl(var(--muted-foreground))]",
              )}
            >
              {currentLength}/{maxCharCount}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
