import { EmptyNotificationIcon } from "@/components/icons";
import React from "react";

const EmptyNotification = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-[16px] mb-[24px]">
      <div className="w-[100px] h-[100px]">
        <EmptyNotificationIcon className="text-[#AFB3BA]" />
      </div>
      <p className="text-black md:text-[18px] text-[14px] font-[800] leading-[24.55px]">
        Notifications are empty
      </p>
    </div>
  );
};

export default EmptyNotification;
