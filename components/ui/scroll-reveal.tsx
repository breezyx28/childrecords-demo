"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { twMerge } from "tailwind-merge";

const defaultEase = [0.25, 0.46, 0.45, 0.94] as const;

export type ScrollRevealStyle =
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "fade"
  | "slideUpScale"
  | "slideLeftFade"
  | "slideRightFade";

const styleVariants: Record<
  ScrollRevealStyle,
  (opts: { duration: number; delay: number; ease: typeof defaultEase }) => Variants
> = {
  slideUp: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, y: 48 },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease } },
  }),
  slideDown: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, y: -36 },
    visible: { opacity: 1, y: 0, transition: { duration, delay, ease } },
  }),
  slideLeft: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, x: 56 },
    visible: { opacity: 1, x: 0, transition: { duration, delay, ease } },
  }),
  slideRight: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, x: -56 },
    visible: { opacity: 1, x: 0, transition: { duration, delay, ease } },
  }),
  scale: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration, delay, ease } },
  }),
  fade: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration, delay, ease } },
  }),
  slideUpScale: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, y: 32, scale: 0.96 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration, delay, ease } },
  }),
  slideLeftFade: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration, delay, ease } },
  }),
  slideRightFade: ({ duration, delay, ease }) => ({
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration, delay, ease } },
  }),
};

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  /** Preset transition style (default "slideUp") */
  variant?: ScrollRevealStyle;
  /** Animation duration in seconds (default 0.65) */
  duration?: number;
  /** Delay before animation starts (default 0) */
  delay?: number;
  /** Viewport margin to trigger early (default "-60px") */
  inViewMargin?: string;
  /** Easing curve (default smooth easeOut) */
  ease?: number[] | "easeIn" | "easeOut" | "easeInOut";
  /** Custom variants override (ignored if variant is set) */
  variants?: Variants;
}

export function ScrollReveal({
  children,
  className,
  variant: styleName = "slideUp",
  duration = 0.65,
  delay = 0,
  inViewMargin = "-60px",
  ease = defaultEase,
  variants: customVariants,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: inViewMargin, amount: 0.15 });

  const variants: Variants =
    customVariants ??
    styleVariants[styleName]({ duration, delay, ease });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={twMerge(
        "w-full min-w-0 max-w-full overflow-x-clip",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
