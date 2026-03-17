import React from "react";

const LoginFooter = () => {
  return (
    <div className="w-full text-center py-[25.5px] flex justify-center items-center">
      <span className="text-center text-[#585A5D] text-[14px] font-[700] leading-[18.2px]">
        © {new Date().getFullYear()} {"ChildRecords - Powered by Medinier"}
      </span>
    </div>
  );
};

export default LoginFooter;
