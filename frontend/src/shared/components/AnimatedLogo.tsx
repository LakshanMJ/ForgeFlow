"use client";

import Image from "next/image";
import styles from "./AnimatedLogo.module.css";
import { useSpinOnScrollEnter } from "./useSpinTriggers";

type AnimatedLogoProps = {
  /**
   * Spin/pulse every time the logo scrolls into view while the user is
   * scrolling down. Repeats each downward pass; never fires on scroll-up.
   * Default: true.
   */
  spinOnScrollEnter?: boolean;
};

export default function AnimatedLogo({ spinOnScrollEnter = true }: AnimatedLogoProps) {
  const { ref, spin, onAnimationEnd } = useSpinOnScrollEnter<HTMLDivElement>(spinOnScrollEnter);

  return (
    <div className={styles.logo} ref={ref}>
      <Image
        src="/logo/flower.png"
        alt="Forgeflow logo"
        fill
        className={[styles.flowerLayer, spin ? styles.spinOnce : ""].join(" ").trim()}
        priority
        onAnimationEnd={onAnimationEnd}
      />
      <Image
        src="/logo/star5.png"
        alt=""
        fill
        className={[styles.starLayer, spin ? styles.pulseOnce : ""].join(" ").trim()}
        aria-hidden="true"
      />
    </div>
  );
}
