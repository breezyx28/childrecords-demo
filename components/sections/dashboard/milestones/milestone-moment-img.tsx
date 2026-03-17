import { Replace, Trash } from "@/components/icons";

import React from "react";
import { twMerge } from "tailwind-merge";
import { Trash01 } from "untitledui-js";

type TMomentImg = {
  src: string;
  onLoad: React.ReactEventHandler<HTMLImageElement>;
};

const MilestoneMomentImg = ({ onLoad, src }: TMomentImg) => {
  return (
    <div className={twMerge("relative w-full h-full")}>
      <div
        className={`absolute w-[153px] h-[200px] border-[4px] border-primary-300 rounded-[16px]`}
      >
        <div className="absolute w-full h-full">
          <img 
            src={src}
            width={1000}
            height={1000}
            alt="moment-img"
            className="absolute top-0 left-0 w-full h-full object-cover rounded-[14px]"
            onLoad={onLoad}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/20 rounded-[12px]"></div>
        </div>
        <div className="absolute right-[10%] moments-toolbar flex items-center gap-x-[8px]">
          <button type="button" className="rounded-full bg-white p-[5px]">
            <Replace className="w-[26px]" />
          </button>
          <button type="button" className="rounded-full bg-white p-[8px]">
            <Trash01 size="16" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MilestoneMomentImg;
