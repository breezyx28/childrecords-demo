import React, { useEffect, useRef, useState } from "react";

const SIZE = 48;
const STROKE_WIDTH = 6;
const R = (SIZE - STROKE_WIDTH) / 2;
const CENTER = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * R;

function RadialProgressBar({ percentage }: { percentage: number }) {
  const [displayedPercentage, setDisplayedPercentage] = useState(percentage);
  const startRef = useRef(percentage);

  useEffect(() => {
    const start = startRef.current;
    const end = Math.min(100, Math.max(0, percentage));
    startRef.current = end;
    const duration = 450;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - (1 - t) ** 2;
      setDisplayedPercentage(start + (end - start) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [percentage]);

  const strokeDashoffset = CIRCUMFERENCE * (1 - displayedPercentage / 100);

  return (
    <div className="relative md:w-16 md:h-16 w-12 h-12 flex items-center justify-center flex-shrink-0">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="transform -rotate-90"
      >
        {/* Background track - rounded */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          className="text-primary-200"
        />
        {/* Progress stroke with rounded line cap */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r={R}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeDashoffset}
          className="text-primary-600 transition-[stroke-dashoffset] duration-300 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-primary-600 md:text-sm text-[12px] font-bold">
          {Math.round(displayedPercentage)}%
        </span>
      </div>
    </div>
  );
}

export default RadialProgressBar;
