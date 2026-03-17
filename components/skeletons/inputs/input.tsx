const InputSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      {/* Input Container Skeleton */}
      <div
        className="flex items-center px-4 py-2 border border-gray-300 rounded-lg 
        bg-gray-200 gap-2 h-12"
      >
        {/* Icon Skeleton */}
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
        {/* Input Field Skeleton */}
        <div className="w-full h-4 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default InputSkeleton;
