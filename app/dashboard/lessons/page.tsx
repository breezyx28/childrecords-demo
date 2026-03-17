"use client";

import { LearnCard } from "@/components/cards/learn/learn.card";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";
import { LearnCardSkeleton } from "@/components/skeletons/learn-card";
import { useGetlessonsQuery } from "@/redux/endpoints/lessons";
import React from "react";

const Lessons = () => {
  const { data, isLoading, isFetching } = useGetlessonsQuery({});

  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/lessons", title: "Lessons" },
      ]}
    >
      <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-[24px]">
        {isLoading || isFetching
          ? [1, 2, 3, 4].map((item: any, index: number) => (
              <LearnCardSkeleton key={index} />
            ))
          : data.map((item: any) => (
              <LearnCard
                key={item.id}
                id={item.id}
                img={item.photo}
                title={item.name}
                topic={item.body}
              />
            ))}
      </div>
    </PagesLayout>
  );
};

export default Lessons;
