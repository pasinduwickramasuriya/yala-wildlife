"use client";

import { useState, useEffect, RefObject } from "react";

interface ThermalOptions {
  threshold?: number;
  rootMargin?: string;
  defaultAnimate?: boolean;
}

export function useThermalOptimization(
  elementRef?: RefObject<HTMLElement | null>,
  options: ThermalOptions = {}
) {
  const { threshold = 0.1, rootMargin = "100px", defaultAnimate = true } = options;

  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isSaveData, setIsSaveData] = useState(false);

  useEffect(() => {
    // 1. Page Visibility API
    const handleVisibilityChange = () => {
      setIsTabActive(!document.hidden);
    };

    setIsTabActive(!document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 2. Prefers-Reduced-Motion Media Query
    if (typeof window !== "undefined" && window.matchMedia) {
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionQuery.matches);

      const handleMotionChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      if (motionQuery.addEventListener) {
        motionQuery.addEventListener("change", handleMotionChange);
      } else {
        motionQuery.addListener(handleMotionChange);
      }

      // 3. Network Save-Data state detection
      const nav = navigator as any;
      if (nav.connection && nav.connection.saveData) {
        setIsSaveData(true);
      }

      return () => {
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        if (motionQuery.removeEventListener) {
          motionQuery.removeEventListener("change", handleMotionChange);
        } else {
          motionQuery.removeListener(handleMotionChange);
        }
      };
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // 4. IntersectionObserver for target element
  useEffect(() => {
    if (!elementRef || !elementRef.current) {
      setIsVisible(true);
      return;
    }

    const element = elementRef.current;
    if (typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [elementRef, threshold, rootMargin]);

  // Combined rule: Only animate if tab is active, element is visible, and reduced motion is NOT requested.
  const shouldAnimate = defaultAnimate && isTabActive && isVisible && !prefersReducedMotion;
  const isLowPower = isSaveData || prefersReducedMotion;

  return {
    shouldAnimate,
    isVisible,
    isTabActive,
    prefersReducedMotion,
    isLowPower,
  };
}
