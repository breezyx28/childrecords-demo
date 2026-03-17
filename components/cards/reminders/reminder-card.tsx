"use client";

import React from "react";
import { Age, Close } from "@/components/icons";
import RemoveReminderModal from "@/components/pages/reminders/reminder-modals/remove-reminder-modal";

type ReminderCardProps = {
  id: string | number;
  subject: string;
  title: string;
  date: string;
  closeIcon?: boolean;
  refetchAllReminders: (...args: any) => any;
};

const colorOptions = [
  "bg-blue-200",
  "bg-yellow-200",
  "bg-indigo-200",
  "bg-green-200",
  "bg-purple-200",
  "bg-teal-200",
];

export const ReminderCard = ({
  id,
  subject,
  title,
  date,
  closeIcon = true,
  refetchAllReminders,
}: ReminderCardProps) => (
  <>
    <div
      id={`reminder-card-${id}`}
      className={`reminder-card-container !w-full h-[134px] relative ${
        colorOptions[+getRandomNumber()]
      } flex flex-col justify-between relative p-[16px] rounded-[12px]`}
    >
      {closeIcon && (
        <div
          className="reminder-close-btn absolute top-[12px] right-[12px] cursor-pointer"
          onClick={() =>
            document.getElementById(`delete-reminder-${id}`)?.click()
          }
        >
          <Close className="text-[#25314C]" />
        </div>
      )}

      <div className="flex flex-col gap-y-[4px]">
        <p className="text-[#585A5D] text-[14px] font-[600] leading-[18.2px]">
          {subject}
        </p>
        <p className="max-w-[200px] w-full text-black text-[16px] font-[700] leading-[19.84px]">
          {title}
        </p>
      </div>
      <div className="text-black flex items-center gap-x-[3px] pt-[20px]">
        <Age className="w-[16px] h-[16px]" />
        <span className="text-[14px] font-[700] leading-[18.2px]">{date}</span>
      </div>
    </div>
    <RemoveReminderModal refetchAllReminders={refetchAllReminders} id={+id} />
  </>
);

function getRandomNumber(): number {
  return Math.floor(Math.random() * 5) + 1;
}
