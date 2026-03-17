import React from "react";

export const NutritionCardSkeleton = () => (
  <div className="relative w-full h-[160px] p-[24px] rounded-[12px] bg-gray-200 animate-pulse flex flex-col justify-between">
    <span className="absolute top-[10px] right-[10px] w-[24px] h-[24px] bg-gray-300 rounded-full"></span>
    <div className="flex items-center gap-x-[8px]">
      <span className="w-[24px] h-[24px] bg-gray-300 rounded-full"></span>
      <span className="w-[120px] h-[16px] bg-gray-300 rounded"></span>
    </div>
    <p className="w-full h-[14px] bg-gray-300 rounded"></p>
  </div>
);
