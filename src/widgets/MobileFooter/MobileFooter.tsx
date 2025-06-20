import { Home, LogIn, Music, Search, User } from "lucide-react";
import { JSX } from "react";
import { useLocation } from "react-router";

import getSpotifyAuth from "@features/auth/api/getSpotifyAuth";
import useLogout from "@features/auth/hooks/useLogout";
import { useTokenStore } from "@features/auth/store/useTokenStore";
import useGetCurrentUserProfile from "@features/user/hooks/useGetCurrentUserProfile";

import useScrollDirection from "@shared/hooks/useScrollDirection";

import MobileFooterButton from "./MobileFooterButton";

const MobileFooter = (): JSX.Element => {
  const { pathname } = useLocation();
  const { access_token } = useTokenStore();
  const isLogged = !!access_token;
  const scrollDirection = useScrollDirection();

  const { data } = useGetCurrentUserProfile();
  const { logout } = useLogout();

  const handleUserClick = () => {
    if (isLogged) {
      if (window.confirm("로그아웃 하시겠습니까?")) {
        logout();
      }
    } else {
      getSpotifyAuth();
    }
  };

  const profileImageUrl = data?.images?.[0]?.url;

  const isVisible =
    scrollDirection === "up" ||
    scrollDirection === "top" ||
    scrollDirection === "stopped";

  return (
    <footer
      className={`border-border fixed right-0 bottom-0 left-0 z-40 border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-transform duration-300 ease-in-out lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav className="flex h-16 items-center justify-around px-1 sm:px-2">
        <MobileFooterButton
          to="/"
          icon={<Home />}
          label="홈"
          active={pathname === "/"}
        />
        <MobileFooterButton
          to="/search"
          icon={<Search />}
          label="검색"
          active={pathname.startsWith("/search")}
        />
        <MobileFooterButton
          to="/playlist"
          icon={<Music />}
          label="플레이리스트"
          active={pathname.startsWith("/playlist")}
        />
        <button
          onClick={handleUserClick}
          className={`flex min-w-12 cursor-pointer flex-col items-center justify-center gap-1 p-1 text-xs transition-colors sm:min-w-16 sm:p-2 ${
            isLogged
              ? "text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <div className="flex h-5 w-5 items-center justify-center overflow-hidden rounded-full sm:h-6 sm:w-6">
            {isLogged && profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt="프로필"
                className="h-full w-full object-cover"
              />
            ) : isLogged ? (
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            ) : (
              <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
            )}
          </div>
          <span className="truncate text-[10px] sm:text-xs">
            {isLogged ? "로그아웃" : "로그인"}
          </span>
        </button>
      </nav>
    </footer>
  );
};

export default MobileFooter;
