import Button from "@/components/buttons/button";
import { ServiceSectionProps } from "@/types";

import React from "react";
import { twMerge } from "tailwind-merge";

const ServiceSection = ({
  dir,
  title,
  subTitle,
  list,
  button,
}: ServiceSectionProps) => {
  return (
    <section
      dir={dir}
      className="md:pt-[100px] pt-[20px] md:pb-[40px] pb-[20px]"
      // className="md:pt-[100px] pt-[50px] md:pb-[40px] pb-[20px]"
    >
      <div className="wrapper flex md:flex-row flex-col gap-x-[86px] md:gap-y-[43px] gap-y-[10px] justify-between">
        <div className="flex flex-col items-center md:min-h-[522px] min-h-auto h-full max-w-[604px] md:py-[56px] py-[28px]">
          <div
            dir="ltr"
            className={twMerge(
              "service-container flex flex-col md:gap-y-[40px] gap-y-[20px]",
              dir === "rtl" ? "justify-start" : ""
            )}
          >
            <div className="service-details flex flex-col gap-y-[24px]">
              <div className="flex flex-col gap-y-[16px]">
                <h1 className="section-title">{title}</h1>
                <h6 className="section-subtitle">{subTitle}</h6>
              </div>
              <div className="flex flex-col gap-y-[16px]">
                {list?.map((text, index) => (
                  <ServiceListItem key={index} text={text} />
                ))}
              </div>
            </div>
            <div className="service-button">
              <Button
                text={button?.title ?? "Create account"}
                href={button?.href ?? "#"}
              />
            </div>
          </div>
        </div>
        <div className="">
          <img 
            src={"/assets/pages/more-services/service-login.png"}
            width={550}
            height={574}
            className="max-w-[550px] max-h-[574px] size-full"
            alt="more-service"
          />
        </div>
      </div>
    </section>
  );
};

type ServiceListItemProps = {
  text: string;
};

const ServiceListItem = ({ text }: ServiceListItemProps) => (
  <div className="section-subtitle flex gap-x-[8px] text-primary-600">
    <img src="/assets/icons/shield-check.svg" alt="shield-check" />
    <p className="leading-[] md:text-[18px] text-[14px]">
      {text ?? "100% Secured & data is saved"}
    </p>
  </div>
);

export default ServiceSection;
