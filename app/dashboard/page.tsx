import DailyProgram from "@/components/sections/dashboard/daily-program";
import RemindersSlider from "@/components/sections/dashboard/reminders-slider";
import SwitchChild from "@/components/sections/dashboard/switch-child";
import UsefulLessons from "@/components/sections/dashboard/useful-lessons";
import UsefulNutrition from "@/components/sections/dashboard/useful-nutrition";
import UsefulTips from "@/components/sections/dashboard/useful-tips";
import React from "react";

const page = () => {
  return (
    <div className="w-full">
      <SwitchChild />
      <RemindersSlider />
      <DailyProgram />
      <UsefulTips />
      <UsefulLessons />
      <UsefulNutrition />
    </div>
  );
};

export default page;
