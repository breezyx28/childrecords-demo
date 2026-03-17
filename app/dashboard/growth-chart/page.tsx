import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import { GrowthChart } from "@/components/sections/dashboard/growth-chart";
import React from "react";
import GrowthLogs from "./growth-logs";

const page = () => {
  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/growth-chart", title: "Growth Chart" },
      ]}
    >
      <div className="w-full">
        <div className="growth-chart-container flex flex-col gap-y-[48px] divide divide-y">
          <div className="w-full">
            <GrowthChart />
          </div>
          <div className="w-full pt-[48px]">
            <GrowthLogs />
          </div>
        </div>
      </div>
    </PagesLayout>
  );
};

export default page;
