import LoginFooter from "@/components/footers/login-footer";
import LoginNav from "@/components/navs/auth/login-nav";

import React from "react";
import "@/styles/auth/login.css";

export default function AddChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <div className="w-full h-full flex flex-col justify-between">
        <LoginNav />
        <div className="w-full flex flex-col items-center justify-center">
          {children}
        </div>
        <LoginFooter />
      </div>
    </div>
  );
}
