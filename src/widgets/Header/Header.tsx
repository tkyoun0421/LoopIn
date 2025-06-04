import { JSX } from "react";
import { Link } from "react-router";

import Button from "@shared/ui/Button/Button";
import ThemeToggleButton from "@shared/ui/Button/ThemeToggleButton";
import Logo from "@shared/ui/Logo/Logo";

const Header = (): JSX.Element => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] py-2 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background)/0.6)]">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <div className="flex gap-2 align-middle">
          <ThemeToggleButton />
          <Button className="h-10 bg-[hsl(var(--primary))] bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-sm font-medium hover:bg-[hsl(var(--primary)/0.9)] hover:from-purple-700 hover:to-pink-700 dark:from-purple-500 dark:to-pink-500 dark:hover:from-purple-600 dark:hover:to-pink-600">
            <Link to={"/"}>로그인</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
export default Header;
