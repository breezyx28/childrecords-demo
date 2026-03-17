"use client";

import { Bell } from "@/components/icons";
import { useMarkNotificationAsReadedMutation } from "@/redux/endpoints/notifications";
import { NotificationItem } from "@/types/notifications";
import React from "react";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NotificationsCard = ({ data }: { data: NotificationItem }) => {
  const humanReadableTime = dayjs(
    data?.data?.created_at,
    "MM/DD/YYYY HH:mm"
  ).fromNow();

  const [readed, setReaded] = React.useState<boolean>(false);
  const [read, { data: readedData, isLoading }] =
    useMarkNotificationAsReadedMutation();

  React.useEffect(() => {
    if (data?.data?.read) {
      setReaded(true);
    }
  }, [data?.data?.read]);

  return (
    <div
      className="flex justify-between py-[16px] cursor-pointer"
      onClick={() => {
        read({ notification_id: data?.id });
        setReaded(true);
      }}
    >
      <div className="flex gap-x-[12px]">
        <div className="noti-icon">
          <div className="noti-indicator relative">
            <span
              className={twMerge(
                "absolute border-[3px] border-white bg-primary-600 p-[4px] right-[0px] rounded-full",
                readed && "hidden"
              )}
            ></span>
            <div
              className={twMerge(
                "bg-primary-100 grid p-[8px] rounded-full place-items-center",
                readed && "bg-[#F1F3F6]"
              )}
            >
              <Bell
                props={{
                  className: twMerge(
                    "text-primary-600",
                    readed && "text-[#83868B]"
                  ),
                }}
              />
            </div>
          </div>
        </div>
        <div className="notif-text max-w-[220px]">
          <p
            className={twMerge(
              "w-full text-black text-[13px] font-[700] leading-[18.2px]",
              readed && "text-[#585A5D]"
            )}
          >
            {data?.data?.message ?? ""}
          </p>
        </div>
      </div>
      <div className="noti-data">
        <span className="text-[#83868B] text-[12px] font-[500] leading-[15.6px]">
          {humanReadableTime ?? ""}
        </span>
      </div>
    </div>
  );
};

export default NotificationsCard;
