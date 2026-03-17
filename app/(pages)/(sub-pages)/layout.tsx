import UpperNav from "@/components/navs/upper-nav";
import Footer from "@/components/sections/landing-page/footer";
import React from "react";
import "@/styles/policy-terms.css";

export default function SubPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UpperNav />
      <div className="h-[88px] w-full"></div>
      <div className="w-screen h-auto">
        <div className="wrapper w-full">{children}</div>
      </div>
      <Footer />
    </>
  );
}
