import { Home, Search } from "lucide-react";
import { JSX, ReactNode } from "react";
import { Link, useLocation } from "react-router";

type NavigationButtonProps = {
  to: string;
  icon: ReactNode;
  label: string;
  variant?: "primary" | "default";
  active?: boolean;
};

const Navigation = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-2">
      <Navigation.Button
        to="/"
        icon={<Home />}
        label="Home"
        active={pathname === "/"}
      />
      <Navigation.Button
        to="/search"
        icon={<Search />}
        label="Search"
        active={pathname === "/search"}
      />
    </nav>
  );
};

Navigation.Button = ({ to, icon, label, active }: NavigationButtonProps) => {
  return (
    <Link
      to={to}
      className={`flex h-14 items-center gap-2 rounded-lg bg-[hsl(var(--card))] p-4 text-sm hover:bg-[hsl(var(--accent))] ${
        active
          ? "font-bold text-[hsl(var(--foreground))]"
          : "text-[hsl(var(--muted-foreground))]"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
};

export default Navigation;
