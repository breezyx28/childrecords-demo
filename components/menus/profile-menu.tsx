"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFirstName } from "@/helper/user-first-name";
import { getCurrentUser } from "@/redux/ApiConfig";
import { useLogoutUserMutation } from "@/redux/endpoints/login";
import { Link } from "react-router-dom";
import ProfileImage from "./profile-image";
import { useMyInfo } from "@/hooks/useMyInfo";
import {
  User,
  Users,
  Heart,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

export function ProfileMenu() {
  const [logout] = useLogoutUserMutation();
  const myInfo = useMyInfo();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="!outline-none">
        <div className="flex items-center gap-x-[8px]">
          <ProfileImage />
          <span className="md:block hidden text-black text-[14px] text-[#83868B] font-[700] leading-[18.2px]">
            {getFirstName(myInfo?.fullname ?? getCurrentUser()?.fullname) ??
              "Account"}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 z-[99999] cursor-pointer font-[700] text-[14px] text-[#83868B]">
        <DropdownMenuLabel>
          <Link to="/dashboard/profile/information" className="flex items-center gap-x-2">
            <User className="w-4 h-4 shrink-0" />
            My Account
          </Link>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="/dashboard/profile/information">
            <DropdownMenuItem className="cursor-pointer hover:!text-primary-600 flex items-center gap-x-2">
              <User className="w-4 h-4 shrink-0" />
              Profile
            </DropdownMenuItem>
          </Link>

          <Link to="/dashboard/profile/childrens">
            <DropdownMenuItem className="cursor-pointer hover:!text-primary-600 flex items-center gap-x-2">
              <Users className="w-4 h-4 shrink-0" />
              Children
            </DropdownMenuItem>
          </Link>

          <Link to="/dashboard/profile/favourites">
            <DropdownMenuItem className="cursor-pointer hover:!text-primary-600 flex items-center gap-x-2">
              <Heart className="w-4 h-4 shrink-0" />
              Favourites
            </DropdownMenuItem>
          </Link>

          <Link to="/dashboard/profile/subscription">
            <DropdownMenuItem className="cursor-pointer hover:!text-primary-600 flex items-center gap-x-2">
              <CreditCard className="w-4 h-4 shrink-0" />
              Subscription
            </DropdownMenuItem>
          </Link>

          <Link to="/dashboard/profile/settings">
            <DropdownMenuItem className="cursor-pointer hover:!text-primary-600 flex items-center gap-x-2">
              <Settings className="w-4 h-4 shrink-0" />
              Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="hover:!text-error-600 cursor-pointer flex items-center gap-x-2"
          onClick={() => logout({})}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
