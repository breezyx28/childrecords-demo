import LearnSlider from "@/components/cards/learn/learn-slider";
import { LearnCard } from "@/components/cards/learn/learn.card";
import React from "react";
import { twMerge } from "tailwind-merge";

type ActivitiesCollapseProps = {
  activities: any[];
  milestoneId?: number;
};

const ActivitiesCollapse = ({
  activities,
  milestoneId,
}: ActivitiesCollapseProps) => {
  return (
    <div
      tabIndex={0}
      className={twMerge(
        "collapse collapse-arrow",
        activities?.length > 0 ? "collapse-open" : ""
      )}
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title text-[14px] font-[700] text-primary-600 bg-[#F8F9FA] rounded-[8px]">
        {activities.length} Activities
      </div>
      <div className="collapse-content bg-white w-full mt-[12px]">
        <LearnSlider
          learnCards={activities?.map((item) => (
            <LearnCard
              key={item?.id}
              id={item?.id}
              className=""
              href={`/dashboard/milestones/${milestoneId}/${item?.id}`}
              title={item?.name}
              img={item?.photo}
              topic={item?.description}
            />
          ))}
          // sliderOptions={{
          //   perPage: 3,
          // }}
        />
      </div>
    </div>
  );
};

export default ActivitiesCollapse;
