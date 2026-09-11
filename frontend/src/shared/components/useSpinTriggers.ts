"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Continuously rotates as the page scrolls. Attach `ref` to the element you
 * want to rotate and apply `style` to it. Rotation accumulates with scroll
 * direction, so scrolling up unwinds it again.
 */
export function useScrollRotation<T extends HTMLElement>(
  active: boolean,
  degreesPerPixel = 0.15
) {
  const ref = useRef<T>(null);
  const lastScrollY = useRef(0);
  const rotation = useRef(0);
  const [rotationDeg, setRotationDeg] = useState(0);

  useEffect(() => {
    if (!active) return;

    lastScrollY.current = window.scrollY;
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;
        lastScrollY.current = currentY;
        rotation.current += delta * degreesPerPixel;
        setRotationDeg(rotation.current);
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [active, degreesPerPixel]);

  return {
    ref,
    style: active ? { transform: `rotate(${rotationDeg}deg)` } : undefined,
  };
}

/**
 * Fires `spin` (true, then false once the CSS animation finishes) every time
 * the element crosses into the viewport WHILE the user is scrolling down.
 * Re-entering the viewport while scrolling up never spins it, and it can
 * fire again on the 2nd, 3rd, etc. downward pass — it's not a one-time flag.
 *
 * Attach `ref` to the element being observed, and `onAnimationEnd` to
 * whichever child actually plays the animation.
 */
export function useSpinOnScrollEnter<T extends HTMLElement>(active: boolean, threshold = 0.4) {
  const ref = useRef<T>(null);
  const [spin, setSpin] = useState(false);
  const direction = useRef<"down" | "up" | null>(null);
  const lastScrollY = useRef(0);

  // Track scroll direction independently of the observer.
  useEffect(() => {
    if (!active) return;

    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastScrollY.current) direction.current = "down";
      else if (y < lastScrollY.current) direction.current = "up";
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [active]);

  // Only spin on a downward crossing into view; ignore exits and upward entries.
  useEffect(() => {
    if (!active || !ref.current) return;

    const node = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && direction.current === "down") {
          setSpin(true);
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active, threshold]);

  return {
    ref,
    spin,
    onAnimationEnd: () => setSpin(false),
  };
}
