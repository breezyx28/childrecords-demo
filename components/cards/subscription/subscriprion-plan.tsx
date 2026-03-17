"use client";

import { Diamond } from "@/components/icons";
import { useMyInfo } from "@/hooks/useMyInfo";
import React from "react";

const SubscriprionPlan = () => {
  const myInfo = useMyInfo();
  return (
    <div className="md:rounded-[16px] rounded-[8px] p-[16px] animated-background bg-gradient-to-r from-[#5465FD] to-[#B566FF] flex justify-between items-center">
      <div className="flex items-center gap-x-[12px]">
        <div className="bg-white p-[9px] rounded-full">
          <Diamond />
        </div>
        <div className="flex flex-col gap-y-[4px]">
          <p className="text-white text-[14px] font-[600] leading-[18.2px]">
            Your plan
          </p>
          <p className="text-white md:text-[18px] text-[14px] font-[800] leading-[24.55px] capitalize">
            {myInfo?.subscription_plan === null
              ? "Not Subscribed"
              : myInfo?.subscription_plan === "trial"
              ? `Trial / ${"free"}`
              : `${myInfo?.subscription_plan} / ${myInfo?.subscription_tier}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriprionPlan;
