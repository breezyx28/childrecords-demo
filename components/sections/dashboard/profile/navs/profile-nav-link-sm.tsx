import { ArrowRight, ArrowRight2 } from "iconsax-react";
import { Link } from "react-router-dom";
import React from "react";
import { twMerge } from "tailwind-merge";

type TProfileNavLinkSm = {
  href: string;
  text: string;
  icon: React.ReactNode;
};

const ProfileNavLinkSm = ({ icon, text, href }: TProfileNavLinkSm) => {
  return (
    <Link
      to={href}
      className={twMerge(
        "w-full py-[8px] bg-white transition-all duration-300"
      )}
    >
      <div
        className={twMerge(
          "w-full flex justify-between items-center text-[#83868B] rounded-[8px] p-[8px] hover:bg-primary-100 hover:text-primary-600"
        )}
      >
        <div className="w-full flex gap-x-[12px]">
          <div className="profile-link-icon">{icon}</div>
          <div className="profile-link-label text-[16px] font-[600] leading-[19.84px]">
            {text}
          </div>{" "}
        </div>
        <ArrowRight2 size={16} className="font-[700]" />
      </div>
    </Link>
  );
};

export default ProfileNavLinkSm;
