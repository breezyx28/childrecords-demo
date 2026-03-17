"use client";

import SubscriprionPlan from "@/components/cards/subscription/subscriprion-plan";
import { Link } from "react-router-dom";
import React from "react";
import ProfileInfo from "./profile-info";
import ProfileImage from "./profile-image";
import { useMyInfo } from "@/hooks/useMyInfo";

const Information = () => {
  const myInfo = useMyInfo();

  return (
    <div className="flex flex-col gap-y-[24px] mt-[24px]">
      <div className="profile-info flex items-center justify-between">
        <div className="flex gap-x-[12px] items-center">
          <ProfileImage />
          <div className="flex flex-col gap-y-[4px]">
            <p className="text-black md:text-[16px] text-[14px] font-[700] leading-[19.84px]">
              {myInfo?.fullname ?? "Unknown"}
            </p>
            <p className="text-[#83868B] md:text-[14px] text-[12px] font-[500] leadding-[18.2px]">
              {myInfo?.email ?? "unknown@mail.com"}
            </p>
          </div>
        </div>
        <Link to="/dashboard/profile/settings" className="">
          <button className="px-[16px] py-[12px]  text-black text-[12px] font-[700] leading-[15.6px] border border-[#E9ECF1] rounded-full">
            Edit Info
          </button>
        </Link>
      </div>
      <div className="flex flex-col gap-y-[16px]">
        <SubscriprionPlan />
        <ProfileInfo />
      </div>
    </div>
  );
};

export default Information;
