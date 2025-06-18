import { JSX } from "react";
import { createPortal } from "react-dom";

import useToastStore from "@shared/stores/useToastStore";
import Toast from "@shared/ui/Toast/Toast";

const ToastContainer = (): JSX.Element | null => {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return createPortal(
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col-reverse gap-3">
      {toasts.map(toast => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast toast={toast} onRemove={removeToast} />
        </div>
      ))}
    </div>,
    document.body,
  );
};

export default ToastContainer;
