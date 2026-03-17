// ... existing imports ...

export const ReminderCardSkeleton = () => (
  <div className="w-full h-[134px] bg-gray-200 animate-pulse p-[16px] rounded-[12px]">
    <div className="absolute top-[12px] right-[12px] w-[24px] h-[24px] bg-gray-300 rounded-full"></div>
    <div className="flex flex-col gap-y-[4px]">
      <div className="w-[100px] h-[18px] bg-gray-300 rounded"></div>
      <div className="w-[200px] h-[20px] bg-gray-300 rounded"></div>
    </div>
    <div className="flex items-center gap-x-[3px] pt-[20px]">
      <div className="w-[16px] h-[16px] bg-gray-300 rounded-full"></div>
      <div className="w-[50px] h-[18px] bg-gray-300 rounded"></div>
    </div>
  </div>
);

// ... existing code ...
