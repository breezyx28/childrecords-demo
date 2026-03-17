import { getInitials } from "@/helper/username-initials";
import { useMyInfo } from "@/hooks/useMyInfo";
import { PhotoPath } from "@/redux/ApiConfig";

import React from "react";
import { twMerge } from "tailwind-merge";

const ProfileImage = () => {
  const myInfo = useMyInfo();
  return (
    <div className={twMerge("dash-nav-account-thumb", myInfo?.photo && "!p-0")}>
      {myInfo?.photo ? (
        <img 
          src={PhotoPath(myInfo?.photo)}
          width={20}
          height={20}
          alt="profile-image"
          className="rounded-full max-w-[64px] max-h-[64px] min-w-[35px] min-h-[35px] object-cover"
        />
      ) : (
        getInitials(myInfo?.fullname)
      )}
    </div>
  );
};

export default ProfileImage;
