import { Home, Search } from "lucide-react";
import { JSX } from "react";
import { useLocation } from "react-router";

import NavigationButton from "./NavigationButton";

const Navigation = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul className="flex flex-col gap-2">
        <li>
          <NavigationButton
            to="/"
            icon={<Home />}
            label="Home"
            active={pathname === "/"}
          />
        </li>
        <li>
          <NavigationButton
            to="/search"
            icon={<Search />}
            label="Search"
            active={pathname === "/search"}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
