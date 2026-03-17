"use client";

import { Child, Pickup, PlayVideo } from "@/components/icons";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import React, { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "./About";
import ArticlesTips from "./ArticlesTips";
import UsefulProducts from "@/components/sections/dashboard/useful-products";
import { useGetActivityQuery } from "@/redux/endpoints/milestones";
import { useParams } from "react-router-dom";
import { PhotoPath } from "@/redux/ApiConfig";
import RateActivity from "./rate-activity";
import ServerIcon from "@/components/icons/server-icons";
import ActivityVideoContainer from "./video-container";
import { formatNumber } from "@/helper/format-number";

const Milestones = () => {
  const params = useParams();
  const { activity } = params;

  const { data } = useGetActivityQuery({
    activity_id: activity,
  });

  const cachedActivity = useMemo(() => data?.data, [data]);

  console.log("cachedActivity: ", cachedActivity);

  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/milestones", title: "Milestones" },
        {
          href: `/dashboard/milestones/${activity}`,
          title: cachedActivity?.name,
        },
      ]}
    >
      <div className="w-full flex flex-col gap-y-[24px]">
        <div className="w-full flex flex-col">
          {/* Video container */}
          <ActivityVideoContainer data={cachedActivity} />
          <div className="video-title mt-[24px]">
            <h4 className="text-black md:text-[28px] text-[18px] font-[800] md:leading-[38.19px] leading-[24.55px]">
              {cachedActivity?.name ?? ""}
            </h4>
            <div className="flex items-center text-[#83868B] md:text-[14px] text-[12px] font-[700] md:leading-[18.2px] leading-[15.6px]">
              <ServerIcon src={cachedActivity?.category?.icon} />
              <span className="ml-[5px]">{cachedActivity?.name}</span>
              <span className="mx-[8px] rounded-full bg-[#83868B] w-[4px] h-[4px]"></span>
              <span className="">
                {formatNumber(cachedActivity?.views ?? 0)}{" "}
                {cachedActivity?.views > 1 ? "views" : "view"}
              </span>
            </div>
          </div>
          <div className="video-rate mt-[16px]">
            <div className="wrapper w-full flex md:flex-row flex-col md:items-center items-start md:gap-x-[24px] gap-y-[12px] py-[16px] md:px-[24px] px-[16px] border md:rounded-[24px] rounded-[16px]">
              <div className="rate-notice w-[250px] flex flex-col gap-y-[4px]">
                <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
                  Rate the Activity
                </h5>
                <p className="text-[#83868B] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
                  How was the activity in the video?
                </p>
              </div>
              <RateActivity activityId={cachedActivity?.id} />
            </div>
          </div>
        </div>
        <div className="w-full">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger className="md:text-auto text-[12px]" value="about">
                About
              </TabsTrigger>
              <TabsTrigger
                className="md:text-auto text-[12px]"
                value="articles-tips"
              >
                Articles & Tips
              </TabsTrigger>
              <TabsTrigger className="md:text-auto text-[12px]" value="toys">
                Toys
              </TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <About data={data} />
            </TabsContent>
            <TabsContent value="articles-tips">
              <ArticlesTips data={cachedActivity} />
            </TabsContent>
            <TabsContent value="toys">
              <UsefulProducts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PagesLayout>
  );
};

export default Milestones;
