"use client";

import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Folder } from "lucide-react";
import Files from "./files";
import Folders from "./folders";

const Records = () => {
  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/records", title: "Records" },
      ]}
    >
      <style>{`
        .records-tab-trigger[data-state="active"] {
          border: 2px solid;
          border-image-source: linear-gradient(180deg, rgba(171, 179, 255, 0.5) 0%, rgba(183, 190, 255, 0.12) 100%);
          border-image-slice: 1;
          box-shadow: 0px -2px 4px 0px #0011ADA6 inset;
        }
      `}</style>
      <div className="w-full">
        <Tabs defaultValue="files" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="files"
              className="records-tab-trigger md:w-auto text-[12px] data-[state=active]:bg-primary-600 data-[state=active]:text-white flex items-center gap-x-2"
            >
              <FileText className="w-4 h-4 shrink-0" />
              Files
            </TabsTrigger>
            <TabsTrigger
              value="folders"
              className="records-tab-trigger md:w-auto text-[12px] data-[state=active]:bg-primary-600 data-[state=active]:text-white flex items-center gap-x-2"
            >
              <Folder className="w-4 h-4 shrink-0" />
              Folders
            </TabsTrigger>
          </TabsList>
          <TabsContent value="files">
            <Files />
          </TabsContent>
          <TabsContent value="folders">
            <Folders />
          </TabsContent>
        </Tabs>
      </div>
    </PagesLayout>
  );
};

export default Records;
