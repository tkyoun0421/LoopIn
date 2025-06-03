import { Home, Search } from "lucide-react";
import { JSX } from "react";
import { useLocation } from "react-router";

import NavigationButton from "./NavigationButton";

const Navigation = (): JSX.Element => {
  const { pathname } = useLocation();

  return (
    <nav className="flex flex-col gap-2">
      <NavigationButton
        to="/"
        icon={<Home />}
        label="Home"
        active={pathname === "/"}
      />
      <NavigationButton
        to="/search"
        icon={<Search />}
        label="Search"
        active={pathname === "/search"}
      />
    </nav>
  );
};

export default Navigation;
