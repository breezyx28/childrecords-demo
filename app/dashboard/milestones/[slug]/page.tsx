"use client";

import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import React from "react";
import { useParams } from "react-router-dom";
import { slugToString } from "@/helper/slug-to-string";
import { Child } from "@/components/icons";
import { generateSlug } from "@/helper/string-to-slug";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "./About";
import Activities from "./Activities";
import {
  useGetMilestoneActivitiesQuery,
  useGetMilestoneQuery,
} from "@/redux/endpoints/milestones";
import MilestonesActivitySkeleton from "@/components/skeletons/milestones-activity";
import MilestoneChecker from "@/components/sections/dashboard/milestones/milestone-checker";
import { PhotoPath } from "@/redux/ApiConfig";

const Page = () => {
  const params = useParams();
  const { slug } = params;

  const {
    data: milestoneData,
    isLoading,
    isFetching,
  } = useGetMilestoneQuery({
    milestone_id: slug,
  });

  const { data: milestoneActivityData } = useGetMilestoneActivitiesQuery({
    milestone_id: slug,
  });

  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/milestones", title: "Milestones" },
        {
          href: `/dashboard/milestones/${slug}`,
          title: milestoneData?.name ?? milestoneData?.title ?? slugToString(slug as string),
        },
      ]}
    >
      {isFetching || isLoading ? (
        <MilestonesActivitySkeleton />
      ) : (
        <div className="w-full">
          <div className="wrapper w-full flex flex-col gap-y-[32px] mt-[25px]">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-[4px]">
                <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
                  {milestoneData?.name ?? milestoneData?.title}
                </h5>
                <span className="flex gap-x-[7px] items-center">
                  {(milestoneData?.icon ?? milestoneData?.category?.icon) ? (
                    <img
                      src={PhotoPath(milestoneData?.category?.icon ?? milestoneData?.icon ?? "")}
                      width={24}
                      height={24}
                      alt=""
                    />
                  ) : (
                    <Child className="w-[24px] text-primary-600" />
                  )}

                  <span className="text-[#83868B] md:text-[14px] text-[12px] font-[700] md:leading-[18.2px] leading-[15.6px]">
                    {typeof milestoneData?.category === "object" ? milestoneData?.category?.name : milestoneData?.category ?? "----"}
                  </span>
                </span>
              </div>
              <div className="select-input">
                <MilestoneChecker
                  milestoneId={slug as any}
                  name={milestoneData?.name ?? milestoneData?.title ?? ""}
                  checked={milestoneData?.is_completed ?? milestoneData?.completed}
                />
              </div>
            </div>
            <div className="w-full">
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    className="md:text-[0.875rem] text-[12px]"
                    value="about"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    className="md:text-[0.875rem] text-[12px]"
                    value="activities"
                  >
                    Activities
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <About data={milestoneData} />
                </TabsContent>
                <TabsContent value="activities">
                  <Activities data={milestoneData?.activities ?? milestoneActivityData} milestoneSlug={slug} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      )}
    </PagesLayout>
  );
};

export default Page;
