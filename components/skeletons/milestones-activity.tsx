import React from "react";

const MilestonesActivitySkeleton = () => {
  return (
    <div className="w-full">
      <div className="wrapper w-full flex flex-col gap-y-[32px] mt-[25px] animate-pulse">
        {/* Skeleton for header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-[4px]">
            <div className="h-[24px] w-[150px] bg-gray-300 rounded-md"></div>
            <div className="flex gap-x-[7px] items-center">
              <div className="h-[24px] w-[24px] bg-gray-300 rounded-full"></div>
              <div className="h-[15.6px] w-[120px] bg-gray-300 rounded-md"></div>
            </div>
          </div>
          <div className="h-[24px] w-[24px] bg-gray-300 rounded-md"></div>
        </div>
        {/* Skeleton for tabs */}
        <div className="w-full">
          <div className="grid w-full grid-cols-2 gap-x-[10px]">
            <div className="h-[36px] bg-gray-300 rounded-md"></div>
            <div className="h-[36px] bg-gray-300 rounded-md"></div>
          </div>
          <div className="mt-[16px]">
            <div className="h-[120px] w-full bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestonesActivitySkeleton;
