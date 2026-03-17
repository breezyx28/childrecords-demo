
import React from "react";

type ServiceCardProps = {
  title: string;
  icon: string;
  description?: string;
};

const ServiceCard = ({ icon, title, description }: ServiceCardProps) => {
  return (
    <div className="service-card flex md:flex-row flex-col md:gap-[24px] gap-[10px] w-full bg-white md:rounded-[24px] rounded-[18px] md:p-[32px] p-[22px]">
      <div className="service-icon">
        <img
          src={icon}
          className="min-w-[64px] w-[30px]"
          alt={title ?? "service-icon"}
        />
      </div>
      <div className="service-text flex flex-col gap-[4px]">
        <h4 className="md:text-[24px] text-[16px] text-black font-extrabold leading-[38.19px]">
          {/* <h4 className="md:text-[28px] text-[16px] text-black font-extrabold leading-[38.19px]"> */}
          {title ?? "Title"}
        </h4>
        <p className="md:text-[16px] text-[14px] text-[#83868B] font-semibold leading-[22.32px]">
          {/* <p className="md:text-[18px] text-[14px] text-[#83868B] font-semibold leading-[22.32px]"> */}
          {description ??
            "We’re passionate about children’s health and well-being. Our journey began with a simple goal to create a seamless platform where parents can manage their."}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
