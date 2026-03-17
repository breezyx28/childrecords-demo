"use client";

import React from "react";

const TabInputSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      {/* Tabs List Skeleton */}
      <div className="w-full h-12 bg-gray-200 rounded-full p-[5px] flex gap-[12px]">
        {/* Boy Tab Skeleton */}
        <div className="flex items-center gap-[8px] w-1/2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
        </div>
        {/* Girl Tab Skeleton */}
        <div className="flex items-center gap-[8px] w-1/2">
          <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-1/4 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default TabInputSkeleton;
