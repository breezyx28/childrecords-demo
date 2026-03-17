"use client";

import { NutritionCard } from "@/components/cards/nutritions/nutrition-card";
import { NutritionCardSkeleton } from "@/components/skeletons/nutrition-card";
import Slider from "@/components/slider";
import { useTipsQuery } from "@/redux/endpoints/tips";
import { Link } from "react-router-dom";
import React from "react";

const UsefulNutrition = () => {
  const { data: nutrition, isLoading, isFetching } = useTipsQuery(undefined);

  return (
    <div className="w-full flex flex-col gap-y-[12px] mt-[32px]">
      <div className="flex items-center w-full justify-between">
        <h4 className="text-black md:text-[28px] text-[20px] font-[800] md:leading-[38.19px] leading-[27.28px]">
          Useful Nutrition
        </h4>
        {/* <Link
          href={"#"}
          className="underline text-primary-600 text-[16px] font-[700] leading-[19.84px]"
        >
          View all
        </Link> */}
      </div>
      <div className="slider-container w-full">
        {nutrition?.nutritionalTips?.length === 0 ? (
          "No nutritional tips found"
        ) : (
          <Slider
            sliderContainerClass="flex items-center"
            data={
              isLoading || isFetching
                ? [1, 2, 3, 4].map((item: any, index: number) => (
                    <NutritionCardSkeleton key={index} />
                  ))
                : nutrition?.nutritionalTips?.map((item: any) => (
                    <NutritionCard key={item.id} tip={item.tip} />
                  )) ?? []
            }
            sliderOptions={{
              // autoplay: true, // Enable auto-slide
              // interval: 1000, // Set the interval between slides (in milliseconds)
              // pauseOnHover: true,
              gap: "12px",
              breakpoints: null,
              perPage: 2,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UsefulNutrition;
