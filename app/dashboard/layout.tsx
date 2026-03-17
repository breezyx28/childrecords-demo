"use client";

import DashFooter from "@/components/footers/dash-footer";
import DashboardNav from "@/components/navs/dashboard-nav";
import isAuth from "@/helper/isAuth";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import SubscriptionAlert from "@/components/alerts/SubscriptionAlert";

const DashboardLayout = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Regular expression to check if the path contains '/dashboard/profile'
  const isProfilePage = /^\/dashboard\/profile(\/|$)/.test(pathname); // to detect the profile page
  const isUpgradePage = /^\/dashboard\/upgrade(\/|$)/.test(pathname); // to detect the upgrade page
  const isSubscribePage = /^\/dashboard\/subscribe(\/|$)/.test(pathname); // to detect the subscribe page

  return (
    <div className="w-screen min-h-[calc(100dvh-88px)]">
      <div
        className={twMerge(
          "wrapper flex flex-col h-full",
          isProfilePage && "md:bg-[#F8F9FA] bg-white",
          isUpgradePage && "bg-primary-100",
          isSubscribePage && "bg-primary-100"
        )}
      >
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
          <div
            className={twMerge(
              "dash-container",
              isUpgradePage || isSubscribePage ? "max-w-full" : ""
            )}
          >
            <Outlet />
          </div>
        </div>
        <DashFooter />
      </div>
      {/* <SubscriptionAlert />  */}
      {/* Render the SubscriptionAlert component */}
    </div>
  );
};

export default isAuth(DashboardLayout);
