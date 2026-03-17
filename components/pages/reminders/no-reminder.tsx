import Button from "@/components/buttons/button";
import React from "react";

const NoReminder = () => {
  return (
    <div className="md:col-span-3 sm:col-span-2 col-span-1 w-full h-[250px] flex flex-col justify-center items-center gap-y-[1rem]">
      <h4 className="text-2xl font-[800] text-black">No Reminder Found</h4>
      <span className="text-gray-400 font-semibold text-md text-center w-full">
        You can create a new reminder by clicking the below button
      </span>

      <Button
        text="Add Reminder"
        className="md:block hidden md:py-[12px] md:px-[40px]"
        buttonAttributes={{
          onClick: () => document.getElementById("add-reminder")?.click(),
        }}
      />
    </div>
  );
};

export default NoReminder;
