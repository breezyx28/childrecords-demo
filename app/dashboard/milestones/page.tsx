"use client";

import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import MilestoneMotor from "@/components/sections/dashboard/milestones/milestone-motor";
import SwitchChild from "@/components/sections/dashboard/switch-child";
import MilestoneMotorSkeleton from "@/components/skeletons/milestone-motor";
import { useMilestoneCtegoriesQuery } from "@/redux/endpoints/milestones";
import { MilestoneCategoryProps } from "@/types/milestone";
import React from "react";

const Milestones = () => {
  const { data: motors, isLoading } = useMilestoneCtegoriesQuery({});

  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/milestones", title: "Milestones" },
      ]}
    >
      <div className="w-full flex flex-col gap-y-[24px]">
        <div className="my-[1rem]">
          <SwitchChild />
        </div>
        {isLoading ? (
          [1, 2].map((item, index) => <MilestoneMotorSkeleton key={index} />)
        ) : motors?.length > 0 ? (
          motors?.map((item: MilestoneCategoryProps, index: number) => (
            <MilestoneMotor
              key={item?.id ?? index}
              id={item?.id}
              name={item?.name}
              description={item?.description}
              percent={item?.progress != null ? String(item.progress) : item?.child_progress ?? "0"}
            />
          ))
        ) : (
          <span className="text-xl text-stone-400 text-center">
            No Milestones after age 5 years
          </span>
        )}
      </div>
    </PagesLayout>
  );
};

export default Milestones;
