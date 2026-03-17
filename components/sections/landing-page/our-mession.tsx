"use client";

import { motion } from "framer-motion";
import React from "react";

const OurMession = () => {
  let motionPropsH1 = {
    initial: { opacity: 0, x: "-100px" },
    whileInView: { opacity: 1, x: 0 },
    transition: {
      type: "tween",
      duration: 0.5,
    },
    viewport: { once: true },
  };
  let motionPropsH6 = {
    initial: { opacity: 0, x: "100px" },
    whileInView: { opacity: 1, x: 0 },
    transition: {
      type: "tween",
      delay: 0.4,
      duration: 0.5,
    },
    viewport: { once: true },
  };

  return (
    <section
      id="our-mession"
      className="w-full mx-auto h-auto py-[40px] md:py-[0px] overflow-hidden"
    >
      <div className="wrapper md:h-[250px] h-[240px] flex flex-col justify-center">
        <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-x-[24px] md:gap-y-[24px] gap-y-[16px]">
          <motion.h1
            {...motionPropsH1}
            className="section-title md:min-w-[397px] min-w-[200px]"
          >
            {/* <h1 className="font-extrabold text-[48px] leading-[65.47px] min-w-[397px]"> */}
            Our mission
          </motion.h1>
          <motion.h6
            className="text-[#585A5D] leading-[24.8px] font-medium"
            {...motionPropsH6}
          >
            We’re passionate about children’s health and well-being. Our journey
            began with a simple goal to create a seamless platform where parents
            can manage their children’s healthcare records effortlessly. We
            understand challenges parents face, and we’re here to make their
            lives easier.
          </motion.h6>
        </div>
      </div>
    </section>
  );
};

export default OurMession;
