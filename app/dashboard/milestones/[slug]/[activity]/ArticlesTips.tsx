import { LearnCard } from "@/components/cards/learn/learn.card";
import UsefulTips from "@/components/sections/dashboard/useful-tips";
import React from "react";

const ArticlesTips = ({ data }: { data: any }) => {
  return (
    <div className="flex flex-col gap-y-[45px] mt-[20px]">
      <div className="flex flex-col gap-y-[12px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Useful Lessons
        </h5>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-[12px]">
          <LearnCard
            id={1}
            href={"/dashboard/milestones/crawling/details"}
            title="Helping baby to Crawl"
            topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ..."
          />
          <LearnCard
            id={2}
            href={"/dashboard/milestones/crawling/details"}
            title="Helping baby to Crawl"
            topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ..."
          />
          <LearnCard
            id={3}
            href={"/dashboard/milestones/crawling/details"}
            title="Helping baby to Crawl"
            topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ..."
          />
          <LearnCard
            id={4}
            href={"/dashboard/milestones/crawling/details"}
            title="Helping baby to Crawl"
            topic="Most babies begin to crawl somewhere between six and 10 months of age. As with rolling over, there are several differ..."
          />
        </div>
      </div>
      <div className="usefult-tips">
        <UsefulTips />
      </div>
    </div>
  );
};

export default ArticlesTips;
