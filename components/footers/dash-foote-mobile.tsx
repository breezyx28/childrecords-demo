import React from "react";

const DashFooterMobile = () => {
  return (
    <div className="w-full text-center py-[25.5px] bg-[#F8F9FA] flex justify-center items-center place-end">
      <span className="text-center text-[#585A5D] text-[12px] font-[700] leading-[18.2px]">
        © {new Date().getFullYear()} {"ChildRecords - Powered by Medinier"}
      </span>
    </div>
  );
};

export default DashFooterMobile;
