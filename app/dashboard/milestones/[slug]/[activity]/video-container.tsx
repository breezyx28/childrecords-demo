"use client";

import { PlayVideo } from "@/components/icons";
import LogoIcon from "@/components/logos/logo-icon";
import { PhotoPath } from "@/redux/ApiConfig";
import { useIncrementVideoViewsMutation } from "@/redux/endpoints/milestones";

import React, { useState } from "react";

const ActivityVideoContainer = ({ data }: { data: any }) => {
  const [increaseView, { data: viewsData, isLoading }] =
    useIncrementVideoViewsMutation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState("");

  const handlePlay = () => {
    if (data?.video || data?.youtube_link) {
      setIsPlaying(true);
      setError("");
      increaseView({
        activity_id: data?.id,
      });
    } else {
      setError("No available video.");
    }
  };

  return (
    <div className="video-container relative">
      <div className="video-wrapper w-full relative">
        {!isPlaying ? (
          <>
            <img 
              src={
                data?.photo
                  ? PhotoPath(data?.photo)
                  : "/assets/pages/no-image.jpg"
              }
              alt="video-cover"
              width={1000}
              height={1000}
              className="max-h-[400px] h-[400px] object-cover md:rounded-[24px] rounded-[16px]"
            />
            {data?.note ? (
              <div
                className="absolute md:top-[16px] top-[8px] md:left-[16px] left-[8px] rounded-[56px] bg-[#FFFFFFCC] px-[12px] py-[8px]"
                style={{
                  backdropFilter: "blur(20px)",
                }}
              >
                <span className="text-black md:text-[14px] text-[12px] font-[700] md:leading-[18.2px] leading-[15.6px]">
                  {data?.note}
                </span>
              </div>
            ) : (
              ""
            )}
            <div className="play-button absolute-center" onClick={handlePlay}>
              <div className="rounded-full bg-primary-600 px-[18px] py-[16px] cursor-pointer">
                <PlayVideo className="text-white" />
              </div>
            </div>
            {error && (
              <div className="absolute bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded">
                {error}
              </div>
            )}
          </>
        ) : (
          <div className="relative">
            <video
              src={data?.video ? PhotoPath(data?.video) : data?.youtube_link}
              controls
              autoPlay
              className="max-h-[400px] h-[400px] object-cover md:rounded-[24px] rounded-[16px] w-full"
            />
            <div className="absolute top-4 right-4 bg-opacity-50 text-white px-2 py-1 rounded">
              <LogoIcon className="!w-[40px]" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityVideoContainer;
