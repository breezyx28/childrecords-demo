"use client";

import React from "react";
import "@/styles/components/switch-input.css";

const GrowthChartLogSkeleton = () => {
  return (
    <div className="w-full py-[24px] border-b border-[#E2E6ED] animate-pulse">
      <div className="wrapper w-full flex md:flex-row flex-col justify-between md:items-center items-start gap-y-[12px] md:gap-y-[0px]">
        <div className="child-info text-[#83868B] w-auto flex items-center gap-x-[40px]">
          <div className="divide divide-x grid grid-cols-3">
            {/* Skeleton for Age */}
            <div className="child-switch-prop child-age">
              <div className="flex items-center gap-x-[8px]">
                <div className="h-[18px] w-[18px] bg-gray-300 rounded-full"></div>
                <div className="h-[18px] w-[50px] bg-gray-300 rounded-md"></div>
              </div>
              <div className="mt-2 h-[22px] w-[40px] bg-gray-300 rounded-md"></div>
            </div>
            {/* Skeleton for Weight */}
            <div className="child-switch-prop child-weight">
              <div className="flex items-center gap-x-[8px]">
                <div className="h-[18px] w-[18px] bg-gray-300 rounded-full"></div>
                <div className="h-[18px] w-[50px] bg-gray-300 rounded-md"></div>
              </div>
              <div className="mt-2 h-[22px] w-[60px] bg-gray-300 rounded-md"></div>
            </div>
            {/* Skeleton for Height */}
            <div className="child-switch-prop child-height">
              <div className="flex items-center gap-x-[8px]">
                <div className="h-[18px] w-[18px] bg-gray-300 rounded-full"></div>
                <div className="h-[18px] w-[50px] bg-gray-300 rounded-md"></div>
              </div>
              <div className="mt-2 h-[22px] w-[60px] bg-gray-300 rounded-md"></div>
            </div>
          </div>
        </div>
        {/* Skeleton for Logged Date */}
        <div className="growth-log-date md:w-auto w-full md:text-auto text-end">
          <div className="h-[18px] w-[150px] bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default GrowthChartLogSkeleton;
