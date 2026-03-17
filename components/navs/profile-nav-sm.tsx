import React from "react";
import ProfileNavLink from "../sections/dashboard/profile/navs/profile-nav-link";
import {
  ProfileBaby,
  ProfileCreditCard,
  ProfileEmail,
  ProfileHeart,
  ProfileSettings,
  ProfileUser,
} from "../icons";
import ProfileNavLinkSm from "../sections/dashboard/profile/navs/profile-nav-link-sm";

const ProfileNavSm = () => {
  return (
    <div className="flex flex-col min-h-[500px] divide divide-y h-full">
      <ProfileNavLinkSm
        icon={<ProfileUser />}
        text="Information"
        href={"/dashboard/profile/information"}
      />
      <ProfileNavLinkSm
        icon={<ProfileBaby />}
        text="Childs"
        href={"/dashboard/profile/childrens"}
      />
      <ProfileNavLinkSm
        icon={<ProfileHeart />}
        text="Favourites"
        href={"/dashboard/profile/favourites"}
      />
      <ProfileNavLinkSm
        icon={<ProfileCreditCard />}
        text="Subscription"
        href={"/dashboard/profile/subscription"}
      />
      <ProfileNavLinkSm
        icon={<ProfileSettings />}
        text="Settings"
        href={"/dashboard/profile/settings"}
      />
      <ProfileNavLinkSm
        icon={<ProfileEmail />}
        text="Support"
        href={"mailto:mohamedx.28@gmail.com?subject='Contact Support'"}
      />
    </div>
  );
};

export default ProfileNavSm;
