import { Home, LogIn, Music, Search, User } from "lucide-react";
import { JSX } from "react";

import getSpotifyAuth from "@features/auth/api/getSpotifyAuth";
import useLogout from "@features/auth/hooks/useLogout";
import { useTokenStore } from "@features/auth/store/useTokenStore";
import useGetCurrentUserProfile from "@features/user/hooks/useGetCurrentUserProfile";

import { useActiveNavIndex } from "@shared/hooks/useActiveNavIndex";
import useScrollDirection from "@shared/hooks/useScrollDirection";
import { useSlidingBackground } from "@shared/hooks/useSlidingBackground";

import MobileFooterButton from "./MobileFooterButton";
import SlidingBackground from "./SlidingBackground";

const MobileFooter = (): JSX.Element => {
  const { access_token } = useTokenStore();
  const isLogged = !!access_token;
  const scrollDirection = useScrollDirection();

  const { data } = useGetCurrentUserProfile();
  const { logout } = useLogout();

  const { activeIndex, pathname } = useActiveNavIndex();

  const isVisible =
    scrollDirection === "up" ||
    scrollDirection === "top" ||
    scrollDirection === "stopped";

  const { navRef, currentPosition, isTransitioning, hasValidPosition } =
    useSlidingBackground({
      activeIndex,
    });

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

  return (
    <footer
      className={`fixed right-0 bottom-0 left-0 z-40 border-t border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-transform duration-300 ease-in-out lg:hidden ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <nav
        ref={navRef}
        className="relative flex h-16 items-center justify-around px-1 sm:px-2"
      >
        {hasValidPosition && (
          <SlidingBackground
            currentPosition={currentPosition}
            isTransitioning={isTransitioning}
            isVisible={true}
          />
        )}

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
              ? "text-foreground"
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
