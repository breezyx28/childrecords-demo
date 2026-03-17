"use client";

import Slider from "@/components/slider";
import React from "react";
import { twMerge } from "tailwind-merge";

type LearnSliderProps = {
  learnCards: React.ReactNode[];
  sliderOptions?: Record<any, any>;
  className?: string;
};

export default function LearnSlider({
  sliderOptions,
  learnCards,
  className,
}: LearnSliderProps) {
  return (
    <div className={twMerge("slider-container w-full", className)}>
      <Slider
        sliderContainerClass="flex items-center"
        data={learnCards}
        sliderOptions={{
          gap: "12px",
          // breakpoints: null,
          // perPage: 2.5,
          ...sliderOptions,
        }}
      />
    </div>
  );
}
