import HeightLinearChart from "@/components/charts/linear/height-linear-chart";
import WeightLinearChart from "@/components/charts/linear/weight-linear-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SwitchChild from "./switch-child";
import React from "react";

export function GrowthChart() {
  return (
    <Tabs defaultValue="weight" className="w-full">
      <div className="my-[1rem]">
        <SwitchChild />
      </div>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="weight">Weight</TabsTrigger>
        <TabsTrigger value="height">Height</TabsTrigger>
      </TabsList>
      <TabsContent value="weight">
        <WeightLinearChart />
      </TabsContent>
      <TabsContent value="height">
        <HeightLinearChart />
      </TabsContent>
    </Tabs>
  );
}
