import { BabySittingUp } from "@/components/icons";
import { generateSlug } from "@/helper/string-to-slug";
import React from "react";

const About = () => {
  return (
    <div className="w-full divide divide-y flex flex-col gap-y-[32px] mt-[20px]">
      <div className="objectives flex flex-col gap-y-[12px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Objectives
        </h5>
        <p className="text-[#585A5D] text-[16px] font-[600] leading-[19.84px]">
          {"Strengthen arms & leg muscles "}
        </p>
      </div>
      <div className="related-milestone flex flex-col gap-y-[12px] pt-[24px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Related Milestones for this activity
        </h5>
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-x-[11px]">
            <BabySittingUp className="text-green-600" />
            <span className="text-black text-[16px] font-[700] leading-[19.84px]">
              Sitting up
            </span>
          </div>
          <div className="">
            <input
              id={`related-milestone-${generateSlug("setting up")}`}
              type="checkbox"
              defaultChecked={false}
              className="checkbox border-2 border-[#AFB3BA] [--chkbg:#394CFF] [--chkfg:#fff] checked:border-primary-600 checkbox-md"
            />
          </div>
        </div>
      </div>
      <div className="description flex flex-col gap-y-[12px] pt-[24px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Description
        </h5>
        <p className="text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
          {
            "A crawling baby might start out by “creeping,” which means they drag their belly and legs by using just their arms. Baby may also scoot their bottom along the floor, roll from point A to point B or even slide backward before moving on to traditional on-all-fours crawling"
          }
        </p>
      </div>
      <div className="quick-tips flex flex-col gap-y-[12px] pt-[24px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Quick Tips
        </h5>
        <p className="text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
          {
            "The process of learning to crawl differs among babies as they work out a way to move that is unique to them. Here are a few ways to help teach a baby to crawl:"
          }
        </p>
        <br />
        <ol className="list-decimal ml-[15px] text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
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
  );
};

export default About;
