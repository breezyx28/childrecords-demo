import React from "react";
import RelatedMilestone from "./related-milestone";

const About = ({ data }: { data: any }) => {
  return (
    <div className="w-full divide divide-y flex flex-col gap-y-[32px] mt-[20px]">
      <div className="objectives flex flex-col gap-y-[12px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Objectives
        </h5>
        <p className="text-[#585A5D] text-[16px] font-[600] leading-[19.84px]">
          {data?.data?.objectives ?? (
            <span className="w-full text-stone-300 text-[14px] text-center">
              No objectives
            </span>
          )}
        </p>
      </div>
      <div className="related-milestone flex flex-col gap-y-[12px] pt-[24px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Related Milestones for this activity
        </h5>
        {/* related milestone */}
        <div className="flex flex-col gap-[1rem]">
          {data?.relatedMilestones?.length > 0 ? (
            data?.relatedMilestones?.map((item: any, index: number) => (
              <RelatedMilestone key={index} data={item} />
            ))
          ) : (
            <span className="text-lg text-stone-400 font-[600]">
              There is no related milestones
            </span>
          )}
        </div>
      </div>
      <div className="description flex flex-col gap-y-[12px] pt-[24px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Description
        </h5>
        <p className="text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
          {data?.data?.description}
        </p>
      </div>
      <div className="quick-tips flex flex-col gap-y-[12px] pt-[24px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Quick Tips
        </h5>
        {data?.data?.tips ? (
          <div dangerouslySetInnerHTML={{ __html: data?.data?.tips }} />
        ) : (
          <span className="text-stone-300 font-[600] text-[16px] text-start">
            No tips
          </span>
        )}
      </div>
    </div>
  );
};

export default About;

// old quick tips design
{
  /* <>
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
          </> */
}
