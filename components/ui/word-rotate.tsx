"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, HTMLMotionProps, motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: HTMLMotionProps<"h1">;
  className?: string;
  /** If true, use a random animation variant for each change instead of a single framerProps definition. */
  randomizeAnimation?: boolean;
}

export default function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
  randomizeAnimation = false,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const [animationIndex, setAnimationIndex] = useState(0);

  const animationVariants: HTMLMotionProps<"h1">[] = [
    // Fade up
    {
      initial: { opacity: 0, y: 24 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -24 },
      transition: { duration: 0.35, ease: "easeOut" },
    },
    // Fade from left
    {
      initial: { opacity: 0, x: -32 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 32 },
      transition: { duration: 0.35, ease: "easeOut" },
    },
    // Fade from right
    {
      initial: { opacity: 0, x: 32 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -32 },
      transition: { duration: 0.35, ease: "easeOut" },
    },
    // Subtle scale in
    {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
      transition: { duration: 0.3, ease: "easeOut" },
    },
    // Fade only
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.35, ease: "easeOut" },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
      if (randomizeAnimation) {
        setAnimationIndex((prev) => {
          const next = Math.floor(Math.random() * animationVariants.length);
          // Avoid repeating the same animation back-to-back when possible
          return animationVariants.length > 1 && next === prev
            ? (next + 1) % animationVariants.length
            : next;
        });
      }
    }, duration);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [words, duration, randomizeAnimation]);

  const currentFramerProps: HTMLMotionProps<"h1"> =
    randomizeAnimation ? animationVariants[animationIndex] : framerProps;

  return (
    <div className="overflow-hidden py-2">
      <AnimatePresence mode="wait">
        <motion.h1
          key={`${words[index]}-${animationIndex}`}
          className={cn(className)}
          {...currentFramerProps}
        >
          {words[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
