import React from "react";
import { faker } from "@faker-js/faker";

type OurTeamCardProps = {
  thumb?: string;
  name?: string;
  position?: string;
  feedback?: string;
};

const TestimonialsCard = ({
  thumb,
  name,
  position,
  feedback,
}: OurTeamCardProps) => {
  return (
    <div className="w-full bg-white rounded-[24px] p-[32px]">
      <div className="wrapper flex flex-col items-center gap-y-[12px]">
        <div className="flex flex-col items-center text-center gap-y-[16px]">
          <div className="">
            <img
              src={thumb ?? faker.image.avatar()}
              className="w-[65px] h-[65px] rounded-full object-cover"
              alt="avatar-image"
            />
          </div>
          <div className="flex flex-col text-center gap-y-[4px]">
            <p className="text-black font-extrabold text-[16px] leading-[21.82px]">
              {name ?? "Ahmed Adam"}
            </p>
            <p className="font-[700] text-[#83868B] text-[14px] leading-[18.2px]">
              {position ?? "Dad of two"}
            </p>
          </div>
        </div>
        <p className="text-center font-[600] text-black text-[16] leading-[19.84px]">
          {feedback ??
            "ChildRecords has been a lifesaver for us! It makes tracking our baby's milestones so easy, and the appointment reminders ensure we never miss a check-up."}
        </p>
      </div>
    </div>
  );
};

export default TestimonialsCard;
