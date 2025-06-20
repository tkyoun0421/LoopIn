import { JSX } from "react";

import { useTokenStore } from "@features/auth/store/useTokenStore";
import LoginButton from "@features/auth/ui/LoginButton";
import UserProfile from "@features/user/ui/UserProfile";

import ThemeToggleButton from "@shared/ui/Button/ThemeToggleButton";
import Logo from "@shared/ui/Logo/Logo";

const Header = (): JSX.Element => {
  const { access_token } = useTokenStore();
  const isLogged = !!access_token;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[hsl(var(--border))] bg-[hsl(var(--background))] py-2 backdrop-blur supports-[backdrop-filter]:bg-[hsl(var(--background)/0.6)]">
      <div className="mx-auto flex h-12 w-full max-w-screen-xl items-center justify-between px-2 sm:h-16 sm:px-4 lg:px-4">
        <Logo />
        <div className="flex gap-2 align-middle">
          <ThemeToggleButton />
          <div className="hidden lg:block">
            {isLogged ? <UserProfile /> : <LoginButton />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
