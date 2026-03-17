const ProductCardSkeleton = () => {
  return (
    <div className="w-full flex md:gap-[24px] gap-[16px] py-[32px] animate-pulse">
      <div className="product-img">
        <div className="md:max-w-[158px] md:max-h-[158px] max-w-[80px] max-h-[80px] w-full h-full rounded-[16px] bg-gray-300"></div>
      </div>
      <div className="flex-1 w-full">
        <div className="flex flex-col md:gap-y-[24px] gap-y-[16px]">
          <div className="flex flex-col gap-y-[12px]">
            <div className="w-full">
              <div className="h-[24px] md:h-[27px] bg-gray-300 rounded-md w-3/4"></div>
              <div className="h-[18px] bg-gray-300 rounded-md w-1/2 mt-2"></div>
            </div>
            <div className="h-[15px] md:h-[18px] bg-gray-300 rounded-md w-full"></div>
            <div className="h-[15px] md:h-[18px] bg-gray-300 rounded-md w-5/6"></div>
          </div>
          <div className="product-btn w-full md:w-auto flex justify-end">
            <div className="h-[36px] md:h-[40px] bg-gray-300 rounded-md w-1/2 md:w-auto md:px-[24px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
