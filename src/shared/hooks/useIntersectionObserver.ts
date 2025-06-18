import { useEffect, useRef, useState } from "react";

import {
  UseIntersectionObserverProps,
  UseIntersectionObserverReturn,
} from "@shared/model/intersectionObserver";

const useIntersectionObserver = ({
  threshold = 0.1,
  root = null,
  rootMargin = "0px",
  onIntersect,
}: UseIntersectionObserverProps = {}): UseIntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        setIsIntersecting(isIntersecting);

        if (isIntersecting && onIntersect) {
          onIntersect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [threshold, root, rootMargin, onIntersect]);

  return { targetRef, isIntersecting };
};

export default useIntersectionObserver;
