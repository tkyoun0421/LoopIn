import { Music } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router";

const Logo = (): JSX.Element => {
  return (
    <div>
      <Link to={"/"} className="flex items-center gap-2 sm:gap-3">
        <div className="animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-sm"></div>
        <div className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-2 sm:p-3">
          <Music size={20} className="text-white sm:hidden" />
          <Music size={30} className="hidden text-white sm:block" />
        </div>
        <h1 className="text-gradient text-lg font-bold sm:text-2xl">
          Loop
          <span className="text-purple-800 dark:text-purple-300">In</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
