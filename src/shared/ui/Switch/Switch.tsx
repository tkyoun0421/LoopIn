import clsx from "clsx";
import { InputHTMLAttributes, forwardRef } from "react";

interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, checked, className, ...props }, ref) => {
    return (
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            checked={checked}
            className="sr-only"
            {...props}
          />
          <div
            className={clsx(
              "h-6 w-11 cursor-pointer rounded-full transition-colors duration-200 ease-in-out",
              checked ? "bg-[hsl(var(--primary))]" : "bg-[hsl(var(--muted))]",
              className,
            )}
            onClick={() => {
              if (props.onChange) {
                const event = {
                  target: { checked: !checked },
                } as React.ChangeEvent<HTMLInputElement>;
                props.onChange(event);
              }
            }}
          >
            <div
              className={clsx(
                "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
                checked ? "translate-x-5" : "translate-x-0",
              )}
            />
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-[hsl(var(--foreground))]">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-[hsl(var(--muted-foreground))]">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export default Switch;
