import { useLocation } from "react-router";

const NAVIGATION_ROUTES = [
  { path: "/", startsWith: false },
  { path: "/search", startsWith: true },
  { path: "/playlist", startsWith: true },
] as const;

export const useActiveNavIndex = (): {
  activeIndex: number;
  pathname: string;
} => {
  const { pathname } = useLocation();

  const getActiveIndex = (): number => {
    return NAVIGATION_ROUTES.findIndex(route =>
      route.startsWith
        ? pathname.startsWith(route.path)
        : pathname === route.path,
    );
  };

  return {
    activeIndex: getActiveIndex(),
    pathname,
  };
};
