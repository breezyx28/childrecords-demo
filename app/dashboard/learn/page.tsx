import React from "react";

const LearnEmptyState = () => {
  return (
    <div className="h-full w-full flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src="/assets/logos/logo-icon.svg"
          alt="Child Records"
          className="w-16 h-16 opacity-60 grayscale"
        />
        <div className="space-y-2 max-w-xl">
          <h1 className="text-[22px] md:text-[26px] font-extrabold text-primary-700">
            Your learning hub is almost here
          </h1>
          <p className="text-sm md:text-base text-[#6B7280] leading-relaxed">
            We&apos;re putting the final touches on an interactive space where
            you&apos;ll learn how to read reports, understand milestones, and
            get practical guidance tailored to your child. This page will soon
            become your go‑to place for clear, confident parenting insights.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 mt-1">
          <p className="text-xs text-[#9CA3AF]">
            Once it&apos;s live, you&apos;ll see saved lessons, progress, and
            recommendations right here.
          </p>
          <button
            disabled
            className="inline-flex items-center justify-center rounded-full bg-primary-600/40 text-white/80 px-6 py-2.5 text-sm font-semibold shadow-sm cursor-not-allowed"
          >
            Learning hub coming soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnEmptyState;
