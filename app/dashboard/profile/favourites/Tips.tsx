"use client";

import { TipsCard } from "@/components/cards/tips/tip-card";
import TipsCardSkeleton from "@/components/skeletons/tip-card";
import { useGetFavTipsQuery } from "@/redux/endpoints/account";
import React from "react";
import NoTips from "./no-tips";

const Tips = () => {
  const { data: favTips, isLoading, isFetching } = useGetFavTipsQuery({});

  return (
    <div className="w-full mt-[20px]">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px]">
        {isLoading || isFetching ? (
          [1, 2, 3, 4]?.map((item: any, index: number) => (
            <TipsCardSkeleton key={index} />
          ))
        ) : favTips?.length > 0 ? (
          favTips?.map((item: any, index: number) => (
            <TipsCard
              id={item?.id}
              key={index}
              liked={item?.favorite}
              tip={item?.tip}
            />
          ))
        ) : (
          <NoTips />
        )}
      </div>
    </div>
  );
};

export default Tips;
