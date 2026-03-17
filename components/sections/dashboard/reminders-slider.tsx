"use client";

import React, { useMemo } from "react";
import Slider from "@/components/slider";
import { useGetAllRemindersQuery } from "@/redux/endpoints/reminder";
import { ReminderCard } from "@/components/cards/reminders/reminder-card";
import { ReminderCardSkeleton } from "@/components/skeletons/reminders-card";
import NoReminder from "@/components/pages/reminders/no-reminder";
import { twMerge } from "tailwind-merge";

// API returns { upcoming: [], total } or legacy array
const asReminderList = (data: unknown): any[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "upcoming" in data && Array.isArray((data as { upcoming: any[] }).upcoming)) {
    return (data as { upcoming: any[] }).upcoming;
  }
  return [];
};

const RemindersSlider = () => {
  const {
    data: allRemindersData,
    isLoading,
    isFetching,
    refetch: refetchAllReminders,
  } = useGetAllRemindersQuery({});

  const reminderList = useMemo(() => asReminderList(allRemindersData), [allRemindersData]);

  const todayStr = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const remindersData = useMemo(
    () => reminderList.filter((item: any) => item?.reminder_date === todayStr || item?.today),
    [reminderList, todayStr]
  );

  const TodayReminders = remindersData?.map((item: any, index: number) => (
    <ReminderCard
      key={item?.id ?? index}
      id={item?.id}
      subject={item?.type ?? item?.description}
      title={item?.title}
      date={item?.reminder_date ?? item?.date}
      closeIcon={false}
      refetchAllReminders={refetchAllReminders}
    />
  ));

  const LoadingReminders = Array.from({ length: 3 }, (_, index) => (
    <ReminderCardSkeleton key={index} />
  ));

  return (
    <div
      className={twMerge(
        "w-full flex-col gap-y-[12px] mt-[32px]",
        TodayReminders?.length > 0 || isLoading || isFetching
          ? "flex"
          : "hidden"
      )}
    >
      <h4 className="text-black md:text-[28px] text-[20px] font-[800] md:leading-[38.19px] leading-[27.28px]">
        Reminders
      </h4>
      <div className="slider-container w-full">
        {isLoading ? (
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[12px]">
            {LoadingReminders}
          </div>
        ) : TodayReminders?.length > 0 ? (
          <Slider
            sliderContainerClass="flex items-center"
            data={TodayReminders}
            sliderOptions={{
              gap: "12px",
              perPage: TodayReminders?.length < 3 ? TodayReminders?.length : 3,
              breakpoints: {
                1440: {
                  perPage:
                    TodayReminders?.length < 3 ? TodayReminders?.length : 3,
                },
                1080: {
                  perPage:
                    TodayReminders?.length > 2 ? 2 : TodayReminders?.length,
                },
                640: {
                  perPage:
                    TodayReminders?.length > 2 ? 2 : TodayReminders?.length,
                  // perMove: 1,
                },
              },
            }}
          />
        ) : (
          <NoReminder />
        )}
      </div>
    </div>
  );
};

export default RemindersSlider;
