"use client";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../logos/logo";
import ResponsiveLogo from "@/components/logos/logo-responsive";
import OutlineButton from "../buttons/OutlineButton";
import Button from "../buttons/button";
import { isAuthenticated } from "@/redux/ApiConfig";

const UpperNav = () => {
  const [menuOpened, setMenuOpend] = React.useState<boolean>(false);

  React.useEffect(() => {
    const currentPath = window.location.pathname;
    setActiveLink(currentPath);
    handleRouteChange();
  }, []);

  return (
    <div className="upper-nav fixed md:bg-primary-100/70 bg-primary-100 md:backdrop-blur-md md:border-b border-white mx-auto w-full h-[88px] flex flex-col justify-center z-30">
      <div className="responsive">
        <div className="desktop-responsive">
          <Link to="/" className="logo">
            <Logo />
          </Link>
          <div className="upper-menu">
            <ul className="flex gap-x-[40px]">
              <li className="navbar-link">
                <Link className="navbar-link" to={"/"} replace>
                  {"Home"}
                </Link>
              </li>
              <li className="navbar-link">
                <Link className="navbar-link" to={"#services"} replace>
                  {"Services"}
                </Link>
              </li>
              <li className="navbar-link">
                <Link className="navbar-link" to={"#our-mession"}>
                  {"About us"}
                </Link>
              </li>
              <li className="navbar-link">
                <Link className="navbar-link" to={"#more-services"}>
                  {"Why us"}
                </Link>
              </li>
              <li className="navbar-link">
                <Link className="navbar-link" to={"#plans"}>
                  {"Plans"}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex gap-x-[19px] font-[700]">
            <OutlineButton
              href={isAuthenticated() ? "/dashboard" : "/login"}
              text={isAuthenticated() ? "Dashboard" : "Login"}
              className="!px-[24px] !py-[12px] bg-transparent"
            />
            <Button
              href="/register"
              text="Create account"
              className="!px-[24px] !py-[12px]"
            />
          </div>
        </div>
      </div>

      <div className="mobile-responsive">
        <Link to="/" className="logo">
          <ResponsiveLogo />
        </Link>
        <div
          className={`fixed bg-white shadow-sm ${
            menuOpened
              ? "uppernav-mobile-slide-0"
              : "uppernav-mobile-slide-full"
          } duration-200 ease-in top-0 w-full z-50 max-h-screen h-full overflow-hidden flex flex-col justify-between px-5 py-4`}
        >
          <div className="wrapper flex flex-col gap-y-10">
            <div className="flex justify-between items-center">
              <ResponsiveLogo />
              <button
                onClick={() => {
                  setMenuOpend(false);
                }}
                className="relative top-0 right-0 p-3 text-slate-800"
              >
                <svg
                  width={35}
                  height={35}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m5 5 14 14M5 19 19 5" />
                </svg>
              </button>
            </div>
            <div className="mobile-upper-menu h-full">
              <ul className="flex flex-col gap-y-10 h-full">
                <li className="text-black text-lg font-semibold w-full ml-0 duration-150 ease-in hover:ml-4 cursor-pointer">
                  <Link
                    to={"/"}
                    onClick={() => {
                      setMenuOpend(false);
                    }}
                  >
                    {"Home"}
                  </Link>
                </li>
                <li className="text-black text-lg font-semibold w-full ml-0 duration-150 ease-in hover:ml-4 cursor-pointer">
                  <Link
                    to={"#services"}
                    onClick={() => {
                      setMenuOpend(false);
                    }}
                  >
                    {"Services"}
                  </Link>
                </li>
                <li className="text-black text-lg font-semibold w-full ml-0 duration-150 ease-in hover:ml-4 cursor-pointer">
                  <Link
                    to={"#about-us"}
                    onClick={() => {
                      setMenuOpend(false);
                    }}
                  >
                    {"About Us"}
                  </Link>
                </li>
                <li className="text-black text-lg font-semibold w-full ml-0 duration-150 ease-in hover:ml-4 cursor-pointer">
                  <Link
                    to={"#more-services"}
                    onClick={() => {
                      setMenuOpend(false);
                    }}
                  >
                    {"Why Us"}
                  </Link>
                </li>

                <li className="text-black text-lg font-semibold w-full ml-0 duration-150 ease-in hover:ml-4 cursor-pointer">
                  <Link
                    to={"#plans"}
                    onClick={() => {
                      setMenuOpend(false);
                    }}
                  >
                    {"Plans"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="nav-buttons-group">
            <OutlineButton
              href={isAuthenticated() ? "/dashboard" : "/login"}
              text={isAuthenticated() ? "Dashboard" : "Login"}
              className="bg-transparent px-[24px] py-[12px]"
            />
            <Button href="/register" text="Create account" />
          </div>
        </div>
        <button
          onClick={() => {
            setMenuOpend(true);
          }}
        >
          <svg
            width={38}
            height={38}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 7h14" />
            <path d="M5 12h14" />
            <path d="M5 17h14" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UpperNav;

const setActiveLink = (currentPage: string) => {
  let navLinks = document.querySelectorAll(".upper-nav-link");

  navLinks.forEach((item) => {
    // remove all active links first
    item.classList.remove("link-active");

    // get the current page and assign it to specific link item
    if (item.getAttribute("href") === currentPage) {
      console.log(currentPage);

      item.classList.add("link-active");
    }
  });
};

const handleRouteChange = () => {
  let upperNavLink = document.querySelectorAll(".upper-nav-link");
  let upperNav = document.querySelector(".upper-nav");
  let listItem = document.querySelectorAll(
    ".upper-nav>.desktop-responsive>.upper-menu>ul>li"
  );

  upperNavLink.forEach((item: Element) => {
    item?.addEventListener("click", (e) => {
      let page = item.getAttribute("href") ?? "/";
      setActiveLink(page);
    });
  });

  const currentPath = window.location.pathname;

  if (currentPath !== "/") {
    upperNav?.classList.add("glass-card");
    listItem?.forEach((item) =>
      item.classList?.replace("text-white", "text-slate-800")
    );
  }
};
