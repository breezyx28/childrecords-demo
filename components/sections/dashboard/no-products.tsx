import React from "react";

const NoProducts = () => {
  return (
    <div className="md:col-span-2 col-span-1 w-full flex flex-col justify-center items-center gap-1 text-center min-h-[200px]">
      <p className="text-2xl font-[800]">No Products</p>
      <span className="text-gray-400 text-md font-semibold">
        No Products found for this milestone
      </span>
    </div>
  );
};

export default NoProducts;
