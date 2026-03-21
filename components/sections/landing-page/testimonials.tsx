"use client";

import React from "react";
// @ts-ignore
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import TestimonialsCard from "@/components/cards/TestimonialsCard";

const Testimonials = () => {
  const t = (text: any) => {
    return text;
  };
  return (
    <section
      id="testimonials"
      className="mx-auto h-auto w-full min-w-0 max-w-full bg-primary-100 px-[20px] py-[50px] md:p-[100px]"
      dir="ltr"
    >
      <div className="max-w-[1440px] w-full mx-auto">
        <div className="wrapper w-full flex flex-col md:gap-y-[64px] gap-y-[38px]">
          <div className="w-full text-center flex flex-col gap-y-[20px]">
            <p className="text-center text-primary-600 text-[18px] font-[700] leading-[22.32px]">
              {"1 million happy parents"}
            </p>
            <h1 className="section-title">{t("Don’t just take our words")}</h1>
          </div>
          <div className="slider w-full md:px-[32px] px-0">
            <Splide
              tag="section"
              options={{
                type: "loop",
                gap: "24px",
                perPage: 3,
                perMove: 1,
                autoplay: true,
                interval: 3500,
                speed: 800,
                pauseOnHover: true,
                pauseOnFocus: true,
                arrows: true,
                pagination: true,
                easing: "ease",
                breakpoints: {
                  1440: {
                    perPage: 3,
                  },
                  1080: {
                    perPage: 2,
                  },
                  640: {
                    perPage: 1,
                  },
                },
              }}
              hasTrack={false}
              aria-label=""
            >
              <SplideTrack className="w-full">
                <SplideSlide>
                  <TestimonialsCard />
                </SplideSlide>
                <SplideSlide>
                  <TestimonialsCard />
                </SplideSlide>
                <SplideSlide>
                  <TestimonialsCard />
                </SplideSlide>
                <SplideSlide>
                  <TestimonialsCard />
                </SplideSlide>
              </SplideTrack>
              <div className="splide__arrows">
                <button className="splide__arrow splide__arrow--prev splide__arrow_custom ml-[-32px]">
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
                <button className="splide__arrow splide__arrow--next splide__arrow_custom mr-[-32px]">
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
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
