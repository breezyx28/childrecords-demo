import React from "react";

const MilestoneMotorSkeleton = () => {
  return (
    <div className="w-full h-auto animate-pulse">
      {/* Header with Icon and Title */}
      <div className="p-[12px] flex justify-between items-center bg-primary-100 rounded-[12px]">
        <div className="flex gap-x-[12px] items-center">
          {/* Icon Placeholder */}
          <span className="w-10 h-10 bg-gray-300 rounded-full" />

          {/* Title Placeholder */}
          <div className="h-6 w-24 bg-gray-300 rounded-md" />
        </div>

        {/* Radial Progress Placeholder */}
        <div className="w-[64px] h-[64px] bg-gray-300 rounded-full" />
      </div>

      {/* Main Content Placeholder */}
      <div className="flex flex-col divide-y-[4px] mt-4">
        <div className="w-full pt-[24px] pb-[40px]">
          <div className="w-full flex flex-col gap-y-[12px]">
            {/* Milestone Row */}
            <div className="flex items-center gap-x-[40px]">
              {/* Link with Title and Description */}
              <div className="flex flex-col gap-y-[4px] w-full">
                {/* Title Placeholder */}
                <div className="h-5 w-32 bg-gray-300 rounded-md" />

                {/* Description Placeholder */}
                <div className="h-4 w-full bg-gray-300 rounded-md" />
                <div className="h-4 w-[80%] bg-gray-300 rounded-md" />
                <div className="h-4 w-[60%] bg-gray-300 rounded-md" />
              </div>

              {/* Checkbox Placeholder */}
              <div className="w-5 h-5 bg-gray-300 rounded-md" />
            </div>

            {/* Activities Collapse Placeholder */}
            <div className="h-12 w-full bg-gray-300 rounded-md mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneMotorSkeleton;
