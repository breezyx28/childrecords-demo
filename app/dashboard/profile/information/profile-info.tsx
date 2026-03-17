"use client";

import ProfileNavSm from "@/components/navs/profile-nav-sm";
import ProfileNavLink from "@/components/sections/dashboard/profile/navs/profile-nav-link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useMyInfo } from "@/hooks/useMyInfo";
import React from "react";

const ProfileInfo = () => {
  const isMdOrSmaller = useMediaQuery("(max-width: 768px)");

  const myInfo = useMyInfo();
  return isMdOrSmaller ? (
    <ProfileNavSm />
  ) : (
    <>
      <div className="flex flex-col gap-y-[8px]">
        <h1 className="text-[#83868B] text-[14px] font-[700] leading-[15.6px]">
          Profile Information
        </h1>
        <div className="flex flex-col gap-y-[20px]">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px]">
            <div className="flex md:flex-col flex-row justify-between gap-[4px]">
              <p className="text-[#83868B] text-[14px] font-[500] leading-[18.2px]">
                Name
              </p>
              <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                {myInfo?.fullname ?? "----"}
              </p>
            </div>
            <div className="flex md:flex-col flex-row justify-between gap-[4px]">
              <p className="text-[#83868B] text-[14px] font-[500] leading-[18.2px]">
                Email
              </p>
              <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                {myInfo?.email ?? "----"}
              </p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px]">
            <div className="flex md:flex-col flex-row justify-between gap-[4px]">
              <p className="text-[#83868B] text-[14px] font-[500] leading-[18.2px]">
                Childs
              </p>
              <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                {myInfo?.children_num
                  ? myInfo?.children_num + " Children"
                  : "----"}
              </p>
            </div>
            <div className="flex md:flex-col flex-row justify-between gap-[4px]">
              <p className="text-[#83868B] text-[14px] font-[500] leading-[18.2px]">
                Nationality
              </p>
              <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                {myInfo?.nationality ?? "----"}
              </p>
            </div>
            {/* <div className="flex md:flex-col flex-row justify-between gap-[4px]">
              <p className="text-[#83868B] text-[14px] font-[500] leading-[18.2px]">
                Joined on
              </p>
              <p className="text-black text-[14px] font-[700] leading-[18.2px]">
                {"14 Aug/2020"}
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
