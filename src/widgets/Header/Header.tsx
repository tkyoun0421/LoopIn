import { JSX } from "react";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import LoginButton from "@features/auth/ui/LoginButton";
import UserProfile from "@features/user/ui/UserProfile";

import ThemeToggleButton from "@shared/ui/Button/ThemeToggleButton";
import Logo from "@shared/ui/Logo/Logo";

const Header = (): JSX.Element => {
  const { accessToken } = useTokenStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] py-2 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background)/0.6)]">
      <div className="container flex h-16 items-center justify-between px-4">
        <Logo />
        <div className="flex gap-2 align-middle">
          <ThemeToggleButton />
          {accessToken ? <UserProfile /> : <LoginButton />}
        </div>
      </div>
    </header>
  );
};
export default Header;
