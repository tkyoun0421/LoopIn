import { useCallback } from "react";

import useToastStore, { ToastType } from "@shared/stores/useToastStore";

interface ToastOptions {
  title: string;
  message?: string;
  duration?: number;
}

interface UseToastReturn {
  toast: (type: ToastType, options: ToastOptions) => void;
  success: (options: ToastOptions) => void;
  error: (options: ToastOptions) => void;
  info: (options: ToastOptions) => void;
  clearAll: () => void;
}

const useToast = (): UseToastReturn => {
  const { addToast, clearAllToasts } = useToastStore();

  const toast = useCallback(
    (type: ToastType, options: ToastOptions) => {
      addToast({
        type,
        title: options.title,
        message: options.message,
        duration: options.duration,
      });
    },
    [addToast],
  );

  const success = useCallback(
    (options: ToastOptions) => {
      toast("success", options);
    },
    [toast],
  );

  const error = useCallback(
    (options: ToastOptions) => {
      toast("error", options);
    },
    [toast],
  );

  const info = useCallback(
    (options: ToastOptions) => {
      toast("info", options);
    },
    [toast],
  );

  const clearAll = useCallback(() => {
    clearAllToasts();
  }, [clearAllToasts]);

  return {
    toast,
    success,
    error,
    info,
    clearAll,
  };
};

export default useToast;
