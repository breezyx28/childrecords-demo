import { ArrowUp, BabyCrawl, Heart } from "@/components/icons";
import PagesLayout from "@/components/layouts/dashboard/pages-layout";

import React from "react";

const Details = () => {
  return (
    <PagesLayout
      pages={[
        { href: "/dashboard", title: "Dashboard" },
        { href: "/dashboard/milestones", title: "Milestones" },
        { href: "/dashboard/milestones/crawling", title: "Crawling" },
        { href: "/dashboard/milestones/crawling/details", title: "Details" },
      ]}
    >
      <div className="w-full">
        <div className="wrapper flex flex-col gap-y-[24px]">
          <div className="article-cover max-h-[400px] h-[400px] w-full">
            <img 
              src={"/assets/images/lessons/lesson-1.png"}
              width={1000}
              height={1000}
              alt="article-cover"
              className="w-full rounded-[24px] max-h-[400px] h-full object-cover"
            />
          </div>
          <div className="article-titles flex md:flex-row flex-col gap-y-[12px] justify-between">
            <div className="flex flex-col gap-y-[4px]">
              <h5 className="text-black md:text-[28px] text-[18px] font-[800] md:leading-[38.19px] leading-[24.55px]">
                Helping baby to Crawl
              </h5>
              <div className="flex items-center text-[#83868B]">
                <div className="flex items-center gap-[5px]">
                  <BabyCrawl className="text-primary-600" />
                  <span className="text-[14px] font-[700] leading-[18.2px]">
                    Motor Development
                  </span>
                </div>
                <div className="text-[14px] font-[700] leading-[18.2px] flex items-center">
                  <span className="mx-[8px] rounded-full w-[4px] h-[4px] bg-[#83868B]"></span>
                  <span className="">400k views</span>
                  <span className="mx-[8px] rounded-full w-[4px] h-[4px] bg-[#83868B]"></span>
                  <span className="">4 min read</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between py-[13px] text-[#585A5D] text-[14px] font-[700] leading-[18.2px]">
              <div className="px-[24px] flex gap-x-[8px]">
                <Heart /> <span className="">Favorite</span>
              </div>
              <div className="h-[20px] w-[1px] bg-[#DBE0E8]"></div>
              <div className="px-[24px] flex gap-x-[8px]">
                <ArrowUp /> <span className="">Share</span>
              </div>
            </div>
          </div>
          <div className="article-details">
            <div className="flex flex-col gap-y-[12px] md:pt-[24px] pt-[20px]">
              <h5 className="text-black md:text-[24px] text-[18px] font-[800] leading-[24.8px]">
                The process of learning to crawl is actually pretty complex. Try
                these tips to support your baby as they explore movement through
                crawling.
              </h5>
              <p className="text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
                {
                  "In the second half of the first year, most babies are really starting to move. At first they may get up on all fours and rock back and forth—like a rocket at countdown, waiting to take off. But unlike a rocket ship, little ones might stay in “countdown” mode for a weeks before they are ready to start moving. The process of learning to crawl is actually pretty complex. Babies need to coordinate the movement of their arms and legs, and develop the muscle strength in their arms, shoulders, and legs to support their weight."
                }
              </p>
            </div>
            <div className="flex flex-col gap-y-[12px] pt-[24px]">
              <h5 className="text-black md:text-[24px] text-[20px] font-[800] leading-[24.8px]">
                How Babies Learn to Crawl
              </h5>
              <p className="text-[#585A5D] text-[16px] font-[600] leading-[19.84px]">
                {
                  "A baby’s first jump forward might actually be a scoot backward. As babies figure out how to do that arm-leg-arm-leg crawling movement, they sometimes go backward first, and then learn how to crawl forward. So, for a while, babies might cry in frustration as they somehow find themselves scooting away from the very object or person they are so determined to reach. The process of learning to crawl differs among babies as they work out a way to move that is unique to them. "
                }
              </p>
            </div>
            <div className="flex flex-col gap-y-[12px] pt-[24px]">
              <h5 className="text-black md:text-[24px] text-[20px] font-[800] leading-[24.8px]">
                How to Help a Baby Learn to Crawl
              </h5>
              <p className="text-[#585A5D] text-[16px] font-[600] leading-[19.84px]">
                {
                  "The process of learning to crawl differs among babies as they work out a way to move that is unique to them. Here are a few ways to help teach a baby to crawl:"
                }
              </p>
              <br />
              <div className="flex flex-col gap-y-[12px] pt-[24px]">
                <h5 className="text-black md:text-[24px] text-[20px] font-[800] leading-[24.8px]">
                  Some crawling styles and ways babies learn to move:
                </h5>
                <ul className="list-disc ml-[15px] text-[#585A5D] text-[16px] font-[600] leading-[19.84px]">
                  <li>
                    {
                      "The “I’ll Have the Usual” This is the classic crawl on hands and knees—alternating hand on one side and knee on the other to go, go, go."
                    }
                  </li>
                  <li>
                    {
                      "The “Crab” Just like at the beach, the “crab” bends one knee and extends the opposite leg to scoot forward."
                    }
                  </li>
                  <li>
                    {
                      "The “Commando” Look out, this crawler lies flat on her belly and drags herself forward using her arms similar to a bear crawl."
                    }
                  </li>
                  <li>
                    {
                      "The “Rolling Wonder” Who needs to crawl when rolling gets me where I need to go?"
                    }
                  </li>
                  <li>
                    {
                      "The “Take It in Stride” KidSome children skip crawling and go right to walking. No time to waste—here I come!"
                    }
                  </li>
                  <span>
                    {
                      "As long as a baby is making progress in their ability to use their body to get around, that’s what’s important."
                    }
                  </span>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-[12px] pt-[24px]">
            <h5 className="text-black md:text-[24px] text-[20px] font-[800] leading-[24.8px]">
              How to Help a Baby Learn to Crawl
            </h5>
            <p className="text-[#585A5D] text-[16px] font-[600] leading-[19.84px]">
              {
                "The process of learning to crawl differs among babies as they work out a way to move that is unique to them. Here are a few ways to help teach a baby to crawl:"
              }
            </p>
            <br />
            <ol className="list-decimal ml-[15px] text-[#585A5D] text-[16px] font-[600] leading-[19.84px]">
              <li>
                {
                  "Give your baby plenty of tummy time, starting from birth. By playing on their bellies, babies develop the muscle strength in their shoulders, arms, back and trunk (torso) that helps them learn to crawl."
                }
              </li>
              <li>
                {
                  "Encourage your baby to reach for the toys she is interested in. Lay interesting toys at just a short distance from your almost-crawler. See if she is able to move herself toward these objects."
                }
              </li>
              <li>
                {
                  "Make sure your baby has space to explore that is safe and supervised. Now is the time to begin child-proofing your home. Take a walk through (or better yet, a crawl-through) your home and see what potential hazards may be at your baby’s level."
                }
              </li>
              <li>
                {
                  "Place the palms of your hands behind your child’s feet when he is on all fours. This stabilizes him and gives him something to “push off” from when he is just learning to crawl."
                }
              </li>
            </ol>
          </div>
        </div>
      </div>
    </PagesLayout>
  );
};

export default Details;
