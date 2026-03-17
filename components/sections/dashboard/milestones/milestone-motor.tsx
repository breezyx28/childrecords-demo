"use client";

import React, { useCallback, useMemo, useState } from "react";
import MotorSection from "./motor-sections";
import { Child, Pickup } from "@/components/icons";
import { removePercentage } from "@/helper/remove-percent";
import RadialProgressBar from "@/components/progress/progress";
import { useGetMilestonesQuery } from "@/redux/endpoints/milestones";
import { MilestoneCategoryMilestoneProps } from "@/types/milestone";
import { generateSlug } from "@/helper/string-to-slug";

type MilestonesMotoProps = {
  id: number | string;
  name: string;
  description?: string;
  percent: string;
};

const MilestoneMotor = ({ id, name, description, percent }: MilestonesMotoProps) => {
  const {
    data: categoryMilestonesData,
    isLoading,
    isFetching,
  } = useGetMilestonesQuery({ category_id: id });

  const milestones = categoryMilestonesData?.milestones ?? categoryMilestonesData;
  const milestonesArray = Array.isArray(milestones) ? milestones : [];

  const [optimisticCheckedIds, setOptimisticCheckedIds] = useState<Set<number>>(() => new Set());
  const [optimisticUncheckedIds, setOptimisticUncheckedIds] = useState<Set<number>>(() => new Set());

  const completedCount = useMemo(() => {
    const apiCompletedIds = new Set(
      milestonesArray
        .filter((item: any) => item?.completed)
        .map((item: any) => Number(item?.id))
    );
    const effective = new Set([
      ...Array.from(apiCompletedIds),
      ...Array.from(optimisticCheckedIds),
    ]);
    optimisticUncheckedIds.forEach((id) => effective.delete(id));
    return effective.size;
  }, [milestonesArray, optimisticCheckedIds, optimisticUncheckedIds]);

  const hasUserInteraction = optimisticCheckedIds.size > 0 || optimisticUncheckedIds.size > 0;
  const displayPercent = useMemo(() => {
    if (milestonesArray.length === 0) {
      return percent != null && percent !== "" ? percent : "0";
    }
    if (!hasUserInteraction) {
      return percent != null && percent !== "" ? percent : "0%";
    }
    const pct = Math.round((completedCount / milestonesArray.length) * 100);
    return `${pct}%`;
  }, [milestonesArray.length, completedCount, percent, hasUserInteraction]);

  const handleCheckedChange = useCallback((milestoneId: number, checked: boolean) => {
    if (checked) {
      setOptimisticCheckedIds((prev) => new Set(prev).add(milestoneId));
      setOptimisticUncheckedIds((prev) => {
        const next = new Set(prev);
        next.delete(milestoneId);
        return next;
      });
    } else {
      setOptimisticUncheckedIds((prev) => new Set(prev).add(milestoneId));
      setOptimisticCheckedIds((prev) => {
        const next = new Set(prev);
        next.delete(milestoneId);
        return next;
      });
    }
  }, []);

  return (
    <div className="w-full h-auto">
      <div className="p-[12px] flex justify-between items-center bg-primary-100 rounded-[12px]">
        <div className="flex flex-col gap-y-[4px] flex-1 min-w-0">
          <div className="flex items-center gap-x-[12px]">
            {/* @ts-ignore */}
            <span className="">{motorsIcons[name] ?? ""}</span>
            <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
              {name}
            </h5>
          </div>
          {description ? (
            <p className="text-stone-600 text-sm md:text-base leading-snug pl-[36px]">
              {description}
            </p>
          ) : null}
        </div>
        <div className="">
          <RadialProgressBar
            percentage={Number(removePercentage(displayPercent)) || 0}
          />
        </div>
      </div>
      <div className="flex flex-col divide-y-[4px]">
        {milestonesArray.map(
          (item: MilestoneCategoryMilestoneProps, index: any) => (
            <MotorSection
              key={index}
              id={item?.id}
              parentId={generateSlug(name)}
              title={item?.title ?? item?.name ?? ""}
              description={item?.description ?? item?.about ?? ""}
              checked={item?.completed}
              onCheckedChange={handleCheckedChange}
            />
          )
        )}
      </div>
    </div>
  );
};

type MotorsIconsType = Record<string, React.ReactNode | unknown>;

const motorsIcons: MotorsIconsType = {
  "Gross Motor": <Child className="text-primary-600" />,
  "Fine Motor": <Pickup className="text-primary-600" />,
  "Physical Development": <Child className="text-primary-600" />,
  "Cognitive Development": <Pickup className="text-primary-600" />,
  "Language Development": <Child className="text-primary-600" />,
  "Social-Emotional Development": <Child className="text-primary-600" />,
  Cognitive: "",
  Communication: "",
  Sensory: "",
};

export default MilestoneMotor;
