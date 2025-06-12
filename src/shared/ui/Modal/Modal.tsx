import { X } from "lucide-react";
import { JSX, ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

import Button from "@shared/ui/Button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  showCloseButton?: boolean;
}

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps): JSX.Element | null => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative z-10 w-full ${sizeStyles[size]} animate-in fade-in-0 zoom-in-95 mx-4 max-h-[90vh] overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-xl duration-200`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-[hsl(var(--border))] p-4">
            {title && (
              <h2
                id="modal-title"
                className="text-lg font-semibold text-[hsl(var(--foreground))]"
              >
                {title}
              </h2>
            )}
            {showCloseButton && (
              <Button
                variant="ghost"
                size="md"
                onClick={onClose}
                className="h-8 w-8 !p-1 hover:bg-[hsl(var(--muted))]"
                aria-label="모달 닫기"
              >
                <X size={24} />
              </Button>
            )}
          </div>
        )}
        <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
