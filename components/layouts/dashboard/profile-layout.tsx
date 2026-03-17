import { DashBoardBreadcrumbs } from "@/components/breadcrumbs";
import React from "react";

type ProfileLayoutProps = {
  children: React.ReactNode;
  pages?: { href: string; title: string }[];
};

const ProfileLayout = ({ children, pages }: ProfileLayoutProps) => {
  return (
    <div className="flex flex-col gap-y-[24px]">
      {pages ? <DashBoardBreadcrumbs pages={pages} /> : null}
      <div className="w-full">{children}</div>
    </div>
  );
};

export default ProfileLayout;
