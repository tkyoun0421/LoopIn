import { CheckCircle, Info, X, XCircle } from "lucide-react";
import { JSX, useEffect, useState } from "react";

import { Toast as ToastType } from "@shared/stores/useToastStore";
import Button from "@shared/ui/Button/Button";

const TOAST_ANIMATION_DURATION = 300;

const toastStyles = {
  info: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-800",
    icon: "text-blue-500",
    IconComponent: Info,
  },
  success: {
    bg: "bg-green-50 dark:bg-green-950/30",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-500",
    IconComponent: CheckCircle,
  },
  error: {
    bg: "bg-red-50 dark:bg-red-950/30",
    border: "border-red-200 dark:border-red-800",
    icon: "text-red-500",
    IconComponent: XCircle,
  },
} as const;

const Toast = ({ toast, onRemove }: ToastProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const style = toastStyles[toast.type];
  const { IconComponent } = style;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(toast.id);
    }, TOAST_ANIMATION_DURATION);
  };

  return (
    <div
      className={`transform transition-all duration-300 ease-in-out ${
        isVisible && !isLeaving
          ? "translate-y-0 opacity-100"
          : "translate-y-full opacity-0"
      } ${style.bg} ${style.border} w-full max-w-sm rounded-lg border p-4 shadow-lg`}
    >
      <div className="flex items-start gap-3">
        <IconComponent
          className={`${style.icon} mt-0.5 flex-shrink-0`}
          size={20}
        />

        <div className="min-w-0 flex-1">
          <h4 className="mb-1 font-medium text-[hsl(var(--foreground))]">
            {toast.title}
          </h4>
          {toast.message && (
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              {toast.message}
            </p>
          )}
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="h-6 w-6 flex-shrink-0 !p-0 hover:bg-[hsl(var(--muted))]"
        >
          <X size={14} />
        </Button>
      </div>
    </div>
  );
};

export default Toast;

type ToastProps = {
  toast: ToastType;
  onRemove: (id: string) => void;
};
