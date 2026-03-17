"use client";

import LearnSlider from "@/components/cards/learn/learn-slider";
import { LearnCard } from "@/components/cards/learn/learn.card";
import { LearnCardSkeleton } from "@/components/skeletons/learn-card";
import { useGetlessonsQuery } from "@/redux/endpoints/lessons";
import { Link } from "react-router-dom";
import React from "react";

const UsefulLessons = () => {
  const { data, isLoading, isFetching } = useGetlessonsQuery({});

  return (
    <div className="w-full flex flex-col gap-y-[12px] mt-[32px]">
      <div className="flex items-center w-full justify-between">
        <h4 className="text-black md:text-[28px] text-[20px] font-[800] md:leading-[38.19px] leading-[27.28px]">
          Useful Lessons
        </h4>
        <Link
          to="/dashboard/lessons"
          className="underline text-primary-600 text-[16px] font-[700] leading-[19.84px]"
        >
          View all
        </Link>
      </div>
      {data?.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-black text-[16px] font-[700] leading-[19.84px]">
            No lessons found
          </p>
        </div>
      ) : (
        <LearnSlider
          learnCards={
            isLoading || isFetching
              ? [1, 2, 3, 4].map((item: any, index: number) => (
                  <LearnCardSkeleton key={index} />
                ))
              : data?.map((item: any) => (
                  <LearnCard
                    key={item.id}
                    id={item.id}
                    img={item.photo}
                    title={item.name}
                    topic={item.body}
                  />
                ))
          }
        />
      )}
    </div>
  );
};

// const LessonsCardsData: React.ReactNode[] = [
//   <LearnCard
//     key={1}
//     id={1}
//     title={"Helping baby to Crawl"}
//     topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ"
//   />,
//   <LearnCard
//     key={2}
//     id={2}
//     title={"Helping baby to Crawl"}
//     topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ"
//   />,
//   <LearnCard
//     key={3}
//     id={3}
//     title={"Helping baby to Crawl"}
//     topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ"
//   />,
// ];

export default UsefulLessons;
