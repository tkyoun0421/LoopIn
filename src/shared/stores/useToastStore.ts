import { create } from "zustand";

export type ToastType = "info" | "success" | "error";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
}

const DEFAULT_DURATION = 4000;

const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: toast => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const duration = toast.duration ?? DEFAULT_DURATION;
    const newToast: Toast = {
      ...toast,
      id,
      duration,
    };

    set(state => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: id => {
    set(state => ({
      toasts: state.toasts.filter(toast => toast.id !== id),
    }));
  },

  clearAllToasts: () => {
    set({ toasts: [] });
  },
}));

export default useToastStore;
