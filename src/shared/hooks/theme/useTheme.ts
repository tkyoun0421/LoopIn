import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem("theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches;

  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }

  return systemPrefersDark ? "dark" : "light";
};

const useTheme = (): UseThemeResult => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dark-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
