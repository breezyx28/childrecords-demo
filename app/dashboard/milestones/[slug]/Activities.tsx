"use client";

import { LearnCard } from "@/components/cards/learn/learn.card";
import UsefulTips from "@/components/sections/dashboard/useful-tips";
import { truncateString } from "@/helper/trimString";
import { useParams } from "react-router-dom";
import React from "react";

const Activities = ({ data, milestoneSlug }: { data?: any; milestoneSlug?: string }) => {
  const { slug } = useParams();
  const slugForHref = milestoneSlug ?? slug;
  const activitiesList = Array.isArray(data) ? data : (data?.activities ?? []);

  return (
    <div className="flex flex-col gap-y-[45px] mt-[20px]">
      <div className="flex flex-col gap-y-[12px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          {activitiesList?.length} Activities
        </h5>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px]">
          {activitiesList?.length > 0 ? (
            activitiesList.map((item: any, index: number) => (
              <LearnCard
                key={item?.id ?? index}
                id={item?.id}
                title={item?.title ?? item?.name}
                href={`/dashboard/milestones/${slugForHref}/${item?.id}`}
                topic={truncateString(item?.description ?? "", 50, " read more")}
                img={item?.photo ?? "/assets/pages/no-image.jpg"}
              />
            ))
          ) : (
            <span className="col-span-2 w-full rounded-[8px] text-center bg-gray-100 p-[22px] text-gray-500 text-[16px] opacity-50">
              No available activities
            </span>
          )}
        </div>
      </div>
      <div className="usefult-tips">
        <UsefulTips />
      </div>
    </div>
  );
};

export default Activities;
