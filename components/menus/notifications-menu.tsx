"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell } from "../icons";
import NotificationsCard from "../cards/notification-card/notification-card";
import { useUnreadedNotificationsQuery } from "@/redux/endpoints/notifications";
import { NotificationItem } from "@/types/notifications";
import EmptyNotification from "../cards/notification-card/empty-notification";
import { twMerge } from "tailwind-merge";
import { useMemo } from "react";

export function NotificationsMenu() {
  const { data: notifications } = useUnreadedNotificationsQuery(
    {},
    {
      pollingInterval: 300000, // 5 minutes in milliseconds
    }
  );

  const cachedNotifications = useMemo(
    () => notifications?.notifications,
    [notifications]
  );

  const notifiacationslength = cachedNotifications?.length || 0;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="!outline-none">
        <Bell
          props={{
            className: "cursor-pointer",
          }}
          count={
            cachedNotifications?.filter(
              (item: NotificationItem) => !item?.data?.read
            ).length
          }
          hasNotification={notifications?.hasUnreadNotifications}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:w-[400px] w-[calc(100vw-100px)] max-h-[400px] h-full z-[99999] md:p-[16px] p-[8px] overflow-auto">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between">
            <span className="md:text-[18px] text-[14px] font-[800] leading-[24.55px]">
              Notifications
            </span>
            <span
              className={twMerge(
                "text-primary-600 text-[16px] font-[700] leading-[19.84px] underline",
                notifiacationslength < 1 ? "hidden" : "block"
              )}
            >
              Clear all
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup className="flex flex-col divide-y overflow-auto h-auto">
          {notifiacationslength > 0 ? (
            cachedNotifications?.map(
              (item: NotificationItem, index: number) =>
                item?.data?.read || (
                  <NotificationsCard key={index} data={item} />
                )
            )
          ) : (
            <EmptyNotification />
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
