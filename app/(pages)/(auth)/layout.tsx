import LoginFooter from "@/components/footers/login-footer";
import LoginNav from "@/components/navs/auth/login-nav";
import { Outlet } from "react-router-dom";
import React from "react";
import "@/styles/auth/login.css";

export default function LoginLayout() {
  return (
    <div className="w-screen h-screen overflow-hidden flex">
      <div className="login-form">
        <LoginNav />
        <Outlet />
        <LoginFooter />
      </div>
      <div className="login-cover">
        <div className="wrapper relative w-full h-full flex justify-center items-center">
          <h1 className="text-center text-[64px] text-white font-[800] leading-[79.36px] p-[100px] mb-[100px]">
            Your all in one child care
          </h1>
        </div>
        <div className="absolute w-full bottom-[0px] left-[100px]">
          <img
            src={"/assets/pages/login/login-cover.png"}
            width={670}
            height={408}
            alt="login-cover"
            className="max-w-[570px] max-h-[408px] w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
