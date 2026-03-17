"use client";

import React, { useState } from "react";
import Logo from "../logos/logo";
import { Link } from "react-router-dom";
import {
  Bell,
  Home,
  Chart,
  Milestone,
  Records,
  Reminder,
  Learn,
  Close,
} from "../icons";
import { Menu } from "lucide-react";
import DashFooter from "../footers/dash-footer";
import DashFooterMobile from "../footers/dash-foote-mobile";
import { NotificationsMenu } from "../menus/notifications-menu";
import { ProfileMenu } from "../menus/profile-menu";
import { useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const MobileNav = () => {
  const pathname = useLocation().pathname;

  const isActive = (href: string) => pathname == href;

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => setIsOpen(!isOpen);

  return (
    <nav className="relative bg-[#FBFCFD] border-b border-[#E2E6ED]">
      {/* Closed State */}
      {!isOpen && (
        <div className="flex items-center justify-between px-4 py-3">
          <Link to="/dashboard">
            <Logo className="w-[90px]" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="dash-nav-account flex items-center">
              <div className="dash-notification-icon flex items-center">
                <NotificationsMenu />
              </div>
              <ProfileMenu />
            </div>
            <button onClick={toggleNav} className="p-2" aria-label="Menu">
              <Menu size={24} className="text-gray-600" />
              {/* <span className="w-6 h-6 block bg-gray-600" /> */}
            </button>
          </div>
        </div>
      )}

      {/* Opened State */}

      <div
        className={twMerge(
          "fixed bg-white top-0 right-[-100%] z-50 flex flex-col w-screen h-screen justify-between transition-all duration-300",
          isOpen && "!right-0"
        )}
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center px-4 py-3 border-b border-[#E2E6ED]">
            <Logo className="w-[90px]" />
            <button onClick={toggleNav} className="p-2" aria-label="Close Menu">
              <Close className="w-6 h-6 text-gray-600" />
              {/* <span className="w-6 h-6 block bg-red-600" /> */}
            </button>
          </div>
          <ul className="flex flex-col gap-8 px-6 py-4 text-lg text-[#83868B]">
            <li>
              <Link
                href="/dashboard/"
                className={twMerge(
                  "dash-nav-link flex items-center gap-3 text-[18px] font-[600] leading-[18.2px]",
                  isActive("/dashboard") ? "text-primary-600" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                <Home className="scale-[1.3]" />
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/growth-chart"
                className={twMerge(
                  "dash-nav-link flex items-center gap-3 text-[18px] font-[600] leading-[18.2px]",
                  isActive("/dashboard/growth-chart") ? "text-primary-600" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                <Chart className="scale-[1.3]" />
                Growth Chart
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/milestones"
                className={twMerge(
                  "dash-nav-link flex items-center gap-3 text-[18px] font-[600] leading-[18.2px]",
                  isActive("/dashboard/milestones") ? "text-primary-600" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                <Milestone className="scale-[1.3]" />
                Milestones
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/records"
                className={twMerge(
                  "dash-nav-link flex items-center gap-3 text-[18px] font-[600] leading-[18.2px]",
                  isActive("/dashboard/records") ? "text-primary-600" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                <Records className="scale-[1.3]" />
                Records
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/reminders"
                className={twMerge(
                  "dash-nav-link flex items-center gap-3 text-[18px] font-[600] leading-[18.2px]",
                  isActive("/dashboard/reminders") ? "text-primary-600" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                <Reminder className="scale-[1.3]" />
                Reminders
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/learn"
                className={twMerge(
                  "dash-nav-link flex items-center gap-3 text-[18px] font-[600] leading-[18.2px]",
                  isActive("/dashboard/learn") ? "text-primary-600" : ""
                )}
                onClick={() => setIsOpen(false)}
              >
                <Learn className="scale-[1.3]" />
                Learn
              </Link>
            </li>
          </ul>
        </div>
        <DashFooterMobile />
      </div>
    </nav>
  );
};

export default MobileNav;
