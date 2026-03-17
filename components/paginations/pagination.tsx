import React from "react";
import { ArrowLeft, ArrowRight } from "untitledui-js";

interface PaginationProps {
  currentPage: number;
  perPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  perPage,
  totalItems,
  onPageChange,
}) => {
  // Calculate total pages based on totalItems and perPage
  const totalPages = Math.ceil(totalItems / perPage);

  return (
    <div className="w-full flex justify-center">
      <div
        style={{
          boxShadow: "0px 1px 2px 0px #1018280D",
        }}
        className="w-auto flex items-center text-[14px] text-black rounded-[8px] border border-[#DBE0E8] divide-x"
      >
        {/* Previous Button */}
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex items-center gap-x-[8px] px-[16px] py-[10.5px] hover:bg-[#F8F9FA] disabled:opacity-50"
        >
          <ArrowLeft />
          <span>{"Previous"}</span>
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`px-[16px] py-[10.5px] ${
              currentPage === index + 1 ? "bg-[#F8F9FA]" : ""
            } hover:bg-[#F8F9FA]`}
          >
            {index + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex items-center gap-x-[8px] px-[16px] py-[10.5px] hover:bg-[#F8F9FA] disabled:opacity-50"
        >
          <span>{"Next"}</span>
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
