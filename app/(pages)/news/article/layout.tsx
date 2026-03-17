"use client";

import DashFooter from "@/components/footers/dash-footer";
import DashboardNav from "@/components/navs/dashboard-nav";
import isAuth from "@/helper/isAuth";
import React from "react";
import { twMerge } from "tailwind-merge";
import NextTopLoader from "nextjs-toploader";
import SubscriptionAlert from "@/components/alerts/SubscriptionAlert";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen min-h-screen">
      <NextTopLoader showSpinner={false} color="#394CFF" />
      <div className={twMerge("wrapper flex flex-col h-full")}>
        <div className="">
          <div className="fixed w-full z-[999]">
            <DashboardNav />
          </div>
          <div className="pb-[60px]"></div>
        </div>
        <div
          className={
            "w-full min-h-screen md:my-[56px] my-[26px] flex justify-center"
          }
        >
          <div className={twMerge("dash-container")}>{children}</div>
        </div>
        <DashFooter />
      </div>
      <SubscriptionAlert /> {/* Render the SubscriptionAlert component */}
    </div>
  );
};

export default isAuth(DashboardLayout);
