import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const TabSwitch = () => {
  return (
    <div>
      <Tabs defaultValue="weight" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="height">Height</TabsTrigger>
        </TabsList>
        <TabsContent value="weight">{/* <LinearChart /> */}</TabsContent>
        <TabsContent value="height">{/* <LinearChart /> */}</TabsContent>
      </Tabs>
    </div>
  );
};

export default TabSwitch;
