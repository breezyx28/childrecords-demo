"use client";

import { TipsCard } from "@/components/cards/tips/tip-card";
import Slider from "@/components/slider";
import { useTipsQuery } from "@/redux/endpoints/tips";
import { Link } from "react-router-dom";
import React from "react";
import { twMerge } from "tailwind-merge";

const UsefulTips = () => {
  const [tipsData, setTipsData] = React.useState<React.ReactNode[]>([]);
  const { data: tips, isLoading, isFetching } = useTipsQuery(undefined);

  React.useEffect(() => {
    if (tips?.generalTips && Array.isArray(tips.generalTips)) {
      const mappedTips: React.ReactNode[] = tips.generalTips.map(
        (item: any) => (
          <TipsCard
            id={item.id}
            key={item.id}
            tip={item.tip}
            liked={item?.favorite}
          />
        )
      );
      setTipsData(mappedTips);
    }
  }, [tips]);

  return (
    <div
      className={twMerge(
        "w-full flex-col gap-y-[12px] mt-[32px]",
        tips?.generalTips?.length > 0 || isLoading || isFetching
          ? "flex"
          : "hidden"
      )}
    >
      <div className="flex items-center w-full justify-between">
        <h4 className="text-black md:text-[28px] text-[20px] font-[800] md:leading-[38.19px] leading-[27.28px]">
          Useful Tips
        </h4>
        <Link
          to="/dashboard/tips"
          className="underline text-primary-600 text-[16px] font-[700] leading-[19.84px]"
        >
          View all
        </Link>
      </div>
      <div className="slider-container w-full">
        {tipsData.length > 0 && (
          <Slider
            sliderContainerClass="flex items-center"
            data={tipsData}
            sliderOptions={{
              gap: "12px",
              perPage: tipsData?.length < 3 ? tipsData?.length : 3,
              breakpoints: {
                1440: {
                  perPage: tipsData?.length < 3 ? tipsData?.length : 3,
                },
                1080: {
                  perPage: tipsData?.length > 2 ? 2 : tipsData?.length,
                },
                640: {
                  perPage: tipsData?.length > 2 ? 2 : tipsData?.length,
                  // perMove: 1,
                },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsefulTips;
