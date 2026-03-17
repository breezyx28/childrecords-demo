import React from "react";
import { twMerge } from "tailwind-merge";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <div>
      <img
        src={"/assets/logos/logo.svg"}
        width={130}
        height={55}
        alt="Child-Records-Logo"
        className={twMerge("", className)}
      />
    </div>
  );
};

export default Logo;
