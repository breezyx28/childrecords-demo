import React from "react";

const EditChildSwitchSkeleton = () => {
  return (
    <div className="w-full p-[16px] rounded-[16px] border border-[#E2E6ED] animate-pulse">
      <div className="wrapper w-full flex flex-col gap-y-[16px]">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-[12px]">
            <div className="w-[40px] h-[40px] bg-gray-200 rounded-full"></div>
            <div className="w-[100px] h-[20px] bg-gray-200 rounded"></div>
          </div>
          <div className="px-[16px] py-[12px] w-[80px] bg-gray-200 rounded-full"></div>
        </div>
        <div className="child-info text-[#83868B] w-auto flex items-center gap-x-[40px]">
          <div className="divide divide-x grid grid-cols-3 gap-x-[16px] min-w-[400px]">
            <div className="child-switch-prop !pl-0 !items-start child-age">
              <div className="flex items-center gap-x-[8px]">
                <div className="w-[24px] h-[24px] bg-gray-200 rounded-full"></div>
                <div className="w-[50px] h-[14px] bg-gray-200 rounded"></div>
              </div>
              <div className="w-[40px] h-[20px] bg-gray-200 rounded"></div>
            </div>
            <div className="child-switch-prop !items-start child-weight">
              <div className="flex items-center gap-x-[8px]">
                <div className="w-[24px] h-[24px] bg-gray-200 rounded-full"></div>
                <div className="w-[50px] h-[14px] bg-gray-200 rounded"></div>
              </div>
              <div className="w-[40px] h-[20px] bg-gray-200 rounded"></div>
            </div>
            <div className="child-switch-prop !items-start child-height">
              <div className="flex items-center gap-x-[8px]">
                <div className="w-[24px] h-[24px] bg-gray-200 rounded-full"></div>
                <div className="w-[50px] h-[14px] bg-gray-200 rounded"></div>
              </div>
              <div className="w-[40px] h-[20px] bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChildSwitchSkeleton;
