import { JSX } from "react";

import MyLibrary from "@widgets/MyLibrary/MyLibrary";
import Navigation from "@widgets/Navigation/Navigation";

const SideBar = (): JSX.Element => {
  return (
    <aside className="hidden w-80 flex-col gap-4 border-r border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.3)] p-4 lg:flex dark:bg-[hsl(var(--card))]">
      <Navigation />
      <MyLibrary />
    </aside>
  );
};

export default SideBar;
