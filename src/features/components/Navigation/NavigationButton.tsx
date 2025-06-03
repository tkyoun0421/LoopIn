import { JSX, ReactNode } from "react";
import { Link } from "react-router-dom";

type NavigationButtonProps = {
  to: string;
  icon: ReactNode;
  label: string;
  variant?: "primary" | "default";
  active?: boolean;
};

const NavigationButton = ({
  to,
  icon,
  label,
  active,
}: NavigationButtonProps): JSX.Element => {
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

export default NavigationButton;
