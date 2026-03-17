const SwitchChildSkeleton = () => {
  return (
    <div className="w-full md:p-[24px] p-[16px] rounded-[24px] border border-[#E2E6ED] animate-pulse">
      <div className="wrapper w-full flex md:flex-row flex-col md:items-center items-start md:gap-x-[21px] gap-[16px]">
        {/* Profile Skeleton */}
        <div className="child-profile">
          <div className="md:px-[20px] px-[0px] flex items-center gap-x-[16px]">
            <div className="w-[48px] h-[48px] md:w-[56px] md:h-[56px] rounded-full bg-gray-300"></div>
            <div className="h-[27px] w-[100px] bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Child Info Skeleton */}
        <div className="child-info text-[#83868B] w-auto flex md:flex-row flex-col items-center md:gap-[40px] gap-[24px]">
          <div className="divide divide-x grid grid-cols-3 gap-x-[16px]">
            {/* Age Skeleton */}
            <div className="child-switch-prop">
              <div className="flex items-center gap-x-[8px]">
                <div className="w-[24px] h-[24px] bg-gray-300 rounded-full"></div>
                <div className="w-[40px] h-[18px] bg-gray-300 rounded"></div>
              </div>
              <div className="h-[22px] w-[70px] bg-gray-300 rounded mt-1"></div>
            </div>

            {/* Weight Skeleton */}
            <div className="child-switch-prop">
              <div className="flex items-center gap-x-[8px]">
                <div className="w-[24px] h-[24px] bg-gray-300 rounded-full"></div>
                <div className="w-[40px] h-[18px] bg-gray-300 rounded"></div>
              </div>
              <div className="h-[22px] w-[70px] bg-gray-300 rounded mt-1"></div>
            </div>

            {/* Height Skeleton */}
            <div className="child-switch-prop">
              <div className="flex items-center gap-x-[8px]">
                <div className="w-[24px] h-[24px] bg-gray-300 rounded-full"></div>
                <div className="w-[40px] h-[18px] bg-gray-300 rounded"></div>
              </div>
              <div className="h-[22px] w-[70px] bg-gray-300 rounded mt-1"></div>
            </div>
          </div>

          {/* Switch Button Skeleton */}
          <div className="w-full md:w-auto rounded-full bg-gray-300 h-[50px] flex items-center justify-center px-[16px]">
            <div className="w-[40px] h-[20px] bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchChildSkeleton;
