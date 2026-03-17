"use client";

import GrowthChartLogModalButton from "@/components/buttons/growth-chart-log-button";
import GrowthCard from "@/components/cards/growth-card";
import GrowthChartLogSkeleton from "@/components/skeletons/growth-chart-log";
import { TooltipComponent } from "@/components/tooltip";
import { useGetLogsQuery } from "@/redux/endpoints/growth-chart";
import React, { useMemo } from "react";

// API may return array, { measurements: [] }, or a single log object; normalize to array
function asLogsList(data: unknown): any[] {
  if (Array.isArray(data)) return data;
  if (data && typeof data === "object" && "measurements" in data && Array.isArray((data as { measurements: any[] }).measurements)) {
    return (data as { measurements: any[] }).measurements;
  }
  if (data && typeof data === "object" && Array.isArray((data as any).logs)) {
    return (data as any).logs;
  }
  // Single log object (e.g. GET chart/log returning one entry)
  if (data && typeof data === "object" && "id" in data) {
    return [data as any];
  }
  return [];
}

const GrowthLogs = () => {
  const { data: logsData, isLoading, isFetching } = useGetLogsQuery({});
  const logs = useMemo(() => asLogsList(logsData), [logsData]);
  const firstLog = logs[0];
  const allowedToLog = firstLog?.allow_log ?? true;
  const nextLogDate = firstLog?.next_log_date ?? "next month";

  return (
    <div className="wrapper flex flex-col">
      <div className="flex justify-between items-center gap-x-[22px]">
        <h5 className="text-black md:text-[24px] text-[16px] font-[800] md:leading-[32.74px] leading-[21.82px]">
          Weight & Height Log
        </h5>
        {allowedToLog && !isFetching && !isLoading ? (
          <GrowthChartLogModalButton
            text="Log new Weight & Height"
            className="!py-[12px] !px-[16px] !text-[12px] text-center cursor-pointer"
          />
        ) : (
          <TooltipComponent
            content={`You will be able to log your data on ${nextLogDate}.`}
          >
            <GrowthChartLogModalButton
              disableStyle={true}
              text="Log new Weight & Height"
              buttonAttributes={{
                onClick: () => {},
              }}
              className="!py-[12px] !px-[16px] !text-[12px] text-center cursor-pointer !transition-none hover:!scale-[none] !opacity-50 hover:!bg-primary-600 hover:!shadow-none"
            />
          </TooltipComponent>
        )}
      </div>
      <div className="grid grid-rows-1">
        {isLoading
          ? [1, 2, 3].map((item, index) => (
              <GrowthChartLogSkeleton key={index} />
            ))
          : logs.map((item: any, index: number) => (
              <GrowthCard key={item?.id ?? index} log={item} />
            ))}
      </div>
    </div>
  );
};

export default GrowthLogs;
