import React from "react";
import UpperNav from "../navs/upper-nav";
import Footer from "../sections/landing-page/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home - Child Records",
  description:
    "Easily digitize medical records, track growth, and monitor developmental milestones—all in one intuitive platform. Start today and take control of your child's health with confidence!",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Home - Child Recordss",
    description:
      "Easily digitize medical records, track growth, and monitor developmental milestones—all in one intuitive platform. Start today and take control of your child's health with confidence!",
    url: "https://www.yourwebsite.com/",
  },
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <UpperNav />
      <div className="h-[88px] w-full"></div> {/* Placeholder for upper-nav */}
      <div className="flex w-full min-w-0 max-w-full justify-center overflow-x-hidden">
        <div className="wrapp w-full min-w-0 max-w-full">{children}</div>
      </div>
      <Footer />
    </>
  );
}
