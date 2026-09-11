"use client";

import { ReactNode } from "react";
import styles from "./SpinIcon.module.css";
import { useSpinOnScrollEnter } from "./useSpinTriggers";

type SpinIconProps = {
  children: ReactNode;
  /**
   * Spin every time this icon scrolls into view while the user is scrolling
   * down. Repeats each downward pass; never fires on scroll-up. Default: true.
   */
  spinOnScrollEnter?: boolean;
  /** Also spin on hover, same as AnimatedLogo. Default: true. */
  spinOnHover?: boolean;
  className?: string;
};

/**
 * Drop any icon/image in here to reuse the same "spin" treatment used on the
 * logo: hover, plus a spin every time it scrolls into view on the way down
 * (not on the way up, and it can repeat on later passes).
 */
export default function SpinIcon({
  children,
  spinOnScrollEnter = true,
  spinOnHover = true,
  className,
}: SpinIconProps) {
  const { ref, spin, onAnimationEnd } = useSpinOnScrollEnter<HTMLDivElement>(spinOnScrollEnter);

  const classes = [
    styles.wrapper,
    spinOnHover ? styles.hoverSpin : "",
    spin ? styles.spinOnce : "",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} ref={ref} onAnimationEnd={onAnimationEnd}>
      {children}
    </div>
  );
}
