export interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  onIntersect?: () => void;
}

export interface UseIntersectionObserverReturn {
  targetRef: React.RefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
}
