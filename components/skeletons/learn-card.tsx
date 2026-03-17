export const LearnCardSkeleton = () => {
  return (
    <div className="relative w-full h-auto flex flex-col gap-y-[12px] animate-pulse">
      <div className="relative w-full h-auto flex flex-col gap-y-[12px]">
        {/* Image Placeholder */}
        <div className="relative w-full h-[140px] bg-gray-200 rounded-[12px]">
          <span className="absolute top-[10px] right-[10px] w-[32px] h-[32px] rounded-full bg-gray-300" />
        </div>

        {/* Title Placeholder */}
        <div className="h-[21px] bg-gray-200 rounded-md w-3/4"></div>

        {/* Topic Placeholder */}
        <div className="h-[18px] bg-gray-200 rounded-md w-5/6"></div>
      </div>
    </div>
  );
};
