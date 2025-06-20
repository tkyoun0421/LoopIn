import { JSX, ReactNode } from "react";
import { Link } from "react-router";

type MobileFooterButtonProps = {
  to: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
};

const MobileFooterButton = ({
  to,
  icon,
  label,
  active,
}: MobileFooterButtonProps): JSX.Element => {
  return (
    <Link
      to={to}
      className={`flex min-w-12 cursor-pointer flex-col items-center justify-center gap-1 p-1 text-xs transition-colors sm:min-w-16 sm:p-2 ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <div className="flex h-5 w-5 items-center justify-center sm:h-6 sm:w-6">
        {icon}
      </div>
      <span className="truncate text-[10px] sm:text-xs">{label}</span>
    </Link>
  );
};

export default MobileFooterButton;
