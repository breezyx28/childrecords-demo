"use client";

import Button from "@/components/buttons/button";
import { ArrowDown } from "@/components/icons";
import EditChildSwitch from "@/components/sections/child/edit-child-switch";
import React from "react";
import MomentsTimeline from "./moments-timeline";
import { SwitchChildModal } from "@/components/sections/child/switch-child-modal";
import { useGetAchievedMilestonesQuery } from "@/redux/endpoints/account";
import MomentsTimelineSkeleton from "@/components/skeletons/moments";
import NoAchievement from "./no-achievement";
import { plansChildrenRestrictions } from "@/config/plan-module/plans-restrictions";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/context/UserContext";
import { Lock01 } from "untitledui-js";
import { Crown } from "lucide-react";

const Childrens = () => {
  const navigate = useNavigate();

  const { userInfo: myInfo } = useUserContext();

  const isRestricted = plansChildrenRestrictions(myInfo as any);

  const {
    data: achievementData,
    isLoading,
    isFetching,
  } = useGetAchievedMilestonesQuery({});

  const achievedMilestones = achievementData?.achieved_milestones ?? (Array.isArray(achievementData) ? achievementData : []);

  const openUpgradeDialog = () => {
    document.getElementById("upgrade-dialog")?.click();
  };

  return (
    <div className="w-full">
      <div className="wrapper w-full flex flex-col gap-y-[16px]">
        {isRestricted && (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-primary-100 border border-primary-200"
            role="alert"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary-200">
                <Lock01 className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <p className="text-black font-[700] text-[14px] leading-tight">
                  You've reached your plan limit
                </p>
                <p className="text-[#83868B] text-[12px] font-[500] mt-0.5">
                  Upgrade your plan to add more children and unlock all features.
                </p>
              </div>
            </div>
            <Button
              text="Upgrade plan"
              icon={<Crown className="w-4 h-4" />}
              buttonAttributes={{ onClick: openUpgradeDialog }}
              className="!px-[20px] !py-[10px] !text-[13px] !font-[700] shrink-0"
            />
          </div>
        )}
        <div className="child-nav">
          <div className="w-full flex justify-between items-center">
            <span className="text-[16px] font-[800] leading-[21.82px]">
              {myInfo?.children_num ?? 0} Childs
            </span>
            <div className="flex items-center justify-end gap-x-[8px]">
              <div className="rounded-full bg-primary-100">
                <label
                  htmlFor="switch-child-modal"
                  className="switch-wrapper flex items-center gap-x-[8px] px-[16px] py-[10px] cursor-pointer"
                >
                  <span className="text-primary-600 text-[12px] font-[700] leading-[19.84px]">
                    Switch
                  </span>
                  <span className="">
                    <ArrowDown className="text-primary-600 !w-[16px]" />
                  </span>
                </label>
              </div>
              <Button
                // disabled={isRestricted}
                href="#"
                text={isRestricted ? "Upgrade Plan" : "Add child"}
                icon={
                  isRestricted ? (
                    <Lock01 width={16} height={16} color="white" />
                  ) : (
                    ""
                  )
                }
                buttonAttributes={{
                  onClick(e) {
                    if (isRestricted) {
                      document.getElementById("upgrade-dialog")?.click();
                      return;
                    }
                    e.preventDefault();
                    navigate("/add-child");
                  },
                }}
                className="!px-[16px] !py-[8px] !text-[12px] !font-[700]"
              />
            </div>
          </div>
        </div>
        <div className="">
          <EditChildSwitch />
        </div>
        {!isRestricted && (
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={openUpgradeDialog}
              className="text-primary-600 text-[12px] font-[700] hover:underline flex items-center gap-1"
            >
              <Crown className="w-3.5 h-3.5" />
              Upgrade plan to add more children
            </button>
          </div>
        )}
        <div className="flex flex-col gap-y-[8px]">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[#83868B] text-[12px] font-[700] leading-[15.6px]">
              Milestones
            </span>
            {!isLoading && !isFetching && achievementData != null && (
              <span className="text-[#83868B] text-[12px] font-[600] leading-[15.6px]">
                {achievementData?.total_achieved ?? achievedMilestones?.length ?? 0} achieved
                {achievementData?.completion_rate != null && (
                  <> · {achievementData.completion_rate}% completion</>
                )}
              </span>
            )}
          </div>
          <div className="overflow-y-auto w-full min-h-full h-full">
            {isFetching || isLoading ? (
              <MomentsTimelineSkeleton />
            ) : achievedMilestones?.length > 0 ? (
              achievedMilestones?.map((item: any, index: number) => (
                <MomentsTimeline
                  key={"moment-timeline-" + index}
                  data={{
                    ...item,
                    achieved_at: item.completion_date ?? item.achieved_at,
                    name: item.title ?? item.name,
                    photos: item.photo ? [{ photo: item.photo }] : [{ photo: null }],
                  }}
                />
              ))
            ) : (
              <NoAchievement />
            )}
          </div>
        </div>
      </div>
      <SwitchChildModal />
    </div>
  );
};

export default Childrens;
