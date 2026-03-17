import React from "react";

const DailyProgramSkeleton = () => {
  return (
    <div className="py-6 w-full flex justify-between items-center cursor-pointer animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gray-300 rounded-full" />{" "}
        {/* Placeholder for the icon */}
        <div className="h-5 w-24 bg-gray-300 rounded-md" />{" "}
        {/* Placeholder for the title */}
      </div>
      <div className="w-6 h-6 bg-gray-300 rounded-md" />{" "}
      {/* Placeholder for the checkbox */}
    </div>
  );
};

export default DailyProgramSkeleton;
