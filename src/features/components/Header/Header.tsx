import { JSX } from "react";

import ThemeToggleButton from "@shared/ui/Button/ThemeToggleButton";
import Logo from "@shared/ui/Logo/Logo";

const Header = (): JSX.Element => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] py-2 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background)/0.6)]">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <ThemeToggleButton />
      </div>
    </header>
  );
};
export default Header;
