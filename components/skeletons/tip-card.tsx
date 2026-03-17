const TipsCardSkeleton = () => {
  return (
    <div className="animate-pulse relative w-full h-[160px] p-[24px] rounded-[12px] bg-gray-200 flex flex-col justify-between">
      {/* Heart Icon Placeholder */}
      <div className="absolute top-[10px] right-[10px] w-[24px] h-[24px] bg-gray-300 rounded-full"></div>

      {/* Title Section */}
      <div className="flex items-center gap-x-[8px]">
        <div className="w-[24px] h-[24px] bg-gray-300 rounded-full"></div>
        <div className="w-[120px] h-[20px] bg-gray-300 rounded-md"></div>
      </div>

      {/* Tip Text Placeholder */}
      <div className="w-full mt-[8px]">
        <div className="w-full h-[16px] bg-gray-300 rounded-md"></div>
        <div className="w-[80%] h-[16px] bg-gray-300 rounded-md mt-[8px]"></div>
      </div>
    </div>
  );
};

export default TipsCardSkeleton;
