import { useEffect, useState } from "react";

import useDebounce from "./useDebounce";

type ScrollDirection = "up" | "down" | "top" | "stopped";

const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] =
    useState<ScrollDirection>("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentScrollY, setCurrentScrollY] = useState(0);

  const debouncedScrollY = useDebounce(currentScrollY, 300);

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      setCurrentScrollY(scrollY);

      if (scrollY === 0) {
        setScrollDirection("top");
      } else if (scrollY > lastScrollY && scrollY > 100) {
        setScrollDirection("down");
      } else if (scrollY < lastScrollY) {
        setScrollDirection("up");
      }

      setLastScrollY(scrollY);
    };

    const handleScroll = () => {
      updateScrollDirection();
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (debouncedScrollY > 0 && debouncedScrollY === currentScrollY) {
      setScrollDirection("stopped");
    }
  }, [debouncedScrollY, currentScrollY]);

  return scrollDirection;
};

export default useScrollDirection;
