"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Activities from "./Activities";
import Tips from "./Tips";

const Favourites = () => {
  return (
    <div className="">
      <div className="w-full">
        <p className="text-black text-[14px] font-[700] leading-[18.2px] mb-[1rem]">
          Favourites
        </p>
        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-[16px]">
            <TabsTrigger className="text-[12px]" value="activities">
              Activities
            </TabsTrigger>
            <TabsTrigger className="text-[12px]" value="tips">
              Tips
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tips">
            <Tips />
          </TabsContent>
          <TabsContent value="activities">
            <Activities />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Favourites;
