"use client";

import { Age, Height, Weight } from "@/components/icons";
import { ChildProps } from "@/types/children";
import React from "react";
import { ChildThumb } from "./child-thumbnail";
import { trimString } from "@/helper/trimString";

import { twMerge } from "tailwind-merge";

const DisabledSwitchChildCard = ({ childData }: { childData: ChildProps }) => {
  return (
    <div>
      <div
        className={twMerge(
          "w-full md:p-[24px] p-[12px] rounded-[24px] border hover:border-primary-600 border-[#E2E6ED] bg-stone-300 opacity-50",
          childData?.selected && "border-2 border-primary-600"
        )}
      >
        <label
          htmlFor={`child-radio-${childData?.id}`}
          className="wrapper w-full flex md:flex-row flex-col md:items-center items-start md:gap-[21px] gap-[16px] cursor-pointer"
        >
          <div className="child-profile w-full">
            <div className="flex items-center gap-x-[16px]">
              <input
                disabled
                id={`child-radio-${childData?.id}`}
                type="radio"
                name={`child-1`}
                className="radio border-2 border-[#AFB3BA] bg-transparent checked:border-primary-600 checked:bg-primary-600"
                defaultChecked={childData?.selected}
                style={{
                  boxShadow:
                    "0 0 0 2px var(--fallback-b1,oklch(var(--b1)/1)) inset, 0 0 0 2px var(--fallback-b1,oklch(var(--b1)/1)) inset",
                }}
              />
              <ChildThumb
                thumb={childData?.photo}
                className="sm-md:w-[48px] sm-md:h-[48px]"
              />
              <span className="child-name text-black text-[20px] font-[800] leading-[27.28px]">
                {childData?.name}
              </span>
            </div>
          </div>
          <div className="child-info text-[#83868B] w-full">
            <div className="w-full divide divide-x grid grid-cols-3">
              <div className="child-switch-prop child-age">
                <div className="flex items-center gap-x-[8px]">
                  <Age />
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    Age
                  </span>
                </div>
                <p className="text-black text-[16px] font-[800] leading-[21.82px]">
                  {childData?.age}
                </p>
              </div>
              <div className="child-switch-prop child-weight">
                <div className="flex items-center gap-x-[8px]">
                  <Weight />
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    Weight
                  </span>
                </div>
                <p className="text-black text-[16px] font-[800] leading-[21.82px]">
                  {trimString(childData?.weight as string, "kg")} Kg
                </p>
              </div>
              <div className="child-switch-prop child-height">
                <div className="flex items-center gap-x-[8px]">
                  <Height />
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    Height
                  </span>
                </div>
                <p className="text-black text-[16px] font-[800] leading-[21.82px]">
                  {trimString(childData?.height as string, "cm")} cm
                </p>
              </div>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default DisabledSwitchChildCard;
