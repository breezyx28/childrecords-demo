"use client";

import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import React, { useMemo } from "react";
import Button from "@/components/buttons/button";
import { ReminderCard } from "@/components/cards/reminders/reminder-card";
import ReminderToolbar from "./remider-toolbar";
import Loading from "@/app/loading";
import { useGetAllRemindersQuery } from "@/redux/endpoints/reminder";
import { useFuseSearch } from "@/hooks/useFuseSearch";
import Pagination from "@/components/paginations/pagination";
import NoReminder from "./no-reminder";
import AddReminderModal from "./reminder-modals/add-reminder-modal";
import { ReminderCardDisabled } from "@/components/cards/reminders/reminder-card-disabled";
import SwitchChild from "@/components/sections/dashboard/switch-child";

const RemindersPage = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDateFilter, setSelectedDateFilter] =
    React.useState<string>("all");

  const {
    data: allRemindersData,
    isLoading,
    refetch: refetchAllReminders,
  } = useGetAllRemindersQuery({});

  const reminderList = useMemo(() => {
    if (Array.isArray(allRemindersData)) return allRemindersData;
    if (allRemindersData && typeof allRemindersData === "object" && Array.isArray((allRemindersData as { upcoming?: unknown[] }).upcoming)) {
      return (allRemindersData as { upcoming: unknown[] }).upcoming;
    }
    return [];
  }, [allRemindersData]);

  const keys = ["title", "type", "repeat", "reminder_date"];
  const filteredReminders = useFuseSearch(
    reminderList,
    searchQuery,
    keys,
    selectedDateFilter
  );

  const dataLength = filteredReminders?.length ?? 0;
  const perPage = 5;

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = currentPage * perPage;
  const paginatedReminders = Array.isArray(filteredReminders) ? filteredReminders.slice(startIndex, endIndex) : [];

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Loading />
      </div>
    );

  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/reminders", title: "Reminders" },
      ]}
    >
      <div className="w-full">
        <div className="my-[1rem]">
          <SwitchChild />
        </div>
        <div className="w-full flex flex-col gap-y-[16px]">
          <div className="flex md:flex-row flex-col items-center justify-between">
            <div className="w-full items-center flex justify-between">
              <h5 className="flex-1 md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
                Reminders
              </h5>
              <Button
                text="Add"
                className="md:hidden block !py-[12px] !px-[40px]"
                buttonAttributes={{
                  onClick: () =>
                    document.getElementById("add-reminder")?.click(),
                }}
              />
            </div>
            <ReminderToolbar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedDateFilter={selectedDateFilter}
              setSelectedDateFilter={setSelectedDateFilter}
            />
          </div>
          <div className="flex flex-col gap-y-[40px]">
            <div className="h-[400px]">
              <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[12px]">
                {paginatedReminders?.length > 0 ? (
                  paginatedReminders.map((item: any, index: number) => {
                    const date = item?.reminder_date ?? item?.date;
                    const todayStr = new Date().toISOString().slice(0, 10);
                    const isToday = item?.today === true || date === todayStr;
                    const cardProps = {
                      key: item?.id ?? index,
                      id: item?.id,
                      subject: item?.type ?? item?.description,
                      title: item?.title,
                      date,
                      refetchAllReminders,
                    };
                    return isToday ? (
                      <ReminderCard {...cardProps} />
                    ) : (
                      <ReminderCardDisabled {...cardProps} />
                    );
                  })
                ) : (
                  <NoReminder />
                )}
              </div>
            </div>
            <div className="flex justify-center">
              {dataLength > 0 ? (
                <Pagination
                  currentPage={currentPage}
                  totalItems={dataLength}
                  perPage={perPage}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <AddReminderModal refetchAllReminders={refetchAllReminders} />
        </div>
      </div>
    </PagesLayout>
  );
};

export default RemindersPage;
