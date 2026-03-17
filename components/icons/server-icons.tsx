import { PhotoPath } from "@/redux/ApiConfig";

import React from "react";
import { twMerge } from "tailwind-merge";

type TServerIcon = {
  src: string;
  className?: string;
};

const ServerIcon = ({ src, className }: TServerIcon) => {
  return (
    <img 
      src={PhotoPath(src)}
      width={1000}
      height={1000}
      className={twMerge("md:w-auto w-[20px]", className)}
      alt="👶"
    />
  );
};

export default ServerIcon;
