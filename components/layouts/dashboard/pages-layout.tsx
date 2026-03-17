import { DashBoardBreadcrumbs } from "@/components/breadcrumbs";
import React from "react";

type PagesLayoutProps = {
  children: React.ReactNode;
  pages?: { href: string; title: string }[];
};

const PagesLayout = ({ children, pages }: PagesLayoutProps) => {
  return (
    <div className="flex flex-col md:gap-y-[24px] gap-y-[8px]">
      {pages ? <DashBoardBreadcrumbs pages={pages} /> : null}
      <div className="pages-layout-container w-full">{children}</div>
    </div>
  );
};

export default PagesLayout;
