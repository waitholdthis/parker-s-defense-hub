import { useEffect, useRef, useState } from "react";

/**
 * Hook to trigger animations when an element comes into view.
 * Returns true when the element is visible, false otherwise.
 * 
 * Usage:
 * const ref = useRef(null);
 * const isVisible = useScrollAnimation(ref);
 * <div ref={ref} className={isVisible ? "animate-fade-in" : ""}>
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return { ref, isVisible };
}
