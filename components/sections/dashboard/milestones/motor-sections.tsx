"use client";

import React, { ChangeEvent } from "react";
import ActivitiesCollapse from "./activities-collapse";
import { generateSlug } from "@/helper/string-to-slug";
import { Link } from "react-router-dom";
import {
  useGetMilestoneActivitiesQuery,
  useMarkMilestoneCompletedMutation,
  useUploadMomentPhotosMutation,
} from "@/redux/endpoints/milestones";
import Dialog from "@/components/modals/dialog";
import Button from "@/components/buttons/button";
import OutlineButton from "@/components/buttons/OutlineButton";
import MilestoneMomentImg from "./milestone-moment-img";
import objectToFormData from "@/helper/object-to-formdata";
import { useCountdown } from "@/hooks/useCountdown";
import { count } from "console";
import MilestoneChecker from "./milestone-checker";

type MotorSectionProps = {
  id: string | number;
  parentId: string;
  title: string;
  checked: boolean;
  description: string;
  onCheckedChange?: (milestoneId: number, checked: boolean) => void;
};

const MotorSection = ({
  id,
  parentId,
  title,
  checked,
  description,
  onCheckedChange,
}: MotorSectionProps) => {
  const { data: activities, isLoading } = useGetMilestoneActivitiesQuery({
    milestone_id: id,
  });

  return (
    <div className="w-full pt-[24px] pb-[40px]">
      <div className="w-full flex flex-col gap-y-[12px]">
        <div className="flex items-center gap-x-[40px] px-[24px]">
          <Link
            to={`/dashboard/milestones/${id}`}
            className="w-full"
          >
            <div className="flex flex-col gap-y-[4px]">
              <h6 className="text-black md:text-[20px] text-[16px] font-[800] md:leading-[27.28px] leading-[21.82px] hover:underline hover:text-primary-500 cursor-pointer">
                {title}
              </h6>
              <p className="text-[#83868B] text-[14px] font-[600] leading-[18.2px] line-clamp-3">
                {description}
              </p>
            </div>
          </Link>
          <MilestoneChecker
            milestoneId={id as number}
            name={title}
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        </div>
        {activities?.length > 0 && (
          <ActivitiesCollapse
            activities={activities ?? []}
            milestoneId={id as number}
          />
        )}
      </div>
    </div>
  );
};

export default MotorSection;
