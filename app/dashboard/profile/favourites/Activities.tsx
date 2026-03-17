"use client";

import { LearnCard } from "@/components/cards/learn/learn.card";
import { LearnCardSkeleton } from "@/components/skeletons/learn-card";
import { useGetFavArticlesQuery } from "@/redux/endpoints/account";
import React from "react";
import NoArticles from "./no-articles";

const Activities = () => {
  const {
    data: favArticles,
    isLoading,
    isFetching,
  } = useGetFavArticlesQuery(undefined);

  return (
    <div className="w-full">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px]">
        {isLoading || isFetching ? (
          [1, 2, 3, 4]?.map((item: any, index: number) => (
            <LearnCardSkeleton key={index} />
          ))
        ) : favArticles?.length > 0 ? (
          favArticles?.map((item: any, index: number) => (
            <LearnCard
              key={index}
              liked
              id={1}
              title="Helping baby to Crawl"
              href={`#`}
              topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ...Read more"
            />
          ))
        ) : (
          <NoArticles />
        )}
      </div>
    </div>
  );
};

export default Activities;
