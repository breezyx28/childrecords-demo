import React from "react";
// @ts-ignore
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { twMerge } from "tailwind-merge";
import "@splidejs/react-splide/css";

type SliderProps = {
  sliderContainerClass?: string;
  sliderOptions?: Record<any, any>;
  data: React.ReactNode[];
};

const Slider = ({ sliderContainerClass, sliderOptions, data }: SliderProps) => {
  return (
    <div className={twMerge("slider w-full", sliderContainerClass)}>
      <Splide
        className={"!w-full"}
        tag="section"
        options={{
          pagination: false,
          rewind: true,
          easing: "ease",
          gap: "20px",
          focus: 0,
          omitEnd: true,
          // type: "loop",
          // autoplay: true, // Enable auto-slide
          // interval: 1000, // Set the interval between slides (in milliseconds)
          // pauseOnHover: true, // Pause auto-slide on hover
          perPage: 3,
          perMove: 1,
          breakpoints: {
            1440: {
              perPage: 3,
            },
            1080: {
              perPage: 3,
            },
            640: {
              perPage: 1,
              perMove: 1,
            },
          },
          ...sliderOptions,
        }}
        hasTrack={false}
        aria-label=""
      >
        <SplideTrack className="">
          {data?.map((item, index) => (
            <SplideSlide key={index}>{item}</SplideSlide>
          ))}
        </SplideTrack>
        <div className="splide__arrows">
          <button className="splide__arrow splide__arrow--prev splide__arrow_custom ml-[-32px] md:!w-[40px] md:!h-[40px] !w-[30px] !h-[30px] !opacity-40 hover:!opacity-100 transition-all duration-200">
            <svg
              width={68}
              height={68}
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.586 6.344 12 4.93 19.071 12l-7.07 7.072-1.415-1.414L16.243 12l-5.657-5.657Z" />
            </svg>
          </button>

          <button className="splide__arrow splide__arrow--next splide__arrow_custom mr-[-32px] md:!w-[40px] md:!h-[40px] !w-[30px] !h-[30px] !opacity-40 hover:!opacity-100 transition-all duration-200">
            <svg
              width={4}
              height={8}
              className="text-black"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.586 6.344 12 4.93 19.071 12l-7.07 7.072-1.415-1.414L16.243 12l-5.657-5.657Z" />
            </svg>
          </button>
        </div>
      </Splide>
    </div>
  );
};

export default Slider;
