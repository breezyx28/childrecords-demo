"use client";

import { Child, Pickup, PlayVideo } from "@/components/icons";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import About from "./About";
import Activities from "./Activities";
import ArticlesTips from "./ArticlesTips";
import UsefulProducts from "@/components/sections/dashboard/useful-products";

const Milestones = () => {
  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/milestones", title: "Milestones" },
        { href: "/dashboard/milestones/crawling", title: "Crawling" },
      ]}
    >
      <div className="w-full flex flex-col gap-y-[24px]">
        <div className="w-full flex flex-col">
          <div className="video-container relative">
            <div className="video-wrapper w-full relative">
              <img 
                src="/assets/images/lessons/lesson-1.png"
                alt=""
                width={1000}
                height={1000}
                className="max-h-[400px] h-[400px] object-cover md:rounded-[24px] rounded-[16px]"
              />
              <div
                className="absolute md:top-[16px] top-[8px] md:left-[16px] left-[8px] rounded-[56px] bg-[#FFFFFFCC] px-[12px] py-[8px]"
                style={{
                  backdropFilter: "blur(20px)",
                }}
              >
                <span className="text-black md:text-[14px] text-[12px] font-[700] md:leading-[18.2px] leading-[15.6px]">
                  Repeat 4 - 8 times
                </span>
              </div>
              <div className="play-button absolute-center">
                <div className="rounded-full bg-primary-600 px-[18px] py-[16px]">
                  <PlayVideo className="text-white" />
                </div>
              </div>
            </div>
          </div>
          <div className="video-title mt-[24px]">
            <h4 className="text-black md:text-[28px] text-[18px] font-[800] md:leading-[38.19px] leading-[24.55px]">
              Crawling
            </h4>
            <div className="flex items-center text-[#83868B] md:text-[14px] text-[12px] font-[700] md:leading-[18.2px] leading-[15.6px]">
              <Child className="text-primary-600 md:w-auto w-[20px]" />
              <span className="ml-[5px]">Motor Development</span>
              <span className="mx-[8px] rounded-full bg-[#83868B] w-[4px] h-[4px]"></span>
              <span className="">400k views</span>
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
              <div className="rate-emojis flex-1 grid grid-cols-3 gap-[12px] justify-items-center h-full">
                {emojis?.map((emoji) => (
                  <div
                    key={emoji.id}
                    className="h-full w-full p-[8px] flex flex-col items-center gap-y-[8px] rounded-[12px] hover:bg-primary-100 cursor-pointer"
                  >
                    {emoji.icon}
                    <span className="text-center text-black md:text-[16px] text-[14px] font-[700] md:leading-[19.84px] leading-[18.2px]">
                      {emoji.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
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
              <About />
            </TabsContent>
            <TabsContent value="articles-tips">
              <ArticlesTips />
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

const emojis = [
  {
    id: 1,
    icon: (
      <img 
        src={"/assets/icons/emojis/perfect.svg"}
        width={41}
        height={40}
        alt="perfect"
        className=""
      />
    ),
    title: "Too Easy",
  },
  {
    id: 2,
    icon: (
      <img 
        src={"/assets/icons/emojis/ok.svg"}
        width={41}
        height={40}
        alt="ok"
        className=""
      />
    ),
    title: "Too Easy",
  },
  {
    id: 3,
    icon: (
      <img 
        src={"/assets/icons/emojis/wonder.svg"}
        width={41}
        height={40}
        alt="wonder"
        className=""
      />
    ),
    title: "Too Difficult",
  },
];

export default Milestones;
