"use client";

import React from "react";
import { Age, Height, Weight } from "@/components/icons";
import "@/styles/components/switch-input.css";
import { useGetParentChildrenQuery } from "@/redux/endpoints/child";
import { ChildThumb } from "@/components/cards/switch-child/child-thumbnail";
import { trimString } from "@/helper/trimString";
import EditChildSwitchSkeleton from "@/components/skeletons/edit-child-switch";
import { Link } from "react-router-dom";

const EditChildSwitch = () => {
  const { data: children, isFetching } = useGetParentChildrenQuery(undefined);

  // Callback to find selected child
  const getSelectedChild = React.useCallback(() => {
    if (children) {
      const selected = children.find((item: any) => item.selected === true);
      return selected || null;
    }
    return null;
  }, [children]);

  const selectedChild = getSelectedChild();

  return isFetching ? (
    <EditChildSwitchSkeleton />
  ) : (
    <div className="w-full p-[16px] rounded-[16px] border border-[#E2E6ED]">
      <div className="wrapper w-full flex flex-col gap-y-[16px]">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-[12px]">
            <ChildThumb
              thumb={selectedChild?.photo}
              className="!w-[40px] !h-[40px]"
            />
            <span className="child-name text-black text-[16px] font-[800] leading-[21.82px]">
              {selectedChild?.name}
            </span>
          </div>
          <Link
            to={`/dashboard/profile/childrens/${selectedChild?.id}`}
            className="px-[16px] py-[12px] text-black text-[12px] font-[700] leading-[15.6px] border border-[#E9ECF1] rounded-full"
          >
            Edit Info
          </Link>
        </div>
        <div className="child-info text-[#83868B] w-auto flex items-center gap-x-[40px]">
          <div className="divide divide-x grid grid-cols-3 gap-x-[16px] md:min-w-[400px] min-w-auto">
            <div className="child-switch-prop !pl-0 !items-start child-age">
              <div className="flex items-center gap-x-[8px]">
                <Age />
                <span className="md:text-[14px] text-[12px] font-[700] leading-[18.2px]">
                  Age
                </span>
              </div>
              <p className="text-black md:text-[16px] text-[14px] font-[800] leading-[21.82px]">
                {selectedChild?.age}
              </p>
            </div>
            <div className="child-switch-prop !items-start child-weight">
              <div className="flex items-center gap-x-[8px]">
                <Weight />
                <span className="md:text-[14px] text-[12px] font-[700] leading-[18.2px]">
                  Weight
                </span>
              </div>
              <p className="text-black md:text-[16px] text-[14px] font-[800] leading-[21.82px]">
                {trimString(selectedChild?.weight as string, "kg")} Kg
              </p>
            </div>
            <div className="child-switch-prop !items-start child-height">
              <div className="flex items-center gap-x-[8px]">
                <Height />
                <span className="md:text-[14px] text-[12px] font-[700] leading-[18.2px]">
                  Height
                </span>
              </div>
              <p className="text-black md:text-[16px] text-[14px] font-[800] leading-[21.82px]">
                {trimString(selectedChild?.height as string, "cm")} cm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditChildSwitch;
