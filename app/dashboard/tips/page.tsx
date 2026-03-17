"use client";

import { TipsCard } from "@/components/cards/tips/tip-card";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import TipsCardSkeleton from "@/components/skeletons/tip-card";
import { useTipsQuery } from "@/redux/endpoints/tips";
import React from "react";

const Tips = () => {
  const { data, isLoading, isFetching } = useTipsQuery({});

  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/tips", title: "Tips" },
      ]}
    >
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-[24px]">
        {isLoading || isFetching
          ? [1, 2, 3, 4].map((item: any, index: number) => (
              <TipsCardSkeleton key={index} />
            ))
          : data?.generalTips?.map((item: any) => (
              <TipsCard
                key={item.id}
                tip={item.tip}
                id={item?.id}
                liked={item?.favorite}
              />
            ))}
      </div>
    </PagesLayout>
  );
};

export default Tips;
