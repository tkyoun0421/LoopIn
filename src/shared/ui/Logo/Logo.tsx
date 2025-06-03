import { Music } from "lucide-react";
import { JSX } from "react";
import { Link } from "react-router";

const Logo = (): JSX.Element => {
  return (
    <div>
      <Link to={"/"} className="flex items-center gap-3">
        <div className="animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-75 blur-sm"></div>
        <div className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 p-3">
          <Music size={30} className="text-white" />
        </div>
        <h1
          className={`bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent`}
        >
          Loop<span className="text-purple-800 dark:text-purple-300">In</span>
        </h1>
      </Link>
    </div>
  );
};

export default Logo;
