import { create } from "zustand";

export type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (saved === "light" || saved === "dark") return saved;
  return prefersDark ? "dark" : "light";
};

const useThemeStore = create<ThemeState>(set => {
  const initialTheme = getInitialTheme();
  if (typeof document !== "undefined") {
    document.documentElement.setAttribute("dark-theme", initialTheme);
  }

  return {
    theme: initialTheme,
    toggleTheme: () =>
      set(state => {
        const next = state.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("dark-theme", next);
        return { theme: next };
      }),
    setTheme: theme => {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("dark-theme", theme);
      set({ theme });
    },
  };
});

export default useThemeStore;
