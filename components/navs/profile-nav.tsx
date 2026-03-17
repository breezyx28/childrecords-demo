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

const ProfileNav = () => {
  return (
    <div className="flex flex-col gap-y-[12px] min-h-[500px] h-full">
      <ProfileNavLink
        icon={<ProfileUser />}
        text="Information"
        href={"/dashboard/profile/information"}
      />
      <ProfileNavLink
        icon={<ProfileBaby />}
        text="Childs"
        href={"/dashboard/profile/childrens"}
      />
      <ProfileNavLink
        icon={<ProfileHeart />}
        text="Favourites"
        href={"/dashboard/profile/favourites"}
      />
      <ProfileNavLink
        icon={<ProfileCreditCard />}
        text="Subscription"
        href={"/dashboard/profile/subscription"}
      />
      <ProfileNavLink
        icon={<ProfileSettings />}
        text="Settings"
        href={"/dashboard/profile/settings"}
      />
      <ProfileNavLink
        icon={<ProfileEmail />}
        text="Support"
        href={"mailto:info@childrecords.care?subject=Contact Support"}
      />
    </div>
  );
};

export default ProfileNav;
