
import React from "react";
import { twMerge } from "tailwind-merge";

type LogoProps = {
  className?: string;
};

const LogoIcon = ({ className }: LogoProps) => {
  return (
    <div>
      <img 
        src={"/assets/logos/logo-icon.svg"}
        width={140}
        height={62}
        alt="Child-Records-Logo"
        className={twMerge("", className)}
      />
    </div>
  );
};

export default LogoIcon;
