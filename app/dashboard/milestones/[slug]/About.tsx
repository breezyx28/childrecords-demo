import React from "react";

const About = ({ data }: any) => {
  const description = data?.description ?? data?.about;
  const tipsList = Array.isArray(data?.tips) ? data.tips : null;
  const quickTips = data?.quick_tips ?? (tipsList?.length ? tipsList.map((t: any) => t?.content ?? t?.title).filter(Boolean).join(" ") : null);

  return (
    <div className="w-full flex flex-col gap-y-[32px] mt-[20px]">
      <div className="flex flex-col gap-y-[12px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Description
        </h5>
        <p className="text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
          {description}
        </p>
      </div>
      <div className="flex flex-col gap-y-[12px]">
        <h5 className="text-black md:text-[24px] text-[18px] font-[800] md:leading-[32.74px] leading-[24.55px]">
          Quick Tips
        </h5>
        {tipsList?.length ? (
          <ul className="list-disc ml-[15px] list-inside text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px] space-y-1">
            {tipsList.map((t: any, i: number) => (
              <li key={t?.id ?? i}>{t?.content ?? t?.title}</li>
            ))}
          </ul>
        ) : (
          <p className="text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
            {quickTips}
          </p>
        )}
        <br />
        {/* <ol className="list-decimal ml-[15px] list-inside text-[#585A5D] md:text-[16px] text-[14px] font-[600] md:leading-[19.84px] leading-[18.2px]">
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
        </ol> */}
      </div>
    </div>
  );
};

export default About;
