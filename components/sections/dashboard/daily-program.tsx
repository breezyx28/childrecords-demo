"use client";

import { DailyProgramCard } from "@/components/cards/daily-program/daily-program-card";
import { BabyToy } from "@/components/icons";
import RadialProgressBar from "@/components/progress/progress";
import DailyProgramSkeleton from "@/components/skeletons/daily-program";
import { PhotoPath } from "@/redux/ApiConfig";
import { useMilestoneDailyActivitiesQuery } from "@/redux/endpoints/milestones";
import React, { useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

// API returns { daily_activities: [], completion_rate } or legacy { milestones, progress }
const activitiesList = (data: any): any[] => {
  if (!data) return [];
  if (Array.isArray(data?.daily_activities)) return data.daily_activities;
  if (Array.isArray(data?.milestones)) return data.milestones;
  return [];
};
const completionProgress = (data: any): number => {
  if (data?.completion_rate != null) return Number(data.completion_rate);
  if (data?.progress != null) return Number(data.progress);
  return 0;
};

const DailyProgram = () => {
  const {
    data: dailyActivities,
    isLoading,
    isFetching,
  } = useMilestoneDailyActivitiesQuery({});
  const activities = activitiesList(dailyActivities);
  const apiProgress = completionProgress(dailyActivities);

  const [optimisticCheckedIds, setOptimisticCheckedIds] = useState<Set<number>>(() => new Set());
  const [optimisticUncheckedIds, setOptimisticUncheckedIds] = useState<Set<number>>(() => new Set());

  const completedCount = useMemo(() => {
    const apiCompletedIds = new Set(
      activities.filter((a: any) => a?.completed).map((a: any) => Number(a?.id))
    );
    const effective = new Set([
      ...Array.from(apiCompletedIds),
      ...Array.from(optimisticCheckedIds),
    ]);
    optimisticUncheckedIds.forEach((id) => effective.delete(id));
    return effective.size;
  }, [activities, optimisticCheckedIds, optimisticUncheckedIds]);

  const hasUserInteraction = optimisticCheckedIds.size > 0 || optimisticUncheckedIds.size > 0;
  const progress =
    !hasUserInteraction
      ? apiProgress
      : activities.length
        ? Math.round((completedCount / activities.length) * 100)
        : apiProgress;

  const handleCheckedChange = useCallback((activityId: number, checked: boolean) => {
    if (checked) {
      setOptimisticCheckedIds((prev) => new Set(prev).add(activityId));
      setOptimisticUncheckedIds((prev) => {
        const next = new Set(prev);
        next.delete(activityId);
        return next;
      });
    } else {
      setOptimisticUncheckedIds((prev) => new Set(prev).add(activityId));
      setOptimisticCheckedIds((prev) => {
        const next = new Set(prev);
        next.delete(activityId);
        return next;
      });
    }
  }, []);

  return (
    <div
      className={twMerge(
        "w-full mt-[41px]",
        activities.length > 0 || isLoading || isFetching ? "block" : "hidden"
      )}
    >
      <div className="wrapper w-full flex flex-col divide divide-y">
        <div className="pb-[17px] flex justify-between items-center">
          <div className="flex flex-col gap-y-[4px]">
            <p className="text-black md:text-[28px] text-[20px] font-[800] md:leading-[38.19px] leading-[27.28px]">
              Daily Program
            </p>
            <p className="text-[#83868B] text-[16px] font-[600] leading-[19.84px]">
              Select {activities.length} activities
            </p>
          </div>
          <div className="daily-program-progress">
            <RadialProgressBar percentage={progress} />
          </div>
        </div>
        <div className="flex flex-col divide divide-y">
          {isLoading
            ? [1, 2, 3, 4, 5, 6].map((item, index) => (
                <DailyProgramSkeleton key={index} />
              ))
            : activities.map((item: any) => (
                <DailyProgramCard
                  key={item?.id}
                  id={item?.id}
                  icon={
                    item?.icon ? (
                      <img src={PhotoPath(item?.icon)} width="24" height="24" alt="" />
                    ) : (
                      <BabyToy className="text-[#FEA433]" />
                    )
                  }
                  title={item?.title ?? item?.name}
                  checked={item?.completed}
                  onCheckedChange={handleCheckedChange}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default DailyProgram;
