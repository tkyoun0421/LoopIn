import { useEffect, useState } from "react";

type Theme = "light" | "dark";

interface UseThemeResult {
  theme: Theme;
  toggleTheme: () => void;
}

const useTheme = (): UseThemeResult => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme(systemPrefersDark);
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("dark-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, toggleTheme };
};

export default useTheme;
