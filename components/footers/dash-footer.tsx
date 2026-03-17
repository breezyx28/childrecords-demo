import React from "react";

const DashFooter = () => {
  return (
    <div className="md:block hidden w-full text-center py-[25.5px] bg-[#F8F9FA] flex justify-center items-center place-end">
      <span className="text-center text-[#585A5D] text-[14px] font-[700] leading-[18.2px]">
        © {new Date().getFullYear()} {"ChildRecords - Powered by Medinier"}
      </span>
    </div>
  );
};

export default DashFooter;
