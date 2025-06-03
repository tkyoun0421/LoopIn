import { Moon, Sun } from "lucide-react";
import { JSX } from "react";

import useTheme from "@shared/hooks/theme/useTheme";
import Button from "@shared/ui/Button/Button";

const ThemeToggleButton = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="cursor-pointer rounded-md text-sm font-medium hover:bg-[hsl(var(--accent))]"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default ThemeToggleButton;
