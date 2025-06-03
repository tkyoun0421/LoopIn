import { Moon, Sun } from "lucide-react";
import { JSX } from "react";

import useTheme, { Theme } from "@shared/lib/theme/useTheme";
import Button from "@shared/ui/Button/Button";
import Logo from "@shared/ui/Logo/Logo";

interface HeaderThemeButtonProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Header = (): JSX.Element => {
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] py-2 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background)/0.6)]">
      <div className="container flex h-16 items-center justify-between px-4">
        <Header.Logo />
        <Header.ThemeButton theme={theme} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

Header.Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <Logo />
    </div>
  );
};

Header.Input = () => {
  <input type="text" />;
};

Header.ThemeButton = ({ theme, toggleTheme }: HeaderThemeButtonProps) => {
  return (
    <Button
      onClick={toggleTheme}
      className="cursor-pointer rounded-md text-sm font-medium hover:bg-[hsl(var(--accent))]"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </Button>
  );
};

export default Header;
