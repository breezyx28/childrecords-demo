import { BabySittingUp } from "@/components/icons";
import MilestoneChecker from "@/components/sections/dashboard/milestones/milestone-checker";
import { generateSlug } from "@/helper/string-to-slug";
import React from "react";

const RelatedMilestone = ({ data }: { data: any }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-x-[11px]">
        <BabySittingUp className="text-green-600" />
        <span className="text-black text-[16px] font-[700] leading-[19.84px]">
          {data?.name}
        </span>
      </div>
      <MilestoneChecker
        milestoneId={data?.id as number}
        name={data?.name}
        checked={data?.completed ?? false}
      />
      {/* <div className="">
        <input
          id={`related-milestone-${generateSlug("setting up")}`}
          type="checkbox"
          defaultChecked={false}
          className="checkbox border-2 border-[#AFB3BA] [--chkbg:#394CFF] [--chkfg:#fff] checked:border-primary-600 checkbox-md"
        />
      </div> */}
    </div>
  );
};

export default RelatedMilestone;
