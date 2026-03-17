"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabPlansSwitcher = () => {
  return (
    <Tabs defaultValue="monthly" className="w-full">
      <TabsList className="w-full h-full bg-transparent border-2 border-[#E9ECF1] rounded-full p-[5px] gap-[12px]">
        <TabsTrigger className="tab-input-boy tab-input-switch" value="monthly">
          <span className="ml-[8px] text-[#83868B] tab-input-icon">
            Monthly
          </span>
        </TabsTrigger>
        <TabsTrigger className="tab-input-girl tab-input-switch" value="yearly">
          <span className="ml-[8px] text-[#83868B] tab-input-icon">Yearly</span>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="monthly"></TabsContent>
      <TabsContent value="yearly"></TabsContent>
    </Tabs>
  );
};

export default TabPlansSwitcher;
