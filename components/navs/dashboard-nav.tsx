"use client";

import React from "react";
import Logo from "../logos/logo";
import { useLocation, Link } from "react-router-dom";
import {
  Bell,
  Chart,
  Home,
  Learn,
  Milestone,
  Records,
  Reminder,
} from "../icons";
import "@/styles/dashboard/nav.css";
import { NotificationsMenu } from "../menus/notifications-menu";
import { ProfileMenu } from "../menus/profile-menu";
import MobileNav from "./dash-mobile-nav";

const DashboardNav = () => {
  const pathname = useLocation().pathname;

  const isActive = (href: string) => pathname == href;

  return (
    <>
      <div className="mobile-nav lg:hidden block">
        <MobileNav />
      </div>
      <div className="bg-[#FBFCFD] px-[100px] py-[10px] border-b border-[#E2E6ED] max-h-[60px] h-full lg:block hidden">
        <div className="wrapper w-full h-full flex justify-between items-center">
          <div className="nav-logo">
            {/* <LogoIcon className="w-[50px]" /> */}
            <Link to="/dashboard">
              <Logo className="w-[90px]" />
            </Link>
          </div>
          <div className="dash-nav-links">
            <ul className="dash-link-wrapper">
              <li className={`dash-nav-link ${isActive("/dashboard") ? "dash-nav-link-active" : ""}`}>
                <Link to="/dashboard" className="dash-nav-link-a flex items-center gap-x-[10px]">
                  <Home className="dash-nav-icon w-5 h-5 shrink-0" />
                  <span>Home</span>
                </Link>
              </li>
              <li className={`dash-nav-link ${isActive("/dashboard/growth-chart") ? "dash-nav-link-active" : ""}`}>
                <Link to="/dashboard/growth-chart" className="dash-nav-link-a flex items-center gap-x-[10px]">
                  <Chart className="dash-nav-icon w-5 h-5 shrink-0" />
                  <span>Growth Chart</span>
                </Link>
              </li>
              <li className={`dash-nav-link ${isActive("/dashboard/milestones") ? "dash-nav-link-active" : ""}`}>
                <Link to="/dashboard/milestones" className="dash-nav-link-a flex items-center gap-x-[10px]">
                  <Milestone className="dash-nav-icon w-5 h-5 shrink-0" />
                  <span>Milestones</span>
                </Link>
              </li>
              <li className={`dash-nav-link ${isActive("/dashboard/records") ? "dash-nav-link-active" : ""}`}>
                <Link to="/dashboard/records" className="dash-nav-link-a flex items-center gap-x-[10px]">
                  <Records className="dash-nav-icon w-5 h-5 shrink-0" />
                  <span>Records</span>
                </Link>
              </li>
              <li className={`dash-nav-link ${isActive("/dashboard/reminders") ? "dash-nav-link-active" : ""}`}>
                <Link to="/dashboard/reminders" className="dash-nav-link-a flex items-center gap-x-[10px]">
                  <Reminder className="dash-nav-icon w-5 h-5 shrink-0" />
                  <span>Reminders</span>
                </Link>
              </li>
              <li className={`dash-nav-link ${isActive("/dashboard/learn") ? "dash-nav-link-active" : ""}`}>
                <Link to="/dashboard/learn" className="dash-nav-link-a flex items-center gap-x-[10px]">
                  <Learn className="dash-nav-icon w-5 h-5 shrink-0" />
                  <span>Learn</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="dash-nav-account flex items-center gap-x-[20px]">
            <div className="dash-notification-icon flex items-center justify-center rounded-lg min-w-[44px] min-h-[44px]">
              <NotificationsMenu />
            </div>
            <div className="dash-profile-trigger rounded-lg min-h-[44px] flex items-center">
              <ProfileMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
