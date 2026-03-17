import { useRateActivityMutation } from "@/redux/endpoints/milestones";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

const RateActivity = ({ activityId }: { activityId: number | string }) => {
  const [rated, setRate] = useState<
    "Too-Easy" | "Too-Difficult" | "Just-Right" | null
  >(null);

  const [rate] = useRateActivityMutation();
  const handleRate = (e: any) => {
    setRate(e.currentTarget?.value);
    rate({ activity_id: activityId, rating: e.currentTarget?.value });
  };

  return (
    <div className="rate-emojis flex-1 grid grid-cols-3 gap-[12px] justify-items-center h-full">
      {emojis?.map((emoji) => (
        <button
          key={emoji.id}
          onClick={handleRate}
          value={emoji?.value}
          className={twMerge(
            "h-full w-full p-[8px] flex flex-col items-center gap-y-[8px] rounded-[12px] hover:bg-primary-100",
            rated === emoji?.value ? "bg-primary-100" : ""
          )}
        >
          {emoji.icon}
          <span className="text-center text-black md:text-[16px] text-[14px] font-[700] md:leading-[19.84px] leading-[18.2px]">
            {emoji.title}
          </span>
        </button>
      ))}
    </div>
  );
};

export default RateActivity;

const emojis = [
  {
    id: 1,
    icon: (
      <img 
        src={"/assets/icons/emojis/perfect.svg"}
        width={41}
        height={40}
        alt="perfect"
        className=""
      />
    ),
    title: "Too Easy",
    value: "Too-Easy",
  },
  {
    id: 2,
    icon: (
      <img 
        src={"/assets/icons/emojis/ok.svg"}
        width={41}
        height={40}
        alt="ok"
        className=""
      />
    ),
    title: "Just Right",
    value: "Just-Right",
  },
  {
    id: 3,
    icon: (
      <img 
        src={"/assets/icons/emojis/wonder.svg"}
        width={41}
        height={40}
        alt="wonder"
        className=""
      />
    ),
    title: "Too Difficult",
    value: "Too-Difficult",
  },
];
