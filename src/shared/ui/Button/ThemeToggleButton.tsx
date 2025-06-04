import { Moon, Sun } from "lucide-react";
import { JSX } from "react";

import useTheme from "@shared/hooks/theme/useTheme";
import Button from "@shared/ui/Button/Button";

const ThemeToggleButton = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={toggleTheme}
      className="h-10 w-10 cursor-pointer rounded-md text-sm font-medium"
    >
      {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
    </Button>
  );
};

export default ThemeToggleButton;
