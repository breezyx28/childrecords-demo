import Button from "@/components/buttons/button";
import { ArrowUpRight } from "@/components/icons";

import React from "react";

type ProductCardProps = {
  id: string | number;
  img: string;
  name: string;
  store: string;
  details: string;
  link: string;
};

const ProductCard = ({
  details,
  id,
  img,
  link,
  name,
  store,
}: ProductCardProps) => {
  return (
    <div className="w-full flex md:gap-[24px] gap-[16px] py-[32px]">
      <div className="product-img">
        <img 
          src={img}
          width={1000}
          height={1000}
          alt="product-img"
          className="md:max-w-[158px] md:max-h-[158px] max-w-[80px] max-h-[80px] w-full h-full rounded-[16px] border border-[#E2E6ED]"
        />
      </div>
      <div className="flex-1 w-full">
        <div className="flex flex-col md:gap-y-[24px] gap-y-[16px]">
          <div className="flex flex-col gap-y-[12px]">
            <div className="w-full">
              <h6 className="product-name text-black md:text-[20px] text-[18px] font-[800] md:leading-[27.28px] leading-[24.55px]">
                {name}
              </h6>
              <p className="product-store text-[#83868B] text-[14px] font-[700] leading-[18.2px]">
                {store}
              </p>
            </div>
            <p className="text-[#83868B] md:text-[14px] text-[12px] font-[600] md:leading-[18.2px] leading-[15.6px]">
              {details}
            </p>
          </div>
          <div className="product-btn w-full md:w-auto flex justify-end">
            <Button
              text="Buy on Amazon"
              className="text-white md:w-auto w-full md:py-[12px] md:px-[24px] md:text-[12px] leading-[15.6px]"
              href={link}
              icon={<ArrowUpRight className="text-white" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
