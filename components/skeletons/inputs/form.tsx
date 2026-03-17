const FormSkeleton = () => {
  return (
    <div className="animate-pulse w-full flex flex-col gap-y-6">
      {/* Image Upload Skeleton */}
      <div className="upload-child-image w-full flex justify-center items-center">
        <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
      </div>

      {/* Form Fields Skeleton */}
      <div className="w-full flex flex-col gap-y-3">
        {/* Gender Tab Skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-md"></div>

        {/* Name Input Skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-md"></div>

        {/* Birthday Input Skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-md"></div>

        {/* Weight Input Skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-md"></div>

        {/* Height Input Skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-md"></div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex flex-col gap-y-2">
        {/* Submit Button Skeleton */}
        <div className="w-full h-12 bg-gray-300 rounded-md"></div>

        {/* Remove Button Skeleton */}
        <div className="w-32 h-8 bg-gray-300 rounded-md mx-auto"></div>
      </div>
    </div>
  );
};

export default FormSkeleton;
