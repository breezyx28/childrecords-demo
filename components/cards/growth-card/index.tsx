"use client";

import React from "react";
import { Age, Height, Weight } from "@/components/icons";
import "@/styles/components/switch-input.css";
import { LogProps } from "@/types/growth-chart";
import { formatDate } from "@/helper/date-formatter";
import { trimString } from "@/helper/trimString";

const GrowthCard = ({
  log: { age, height, weight, created_at, allow_log, next_log_date },
}: {
  log: LogProps;
}) => {
  return (
    <div className="w-full py-[24px] border-b border-[#E2E6ED]">
      <div className="wrapper w-full flex md:flex-row flex-col justify-between md:items-center items-start gap-y-[12px] md:gap-y-[0px]">
        <div className="child-info text-[#83868B] w-auto flex items-center gap-x-[40px]">
          <div className="divide divide-x grid grid-cols-3">
            <div className="child-switch-prop child-age">
              <div className="flex items-center gap-x-[8px]">
                <Age />
                <span className="text-[14px] font-[700] leading-[18.2px]">
                  Age
                </span>
              </div>
              <p className="text-black text-start text-[16px] font-[800] leading-[21.82px]">
                {age}
              </p>
            </div>
            <div className="child-switch-prop child-weight">
              <div className="flex items-center gap-x-[8px]">
                <Weight />
                <span className="text-[14px] font-[700] leading-[18.2px]">
                  Weight
                </span>
              </div>
              <p className="text-black text-start text-[16px] font-[800] leading-[21.82px]">
                {trimString(weight, "kg")} kg
              </p>
            </div>
            <div className="child-switch-prop child-height">
              <div className="flex items-center gap-x-[8px]">
                <Height />
                <span className="text-[14px] font-[700] leading-[18.2px]">
                  Height
                </span>
              </div>
              <p className="text-black text-start text-[16px] font-[800] leading-[21.82px]">
                {trimString(height, "cm")} cm
              </p>
            </div>
          </div>
        </div>
        <p className="growth-log-date md:w-auto w-full md:text-auto text-end text-[#83868B] text-[14px] font-[600] leading-[18.2px]">
          Logged on {formatDate(created_at)}
        </p>
      </div>
    </div>
  );
};

export default GrowthCard;
