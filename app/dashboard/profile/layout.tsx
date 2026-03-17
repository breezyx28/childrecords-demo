"use client";

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ProfileNav from "@/components/navs/profile-nav";
import isAuth from "@/helper/isAuth";

const Profilelayout = () => {
  const location = useLocation();

  return (
    <div className="profile-wrapper flex gap-x-[8px] h-full">
      <div className="md:block hidden max-w-[200px] w-full rounded-[16px] h-full bg-white p-[12px]">
        <ProfileNav />
      </div>
      <div className="w-full h-full md:rounded-[16px] rounded-[0px] bg-white overflow-hidden">
        <div className="md:p-[24px] h-full">
          <motion.div
            key={location.pathname}
            className="w-full min-h-full"
            initial={{ opacity: 0, y: 6 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
            }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default isAuth(Profilelayout);
