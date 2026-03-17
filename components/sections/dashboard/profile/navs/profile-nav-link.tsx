import { Arrow, ArrowRight } from "iconsax-react";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import { twMerge } from "tailwind-merge";

type TProfileNavLink = {
  href: string;
  text: string;
  icon: React.ReactNode;
  arraow?: boolean;
};

const ProfileNavLink = ({ icon, text, href, arraow }: TProfileNavLink) => {
  const pathname = useLocation().pathname;

  const isActive = (href: string) => pathname == href;

  return (
    <Link
      to={href}
      className={twMerge(
        "p-[8px] rounded-[12px] transition-all duration-300",
        isActive(href) && "bg-primary-100"
      )}
    >
      <div
        className={twMerge(
          "flex gap-x-[12px] text-[#83868B]",
          isActive(href) && "text-primary-600"
        )}
      >
        <div className="profile-link-icon">{icon}</div>
        <div className="profile-link-label text-[16px] font-[600] leading-[19.84px]">
          {text}
        </div>
        {arraow && <ArrowRight />}
      </div>
    </Link>
  );
};

export default ProfileNavLink;
